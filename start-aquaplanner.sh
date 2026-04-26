#!/bin/bash
# AquaPlanner Launcher
# Starts the local web server and opens the browser

cd "$(dirname "$0")"

# Kill any existing server on port 8080
pkill -f "python3 -m http.server 8080" 2>/dev/null
fuser -k 8080/tcp 2>/dev/null
sleep 0.5

# Start the server in background and capture PID
python3 -m http.server 8080 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 1

# Open browser
xdg-open http://localhost:8080 2>/dev/null || \
google-chrome http://localhost:8080 2>/dev/null || \
firefox http://localhost:8080 2>/dev/null || \
echo "Please open http://localhost:8080 in your browser"

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║     🐠 AquaPlanner is running! 🐠          ║"
echo "║                                            ║"
echo "║  Server: http://localhost:8080             ║"
echo "║                                            ║"
echo "║  Press Ctrl+C to stop the server           ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Handle cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down AquaPlanner server..."
    kill $SERVER_PID 2>/dev/null
    echo "Server stopped. Goodbye! 🐟"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for server process
wait $SERVER_PID
