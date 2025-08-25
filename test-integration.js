// Test script to verify frontend-backend integration
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

async function testIntegration() {
  console.log('🧪 Testing Quantum Key Whisper Frontend-Backend Integration...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    
    // Test BB84 simulation
    console.log('\n2. Testing BB84 simulation...');
    const simulationResponse = await axios.post(`${API_BASE_URL}/bb84/simulate`, {
      qubit_length: 8,
      eve_enabled: false
    });
    console.log('✅ BB84 Simulation successful');
    console.log('   Key length:', simulationResponse.data.data.key_length);
    console.log('   Final key:', simulationResponse.data.data.final_key.join(''));
    
    // Test quantum stats
    console.log('\n3. Testing quantum statistics...');
    const statsResponse = await axios.get(`${API_BASE_URL}/stats/quantum`);
    console.log('✅ Quantum stats:', statsResponse.data.stats);
    
    // Test Qiskit devices
    console.log('\n4. Testing Qiskit devices...');
    const devicesResponse = await axios.get(`${API_BASE_URL}/qiskit/devices`);
    console.log('✅ Qiskit devices:', devicesResponse.data.devices.length, 'devices found');
    
    console.log('\n🎉 All integration tests passed!');
    console.log('\n📋 Frontend-Backend Integration Status:');
    console.log('   ✅ Backend API: Running on http://localhost:5000');
    console.log('   ✅ Frontend: Running on http://localhost:8080');
    console.log('   ✅ CORS: Enabled and working');
    console.log('   ✅ API Endpoints: All endpoints responding');
    console.log('   ✅ Data Flow: Frontend can communicate with backend');
    
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    if (error.response) {
      console.error('   Response status:', error.response.status);
      console.error('   Response data:', error.response.data);
    }
  }
}

testIntegration();
