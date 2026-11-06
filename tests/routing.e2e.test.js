/**
 * OpenWay Code - E2E Routing & HTTP Server Tests
 * Validates HTTP endpoints, static asset delivery, MIME types, security boundaries, and 404s.
 * Runs completely in-memory without requiring external network or loopback socket permissions.
 */

const http = require('http');
const stream = require('stream');
const server = require('../server');

function requestServer(targetServer, url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const inputSocket = new stream.PassThrough({ highWaterMark: 10 * 1024 * 1024 });
    const req = new http.IncomingMessage(inputSocket);
    req.method = method;
    req.url = url;
    req.headers = { host: 'localhost' };

    const outputSocket = new stream.PassThrough({ highWaterMark: 10 * 1024 * 1024 });
    const res = new http.ServerResponse(req);
    res.assignSocket(outputSocket);

    const chunks = [];
    outputSocket.on('data', chunk => chunks.push(chunk));

    res.on('finish', () => {
      const full = Buffer.concat(chunks).toString('utf8');
      const idx = full.indexOf('\r\n\r\n');
      const headerSection = idx !== -1 ? full.slice(0, idx) : '';
      const body = idx !== -1 ? full.slice(idx + 4) : full;

      const headers = {};
      headerSection.split('\r\n').slice(1).forEach(line => {
        const colon = line.indexOf(':');
        if (colon !== -1) {
          headers[line.slice(0, colon).trim().toLowerCase()] = line.slice(colon + 1).trim();
        }
      });

      resolve({
        status: res.statusCode,
        headers,
        text: body,
        headerSection
      });
    });

    res.on('error', reject);
    targetServer.emit('request', req, res);
  });
}

describe('E2E Server & Routing Module', () => {
  describe('Page Routes & Aliases', () => {
    test('GET / routes to index.html with 200 OK and text/html', async () => {
      const res = await requestServer(server, '/');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
      expect(res.text).toContain('OpenWay Code');
    });

    test('GET /studio routes to studio.html', async () => {
      const res = await requestServer(server, '/studio');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
      expect(res.text).toContain('codeEditor');
      expect(res.text).toContain('terminal-pane');
    });

    test('GET /studio.html serves studio page directly', async () => {
      const res = await requestServer(server, '/studio.html');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
      expect(res.text).toContain('fileTabsContainer');
    });

    test('GET /instructor and /projector route to instructor.html', async () => {
      const res1 = await requestServer(server, '/instructor');
      expect(res1.status).toBe(200);
      expect(res1.headers['content-type']).toBe('text/html; charset=utf-8');
      expect(res1.text).toContain('Classroom Instructor Projector Board');

      const res2 = await requestServer(server, '/projector');
      expect(res2.status).toBe(200);
      expect(res2.headers['content-type']).toBe('text/html; charset=utf-8');
      expect(res2.text).toContain('Classroom Instructor Projector Board');
    });

    test('GET /playground and /sandbox route to playground.html', async () => {
      const res1 = await requestServer(server, '/playground');
      expect(res1.status).toBe(200);
      expect(res1.headers['content-type']).toBe('text/html; charset=utf-8');
      expect(res1.text).toContain('Student Coding Playground');

      const res2 = await requestServer(server, '/sandbox');
      expect(res2.status).toBe(200);
      expect(res2.headers['content-type']).toBe('text/html; charset=utf-8');
      expect(res2.text).toContain('Student Coding Playground');
    });
  });

  describe('Static Assets & MIME Type Integrity', () => {
    test('Serves CSS stylesheet with text/css; charset=utf-8', async () => {
      const res = await requestServer(server, '/styles.css');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toBe('text/css; charset=utf-8');
      expect(res.text).toContain(':root');
      expect(res.text).toContain('--bg-code');
    });

    test('Serves JavaScript modules with application/javascript; charset=utf-8', async () => {
      const res1 = await requestServer(server, '/app.js');
      expect(res1.status).toBe(200);
      expect(res1.headers['content-type']).toBe('application/javascript; charset=utf-8');

      const res2 = await requestServer(server, '/runner.js');
      expect(res2.status).toBe(200);
      expect(res2.headers['content-type']).toBe('application/javascript; charset=utf-8');

      const res3 = await requestServer(server, '/lessons.js');
      expect(res3.status).toBe(200);
      expect(res3.headers['content-type']).toBe('application/javascript; charset=utf-8');
    });

    test('Serves JSON files with application/json; charset=utf-8', async () => {
      const res = await requestServer(server, '/package.json');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
      const pkg = JSON.parse(res.text);
      expect(pkg.name).toBe('openway-code');
    });

    test('Serves image assets with image/png', async () => {
      const resImg = await requestServer(server, '/assets/merge_sort_diagram.png');
      expect(resImg.status).toBe(200);
      expect(resImg.headers['content-type']).toBe('image/png');

      const resSlide = await requestServer(server, '/assets/middle_earth_slides/middle_earth_slide_0.png');
      expect(resSlide.status).toBe(200);
      expect(resSlide.headers['content-type']).toBe('image/png');
    });

    test('Includes Cache-Control no-cache header on all responses', async () => {
      const res = await requestServer(server, '/index.html');
      expect(res.headers['cache-control']).toBe('no-cache');
    });
  });

  describe('Error Handling & Security Boundaries', () => {
    test('Returns 404 for non-existent files', async () => {
      const res = await requestServer(server, '/non-existent-page-xyz.html');
      expect(res.status).toBe(404);
      expect(res.text).toContain('404 Not Found');
    });

    test('Rejects directory traversal attempts out of root directory', async () => {
      const res1 = await requestServer(server, '/../../../../etc/passwd');
      expect([403, 404]).toContain(res1.status);

      const res2 = await requestServer(server, '/%2e%2e/%2e%2e/package.json');
      expect([200, 403, 404]).toContain(res2.status);
      if (res2.status === 200) {
        expect(res2.text).toContain('openway-code');
      }
    });
  });
});
