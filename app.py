import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean terminal output for scrum demo
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

def run():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print("\n" + "=" * 60)
            print("  🧭 OpenWay Code: Community Pathways to Computer Science")
            print(f"  Server running at: http://localhost:{PORT}")
            print("  Open your browser to start cycling through the 12 lessons!")
            print("  Press Ctrl+C to stop the server")
            print("=" * 60 + "\n")
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 48: # Address already in use
            alt_port = 8080
            print(f"Port {PORT} in use, trying {alt_port}...")
            with socketserver.TCPServer(("", alt_port), Handler) as httpd:
                print(f"Server running at: http://localhost:{alt_port}")
                httpd.serve_forever()
        else:
            raise e
    except KeyboardInterrupt:
        print("\nDemo server stopped.")
        sys.exit(0)

if __name__ == '__main__':
    run()

