from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return jsonify({
        'message': 'Quantum Key Whisper Backend API',
        'version': '1.0.0',
        'status': 'running'
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

# BB84 Protocol Endpoints
@app.route('/api/bb84/simulate', methods=['POST'])
def bb84_simulate():
    try:
        data = request.get_json()
        qubit_length = data.get('qubit_length', 16)
        eve_enabled = data.get('eve_enabled', False)
        
        # Generate random bits and bases
        alice_bits = np.random.randint(0, 2, qubit_length)
        alice_bases = np.random.randint(0, 2, qubit_length)
        bob_bases = np.random.randint(0, 2, qubit_length)
        
        # Simulate quantum transmission
        if eve_enabled:
            # Eve intercepts and measures
            eve_bases = np.random.randint(0, 2, qubit_length)
            bob_results = []
            for i in range(qubit_length):
                if alice_bases[i] == eve_bases[i]:
                    bob_results.append(alice_bits[i])
                else:
                    bob_results.append(np.random.randint(0, 2))
        else:
            # Normal transmission
            bob_results = []
            for i in range(qubit_length):
                if alice_bases[i] == bob_bases[i]:
                    bob_results.append(alice_bits[i])
                else:
                    bob_results.append(np.random.randint(0, 2))
        
        # Find matching bases
        matching_bases = (alice_bases == bob_bases)
        final_key = alice_bits[matching_bases].tolist()
        
        return jsonify({
            'success': True,
            'data': {
                'alice_bits': alice_bits.tolist(),
                'alice_bases': alice_bases.tolist(),
                'bob_bases': bob_bases.tolist(),
                'bob_results': bob_results,
                'matching_bases': matching_bases.tolist(),
                'final_key': final_key,
                'key_length': len(final_key)
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Statistics Endpoints
@app.route('/api/stats/quantum', methods=['GET'])
def quantum_stats():
    try:
        stats = {
            'qber_threshold': 0.11,
            'current_qber': 0.042,
            'security_level': 'secure',
            'raw_key_length': 1024,
            'sifted_key': 512,
            'final_key': 384,
            'channel_noise': 0.021,
            'transmission_rate': 0.987,
            'efficiency': 0.753
        }
        
        return jsonify({
            'success': True,
            'stats': stats
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
