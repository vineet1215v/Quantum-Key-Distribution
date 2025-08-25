# Quantum Key Whisper - Flask Backend

This is the Python Flask backend for the Quantum Key Whisper quantum cryptography simulator.

## Setup

1. **Install Python Dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Start the Flask Server:**
   ```bash
   python start.py
   # or
   python app.py
   ```

3. **The server will start on:** `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if backend is running

### BB84 Protocol
- `POST /api/bb84/simulate` - Run BB84 protocol simulation
- `POST /api/bb84/generate-qasm` - Generate QASM code for BB84

### Qiskit Integration
- `GET /api/qiskit/devices` - Get available quantum devices
- `POST /api/qiskit/submit-job` - Submit quantum circuit job

### Quantum Circuits
- `GET /api/circuit/generate-bell` - Generate Bell state circuit
- `POST /api/circuit/visualize` - Visualize quantum circuit

### Statistics
- `GET /api/stats/quantum` - Get quantum statistics

## Example Usage

### BB84 Simulation
```bash
curl -X POST http://localhost:5000/api/bb84/simulate \
  -H "Content-Type: application/json" \
  -d '{"qubit_length": 16, "eve_enabled": false}'
```

### Get Quantum Devices
```bash
curl http://localhost:5000/api/qiskit/devices
```

## Development

The backend uses:
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Qiskit** - Quantum computing framework
- **NumPy** - Numerical computations

## Environment Variables

- `FLASK_ENV` - Set to 'development' for debug mode
- `PORT` - Server port (default: 5000)

## Testing

Test the API endpoints using curl, Postman, or the React frontend.
