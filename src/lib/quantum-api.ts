// Quantum API service for Flask backend integration
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Health check
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend server is not available');
  }
};

// BB84 Protocol API
export interface BB84SimulationRequest {
  qubit_length: number;
  eve_enabled: boolean;
}

export interface BB84SimulationResponse {
  success: boolean;
  data: {
    alice_bits: number[];
    alice_bases: number[];
    bob_bases: number[];
    bob_results: number[];
    matching_bases: boolean[];
    final_key: number[];
    key_length: number;
  };
  error?: string;
}

export const runBB84Simulation = async (request: BB84SimulationRequest): Promise<BB84SimulationResponse> => {
  const response = await apiClient.post('/bb84/simulate', request);
  return response.data;
};

export interface QASMGenerationRequest {
  alice_bits: number[];
  alice_bases: number[];
  bob_bases: number[];
}

export interface QASMGenerationResponse {
  success: boolean;
  qasm: string;
  error?: string;
}

export const generateBB84QASM = async (request: QASMGenerationRequest): Promise<QASMGenerationResponse> => {
  const response = await apiClient.post('/bb84/generate-qasm', request);
  return response.data;
};

// Qiskit Integration API
export interface QuantumDevice {
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  queue_length: number;
  n_qubits: number;
  basis_gates: string[];
  simulator: boolean;
}

export interface DevicesResponse {
  success: boolean;
  devices: QuantumDevice[];
  error?: string;
}

export const getQuantumDevices = async (): Promise<DevicesResponse> => {
  const response = await apiClient.get('/qiskit/devices');
  return response.data;
};

export interface JobSubmissionRequest {
  qasm: string;
  shots?: number;
  backend?: string;
}

export interface JobSubmissionResponse {
  success: boolean;
  job_id: string;
  status: string;
  results: {
    counts: Record<string, number>;
    shots: number;
    backend: string;
  };
  error?: string;
}

export const submitQuantumJob = async (request: JobSubmissionRequest): Promise<JobSubmissionResponse> => {
  const response = await apiClient.post('/qiskit/submit-job', request);
  return response.data;
};

// Quantum Circuit API
export interface BellCircuitResponse {
  success: boolean;
  qasm: string;
  circuit_image: string;
  error?: string;
}

export const generateBellCircuit = async (): Promise<BellCircuitResponse> => {
  const response = await apiClient.get('/circuit/generate-bell');
  return response.data;
};

export interface CircuitVisualizationRequest {
  qasm: string;
}

export interface CircuitVisualizationResponse {
  success: boolean;
  circuit_image: string;
  error?: string;
}

export const visualizeCircuit = async (request: CircuitVisualizationRequest): Promise<CircuitVisualizationResponse> => {
  const response = await apiClient.post('/circuit/visualize', request);
  return response.data;
};

// Statistics API
export interface QuantumStats {
  qber_threshold: number;
  current_qber: number;
  security_level: string;
  raw_key_length: number;
  sifted_key: number;
  final_key: number;
  channel_noise: number;
  transmission_rate: number;
  efficiency: number;
}

export interface StatsResponse {
  success: boolean;
  stats: QuantumStats;
  error?: string;
}

export const getQuantumStats = async (): Promise<StatsResponse> => {
  const response = await apiClient.get('/stats/quantum');
  return response.data;
};

// Utility function to check backend connectivity
export const isBackendAvailable = async (): Promise<boolean> => {
  try {
    await checkHealth();
    return true;
  } catch (error) {
    console.warn('Backend not available:', error);
    return false;
  }
};

export default apiClient;
