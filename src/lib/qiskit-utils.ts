// Qiskit integration utilities
import { QuantumCircuit, ClassicalRegister, QuantumRegister } from 'qiskit';

export interface QuantumState {
  qubit: number;
  basis: 'rectilinear' | 'diagonal';
  state: '0' | '1' | '+' | '-';
  measured?: boolean;
}

export interface BB84Result {
  aliceStates: QuantumState[];
  bobMeasurements: QuantumState[];
  matchingBases: boolean[];
  siftedKey: string;
  errorRate: number;
}

export class QiskitBB84Simulator {
  private qreg: QuantumRegister;
  private creg: ClassicalRegister;
  private circuit: QuantumCircuit;

  constructor(keyLength: number = 16) {
    this.qreg = new QuantumRegister(keyLength, 'q');
    this.creg = new ClassicalRegister(keyLength, 'c');
    this.circuit = new QuantumCircuit(this.qreg, this.creg);
  }

  // Alice prepares quantum states
  prepareAliceStates(bits: number[], bases: number[]): QuantumState[] {
    const states: QuantumState[] = [];
    
    for (let i = 0; i < bits.length; i++) {
      const bit = bits[i];
      const basis = bases[i];
      
      // Reset qubit
      this.circuit.reset(this.qreg[i]);
      
      // Prepare state based on bit value
      if (bit === 1) {
        this.circuit.x(this.qreg[i]); // |1⟩ state
      }
      
      // Apply basis rotation
      if (basis === 1) {
        this.circuit.h(this.qreg[i]); // Diagonal basis
      }
      
      states.push({
        qubit: i,
        basis: basis === 0 ? 'rectilinear' : 'diagonal',
        state: this.getStateLabel(bit, basis),
        measured: false
      });
    }
    
    return states;
  }

  // Bob measures quantum states
  measureBobStates(bobBases: number[]): QuantumState[] {
    const measurements: QuantumState[] = [];
    
    for (let i = 0; i < bobBases.length; i++) {
      const basis = bobBases[i];
      
      // Apply measurement basis
      if (basis === 1) {
        this.circuit.h(this.qreg[i]); // Diagonal measurement
      }
      
      // Measure
      this.circuit.measure(this.qreg[i], this.creg[i]);
      
      // Simulate measurement result (simplified for demo)
      const result = Math.random() > 0.5 ? 1 : 0;
      
      measurements.push({
        qubit: i,
        basis: basis === 0 ? 'rectilinear' : 'diagonal',
        state: result.toString() as '0' | '1',
        measured: true
      });
    }
    
    return measurements;
  }

  // Simulate complete BB84 protocol
  runBB84Protocol(keyLength: number): BB84Result {
    // Alice generates random bits and bases
    const aliceBits = Array.from({ length: keyLength }, () => Math.floor(Math.random() * 2));
    const aliceBases = Array.from({ length: keyLength }, () => Math.floor(Math.random() * 2));
    const bobBases = Array.from({ length: keyLength }, () => Math.floor(Math.random() * 2));

    // Alice prepares quantum states
    const aliceStates = this.prepareAliceStates(aliceBits, aliceBases);

    // Bob measures with his random bases
    const bobMeasurements = this.measureBobStates(bobBases);

    // Compare bases and create sifted key
    const matchingBases = aliceBases.map((aliceBasis, i) => aliceBasis === bobBases[i]);
    const siftedBits = aliceBits.filter((_, i) => matchingBases[i]);
    const siftedKey = siftedBits.join('');

    // Calculate error rate (simplified)
    const errors = siftedBits.filter((bit, i) => {
      const bobBit = parseInt(bobMeasurements.filter((_, j) => matchingBases[j])[i]?.state || '0');
      return bit !== bobBit;
    }).length;
    
    const errorRate = siftedBits.length > 0 ? errors / siftedBits.length : 0;

    return {
      aliceStates,
      bobMeasurements,
      matchingBases,
      siftedKey,
      errorRate
    };
  }

  private getStateLabel(bit: number, basis: number): '0' | '1' | '+' | '-' {
    if (basis === 0) {
      return bit === 0 ? '0' : '1';
    } else {
      return bit === 0 ? '+' : '-';
    }
  }

  // Get circuit diagram as string
  getCircuitDiagram(): string {
    try {
      return this.circuit.draw('text');
    } catch (error) {
      return 'Circuit diagram not available';
    }
  }

  // Reset circuit for new simulation
  reset(): void {
    this.circuit = new QuantumCircuit(this.qreg, this.creg);
  }
}

// Quantum error correction utilities
export class QuantumErrorCorrection {
  static calculateQBER(originalKey: string, receivedKey: string): number {
    if (originalKey.length !== receivedKey.length) {
      throw new Error('Key lengths must match');
    }
    
    let errors = 0;
    for (let i = 0; i < originalKey.length; i++) {
      if (originalKey[i] !== receivedKey[i]) {
        errors++;
      }
    }
    
    return originalKey.length > 0 ? errors / originalKey.length : 0;
  }

  static applyShorCode(data: string): string {
    // Simplified Shor 9-qubit error correction
    return data.split('').map(bit => bit.repeat(9)).join('');
  }

  static correctShorCode(encodedData: string): string {
    // Simplified error correction - majority vote
    const corrected: string[] = [];
    
    for (let i = 0; i < encodedData.length; i += 9) {
      const block = encodedData.slice(i, i + 9);
      const zeros = block.split('0').length - 1;
      const ones = block.split('1').length - 1;
      corrected.push(zeros > ones ? '0' : '1');
    }
    
    return corrected.join('');
  }
}

// Quantum entanglement simulator
export class QuantumEntanglement {
  static createBellState(): { qubit1: string; qubit2: string; entangled: boolean } {
    // Simulate Bell state |Φ+⟩ = (|00⟩ + |11⟩)/√2
    const measurement = Math.random() > 0.5;
    return {
      qubit1: measurement ? '1' : '0',
      qubit2: measurement ? '1' : '0',
      entangled: true
    };
  }

  static measureEntangledPair(state: { qubit1: string; qubit2: string; entangled: boolean }): {
    measurement1: string;
    measurement2: string;
    correlation: number;
  } {
    if (!state.entangled) {
      return {
        measurement1: Math.random() > 0.5 ? '1' : '0',
        measurement2: Math.random() > 0.5 ? '1' : '0',
        correlation: 0
      };
    }

    // Perfect correlation for Bell state
    const result = Math.random() > 0.5 ? '1' : '0';
    return {
      measurement1: result,
      measurement2: result,
      correlation: 1.0
    };
  }
}