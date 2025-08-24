import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, RotateCcw, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface QuantumGate {
  name: string;
  symbol: string;
  description: string;
  color: string;
}

interface CircuitElement {
  qubit: number;
  gate: QuantumGate;
  position: number;
  controlled?: number[];
}

const QUANTUM_GATES: QuantumGate[] = [
  { name: 'Hadamard', symbol: 'H', description: 'Creates superposition', color: 'quantum-alice' },
  { name: 'Pauli-X', symbol: 'X', description: 'Bit flip', color: 'quantum-bob' },
  { name: 'Pauli-Y', symbol: 'Y', description: 'Bit + phase flip', color: 'quantum-entangled' },
  { name: 'Pauli-Z', symbol: 'Z', description: 'Phase flip', color: 'quantum-noise' },
  { name: 'CNOT', symbol: '⊕', description: 'Controlled NOT', color: 'quantum-eve' },
  { name: 'Measure', symbol: 'M', description: 'Measurement', color: 'primary' },
];

export const QuantumCircuitVisualizer = () => {
  const [numQubits, setNumQubits] = useState(3);
  const [circuit, setCircuit] = useState<CircuitElement[]>([]);
  const [selectedGate, setSelectedGate] = useState<QuantumGate>(QUANTUM_GATES[0]);
  const [circuitDepth, setCircuitDepth] = useState(8);

  const addGate = (qubit: number, position: number) => {
    const newElement: CircuitElement = {
      qubit,
      gate: selectedGate,
      position,
    };

    setCircuit(prev => [
      ...prev.filter(el => !(el.qubit === qubit && el.position === position)),
      newElement
    ]);
  };

  const removeGate = (qubit: number, position: number) => {
    setCircuit(prev => prev.filter(el => !(el.qubit === qubit && el.position === position)));
  };

  const clearCircuit = () => {
    setCircuit([]);
    toast.info('Circuit cleared');
  };

  const exportCircuit = () => {
    const qiskitCode = generateQiskitCode();
    navigator.clipboard.writeText(qiskitCode);
    toast.success('Qiskit code copied to clipboard!');
  };

  const generateQiskitCode = () => {
    let code = `from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister\n\n`;
    code += `# Create quantum circuit with ${numQubits} qubits\n`;
    code += `qreg = QuantumRegister(${numQubits}, 'q')\n`;
    code += `creg = ClassicalRegister(${numQubits}, 'c')\n`;
    code += `circuit = QuantumCircuit(qreg, creg)\n\n`;

    // Sort circuit elements by position
    const sortedCircuit = [...circuit].sort((a, b) => a.position - b.position);

    sortedCircuit.forEach(element => {
      const { gate, qubit } = element;
      switch (gate.name) {
        case 'Hadamard':
          code += `circuit.h(qreg[${qubit}])\n`;
          break;
        case 'Pauli-X':
          code += `circuit.x(qreg[${qubit}])\n`;
          break;
        case 'Pauli-Y':
          code += `circuit.y(qreg[${qubit}])\n`;
          break;
        case 'Pauli-Z':
          code += `circuit.z(qreg[${qubit}])\n`;
          break;
        case 'CNOT':
          code += `circuit.cx(qreg[${qubit}], qreg[${(qubit + 1) % numQubits}])\n`;
          break;
        case 'Measure':
          code += `circuit.measure(qreg[${qubit}], creg[${qubit}])\n`;
          break;
      }
    });

    code += `\n# Draw circuit\nprint(circuit.draw())`;
    return code;
  };

  return (
    <Card className="p-6 border-quantum-entangled/20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-quantum-entangled flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Interactive Quantum Circuit Builder
            </h3>
            <p className="text-muted-foreground text-sm">
              Build quantum circuits visually and export to Qiskit
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportCircuit}
              className="border-quantum-alice text-quantum-alice hover:bg-quantum-alice/10"
            >
              <Copy className="w-4 h-4 mr-2" />
              Export Code
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCircuit}
              className="border-quantum-bob text-quantum-bob hover:bg-quantum-bob/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Qubits:</label>
            <Select value={numQubits.toString()} onValueChange={(v) => setNumQubits(Number(v))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5, 6].map(n => (
                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Selected Gate:</label>
            <Select value={selectedGate.name} onValueChange={(v) => {
              const gate = QUANTUM_GATES.find(g => g.name === v);
              if (gate) setSelectedGate(gate);
            }}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUANTUM_GATES.map(gate => (
                  <SelectItem key={gate.name} value={gate.name}>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-${gate.color} border-${gate.color}/30`}>
                        {gate.symbol}
                      </Badge>
                      {gate.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Circuit Grid */}
        <div className="border border-border rounded-lg p-4 bg-muted/20 overflow-x-auto">
          <div className="space-y-2" style={{ minWidth: `${circuitDepth * 60 + 100}px` }}>
            {/* Time steps header */}
            <div className="flex items-center">
              <div className="w-20 text-sm text-muted-foreground font-mono">Time</div>
              {Array.from({ length: circuitDepth }, (_, i) => (
                <div key={i} className="w-14 text-center text-xs text-muted-foreground font-mono">
                  t{i}
                </div>
              ))}
            </div>

            {/* Qubit rows */}
            {Array.from({ length: numQubits }, (_, qubit) => (
              <div key={qubit} className="flex items-center group">
                {/* Qubit label */}
                <div className="w-20 text-sm font-mono text-quantum-entangled">
                  |q{qubit}⟩
                </div>

                {/* Circuit positions */}
                <div className="flex">
                  {Array.from({ length: circuitDepth }, (_, position) => {
                    const element = circuit.find(el => el.qubit === qubit && el.position === position);
                    return (
                      <div
                        key={position}
                        className="w-14 h-10 border border-border/30 flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors relative"
                        onClick={() => element ? removeGate(qubit, position) : addGate(qubit, position)}
                      >
                        {/* Quantum wire */}
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full h-0.5 bg-quantum-entangled/30"></div>
                        </div>

                        {/* Gate */}
                        {element && (
                          <Badge
                            variant="outline"
                            className={`text-${element.gate.color} border-${element.gate.color}/30 bg-${element.gate.color}/10 font-mono z-10`}
                          >
                            {element.gate.symbol}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gate Legend */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground">Available Gates:</h4>
          <div className="flex flex-wrap gap-2">
            {QUANTUM_GATES.map(gate => (
              <div
                key={gate.name}
                className={`p-2 rounded border cursor-pointer transition-colors ${
                  selectedGate.name === gate.name
                    ? `border-${gate.color} bg-${gate.color}/10`
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => setSelectedGate(gate)}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-${gate.color} border-${gate.color}/30`}>
                    {gate.symbol}
                  </Badge>
                  <div className="text-sm">
                    <div className="font-medium">{gate.name}</div>
                    <div className="text-muted-foreground text-xs">{gate.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Circuit Statistics */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-quantum-entangled">{circuit.length}</div>
            <div className="text-sm text-muted-foreground">Total Gates</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-quantum-alice">{numQubits}</div>
            <div className="text-sm text-muted-foreground">Qubits</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-quantum-bob">
              {Math.max(...circuit.map(el => el.position), -1) + 1}
            </div>
            <div className="text-sm text-muted-foreground">Circuit Depth</div>
          </div>
        </div>
      </div>
    </Card>
  );
};