// Qiskit-like utilities implemented in TypeScript for browser compatibility
// Note: The real Python Qiskit cannot run in the browser. This module emulates
// the BB84 workflow and provides Qiskit-style outputs for learning purposes.

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
  private lastAliceBits: number[] = [];
  private lastAliceBases: number[] = [];
  private lastBobBases: number[] = [];
  private lastBobBits: number[] = [];

  // Alice prepares quantum states (emulated)
  prepareAliceStates(bits: number[], bases: number[]): QuantumState[] {
    this.lastAliceBits = bits;
    this.lastAliceBases = bases;

    return bits.map((bit, i) => ({
      qubit: i,
      basis: bases[i] === 0 ? 'rectilinear' : 'diagonal',
      state: this.getStateLabel(bit, bases[i]),
      measured: false,
    }));
  }

  // Bob measures quantum states (emulated with BB84 behavior)
  measureBobStates(bobBases: number[]): QuantumState[] {
    this.lastBobBases = bobBases;

    const measurements: QuantumState[] = [];
    this.lastBobBits = this.lastAliceBits.map((bit, i) => {
      const sameBasis = this.lastAliceBases[i] === bobBases[i];
      const measuredBit = sameBasis ? bit : Math.round(Math.random());
      measurements.push({
        qubit: i,
        basis: bobBases[i] === 0 ? 'rectilinear' : 'diagonal',
        state: (measuredBit.toString() as '0' | '1'),
        measured: true,
      });
      return measuredBit;
    });

    return measurements;
  }

  // Simulate complete BB84 protocol
  runBB84Protocol(keyLength: number): BB84Result {
    const aliceBits = Array.from({ length: keyLength }, () => Math.floor(Math.random() * 2));
    const aliceBases = Array.from({ length: keyLength }, () => Math.floor(Math.random() * 2));
    const bobBases = Array.from({ length: keyLength }, () => Math.floor(Math.random() * 2));

    const aliceStates = this.prepareAliceStates(aliceBits, aliceBases);
    const bobMeasurements = this.measureBobStates(bobBases);

    const matchingBases = aliceBases.map((a, i) => a === bobBases[i]);

    // Sifted key and error rate
    const siftedIndices = matchingBases.reduce<number[]>((acc, match, i) => {
      if (match) acc.push(i);
      return acc;
    }, []);

    const siftedAliceBits = siftedIndices.map(i => aliceBits[i]);
    const siftedBobBits = siftedIndices.map(i => this.lastBobBits[i]);
    const siftedKey = siftedAliceBits.join('');

    let errors = 0;
    for (let i = 0; i < siftedAliceBits.length; i++) {
      if (siftedAliceBits[i] !== siftedBobBits[i]) errors++;
    }
    const errorRate = siftedAliceBits.length > 0 ? errors / siftedAliceBits.length : 0;

    return { aliceStates, bobMeasurements, matchingBases, siftedKey, errorRate };
  }

  // ASCII-like circuit diagram for illustration only
  getCircuitDiagram(): string {
    const n = this.lastAliceBits.length || 4;
    const steps = ['Prep', 'Chan', 'Meas'];
    const header = '     ' + steps.map((s, i) => `${s.padEnd(6)}`).join('');
    const lines = [header];

    for (let q = 0; q < n; q++) {
      const aBasis = this.lastAliceBases[q] ?? 0;
      const bBasis = this.lastBobBases[q] ?? 0;
      const aGate = aBasis === 1 ? 'H' : 'I';
      const bGate = bBasis === 1 ? 'H' : 'I';
      const wire = `q[${q}] — ${aGate.padEnd(5)}— — ${bGate.padEnd(5)}M`;
      lines.push(wire);
    }

    return lines.join('\n');
  }

  reset(): void {
    this.lastAliceBits = [];
    this.lastAliceBases = [];
    this.lastBobBases = [];
    this.lastBobBits = [];
  }

  private getStateLabel(bit: number, basis: number): '0' | '1' | '+' | '-' {
    if (basis === 0) return bit === 0 ? '0' : '1';
    return bit === 0 ? '+' : '-';
  }
}

// Simple helpers for learning modules
export class QuantumErrorCorrection {
  static calculateQBER(originalKey: string, receivedKey: string): number {
    if (originalKey.length !== receivedKey.length) return 1;
    let errors = 0;
    for (let i = 0; i < originalKey.length; i++) if (originalKey[i] !== receivedKey[i]) errors++;
    return originalKey.length > 0 ? errors / originalKey.length : 0;
  }

  static applyShorCode(data: string): string {
    return data.split('').map(bit => bit.repeat(9)).join('');
  }

  static correctShorCode(encodedData: string): string {
    const corrected: string[] = [];
    for (let i = 0; i < encodedData.length; i += 9) {
      const block = encodedData.slice(i, i + 9);
      const zeros = [...block].filter(ch => ch === '0').length;
      const ones = block.length - zeros;
      corrected.push(zeros > ones ? '0' : '1');
    }
    return corrected.join('');
  }
}

export class QuantumEntanglement {
  static createBellState() {
    const m = Math.random() > 0.5 ? '1' : '0';
    return { qubit1: m, qubit2: m, entangled: true } as const;
  }

  static measureEntangledPair(state: { qubit1: string; qubit2: string; entangled: boolean }) {
    if (!state.entangled) return { measurement1: Math.random() > 0.5 ? '1' : '0', measurement2: Math.random() > 0.5 ? '1' : '0', correlation: 0 };
    const r = Math.random() > 0.5 ? '1' : '0';
    return { measurement1: r, measurement2: r, correlation: 1 } as const;
  }
}
