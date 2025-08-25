#!/usr/bin/env python3
"""
Startup script for Quantum Key Whisper Flask backend
"""
import os
import sys
from app import app

def main():
    print("🚀 Starting Quantum Key Whisper Flask Backend...")
    print("📊 Available endpoints:")
    print("   - GET  /api/health - Health check")
    print("   - POST /api/bb84/simulate - BB84 protocol simulation")
    print("   - POST /api/bb84/generate-qasm - Generate QASM code")
    print("   - GET  /api/qiskit/devices - Get quantum devices")
    print("   - POST /api/qiskit/submit-job - Submit quantum job")
    print("   - GET  /api/circuit/generate-bell - Generate Bell circuit")
    print("   - POST /api/circuit/visualize - Visualize circuit")
    print("   - GET  /api/stats/quantum - Get quantum statistics")
    print()
    print("🌐 Server will be available at: http://localhost:5000")
    print("📚 API documentation available at: http://localhost:5000/")
    print()
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)

if __name__ == '__main__':
    main()
