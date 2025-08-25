from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import uuid

app = Flask(__name__)
# In a production environment, you should configure CORS more securely.
# For example: CORS(app, resources={r"/api/*": {"origins": "http://your-frontend-domain.com"}})
CORS(app)  # Enable CORS for all routes, adjust for production

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify backend is running."""
    return jsonify({"status": "ok", "message": "Backend is running"})

@app.route('/api/bb84/simulate', methods=['POST'])
def bb84_simulate():
    """Simulates the BB84 protocol."""
    data = request.get_json()
    qubit_length = data.get('qubit_length', 16)
    eve_enabled = data.get('eve_enabled', False)
    
    # Dummy simulation logic
    # In a real implementation, you would use Qiskit or another quantum library
    alice_bits = [random.randint(0, 1) for _ in range(qubit_length)]
    alice_bases = [random.randint(0, 1) for _ in range(qubit_length)]
    bob_bases = [random.randint(0, 1) for _ in range(qubit_length)]
    
    bob_results = []
    for i in range(qubit_length):
        if alice_bases[i] == bob_bases[i]:
            bob_results.append(alice_bits[i])
        else:
            bob_results.append(random.randint(0, 1)) # Random result if bases mismatch

    if eve_enabled:
        # Simulate Eve's interference
        for i in range(qubit_length):
            if random.random() < 0.25: # 25% chance of error per qubit
                bob_results[i] = 1 - bob_results[i]

    matching_bases = [alice_bases[i] == bob_bases[i] for i in range(qubit_length)]
    final_key = [alice_bits[i] for i in range(qubit_length) if matching_bases[i]]

    response_data = {
        "success": True,
        "data": {
            "alice_bits": alice_bits,
            "alice_bases": alice_bases,
            "bob_bases": bob_bases,
            "bob_results": bob_results,
            "matching_bases": matching_bases,
            "final_key": final_key,
            "key_length": len(final_key)
        }
    }
    return jsonify(response_data)

@app.route('/api/bb84/generate-qasm', methods=['POST'])
def generate_qasm():
    # Dummy implementation
    return jsonify({"success": True, "qasm": "OPENQASM 2.0; ..."})

@app.route('/api/qiskit/devices', methods=['GET'])
def get_devices():
    # Dummy device data
    devices = [
        {"name": "simulator_statevector", "status": "online", "queue_length": 0, "n_qubits": 32, "basis_gates": [], "simulator": True},
        {"name": "ibmq_qasm_simulator", "status": "online", "queue_length": 0, "n_qubits": 32, "basis_gates": [], "simulator": True},
        {"name": "ibmq_lima", "status": "online", "queue_length": 5, "n_qubits": 5, "basis_gates": [], "simulator": False}
    ]
    return jsonify({"success": True, "devices": devices})

@app.route('/api/qiskit/submit-job', methods=['POST'])
def submit_job():
    # Dummy implementation
    return jsonify({
        "success": True, 
        "job_id": str(uuid.uuid4()), 
        "status": "QUEUED",
        "results": {
            "counts": {"00": 512, "11": 512},
            "shots": 1024,
            "backend": "ibmq_qasm_simulator"
        }
    })

@app.route('/api/circuit/generate-bell', methods=['GET'])
def generate_bell():
    # Dummy implementation
    return jsonify({
        "success": True,
        "qasm": "OPENQASM 2.0; ...",
        "circuit_image": "data:image/svg+xml;base64,..."
    })

@app.route('/api/circuit/visualize', methods=['POST'])
def visualize():
    # Dummy implementation
    return jsonify({
        "success": True,
        "circuit_image": "data:image/svg+xml;base64,..."
    })

@app.route('/api/stats/quantum', methods=['GET'])
def get_stats():
    # Dummy implementation
    stats = {
        "qber_threshold": 11.0,
        "current_qber": 4.2,
        "security_level": "Secure",
        "raw_key_length": 1024,
        "sifted_key": 512,
        "final_key": 384,
        "channel_noise": 2.1,
        "transmission_rate": 98.7,
        "efficiency": 75.3
    }
    return jsonify({"success": True, "stats": stats})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
