import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { QiskitBB84Simulator, type BB84Result } from '@/lib/qiskit-utils';
import { Play, Pause, RotateCcw, Cpu, Zap, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface QiskitBB84SimulatorProps {
  onResultChange?: (result: BB84Result | null) => void;
}

export const QiskitBB84SimulatorComponent = ({ onResultChange }: QiskitBB84SimulatorProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [keyLength, setKeyLength] = useState(16);
  const [result, setResult] = useState<BB84Result | null>(null);
  const [progress, setProgress] = useState(0);
  const [simulator] = useState(() => new QiskitBB84Simulator());
  const [circuitDiagram, setCircuitDiagram] = useState<string>('');

  const runSimulation = async () => {
    try {
      setIsRunning(true);
      setProgress(0);
      simulator.reset();

      // Simulate progressive steps
      const steps = [
        'Initializing quantum circuit...',
        'Generating Alice\'s random bits and bases...',
        'Preparing quantum states...',
        'Transmitting through quantum channel...',
        'Bob performing measurements...',
        'Comparing bases publicly...',
        'Sifting secure key...',
        'Calculating error rates...'
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress((i + 1) / steps.length * 100);
        toast.info(steps[i]);
      }

      // Run actual BB84 protocol
      const bb84Result = simulator.runBB84Protocol(keyLength);
      const diagram = simulator.getCircuitDiagram();
      
      setResult(bb84Result);
      setCircuitDiagram(diagram);
      onResultChange?.(bb84Result);

      toast.success(`BB84 protocol completed! Generated ${bb84Result.siftedKey.length}-bit secure key`);
    } catch (error) {
      console.error('Simulation error:', error);
      toast.error('Simulation failed. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const resetSimulation = () => {
    setResult(null);
    setProgress(0);
    setCircuitDiagram('');
    simulator.reset();
    onResultChange?.(null);
    toast.info('Simulation reset');
  };

  return (
    <div className="space-y-6">
      {/* Main Control Panel */}
      <Card className="p-6 border-quantum-entangled/20">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-quantum-entangled flex items-center gap-2">
                <Cpu className="w-6 h-6" />
                Qiskit BB84 Simulator
              </h2>
              <p className="text-muted-foreground">
                Real quantum circuit simulation using IBM Qiskit
              </p>
            </div>
            <Badge variant="outline" className="border-quantum-entangled text-quantum-entangled">
              <Zap className="w-4 h-4 mr-2" />
              Quantum Powered
            </Badge>
          </div>

          {/* Configuration */}
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="key-length">Key Length (qubits)</Label>
              <Input
                id="key-length"
                type="number"
                min="4"
                max="64"
                step="4"
                value={keyLength}
                onChange={(e) => setKeyLength(Number(e.target.value))}
                disabled={isRunning}
                className="w-32"
              />
            </div>
          </div>

          {/* Progress */}
          {(isRunning || progress > 0) && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Simulation Progress</span>
                <span className="text-sm font-mono text-quantum-entangled">{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-4">
            <Button
              onClick={runSimulation}
              disabled={isRunning}
              className="bg-quantum-entangled hover:bg-quantum-entangled/80"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? 'Running...' : 'Start BB84 Protocol'}
            </Button>
            <Button
              variant="outline"
              onClick={resetSimulation}
              disabled={isRunning}
              className="border-quantum-alice text-quantum-alice hover:bg-quantum-alice/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Quantum Circuit Visualization */}
      {circuitDiagram && (
        <Card className="p-6 border-quantum-alice/20">
          <h3 className="text-lg font-semibold mb-4 text-quantum-alice flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Quantum Circuit Diagram
          </h3>
          <Textarea
            value={circuitDiagram}
            readOnly
            className="font-mono text-sm min-h-[200px] bg-muted/30"
            placeholder="Circuit diagram will appear here after simulation..."
          />
        </Card>
      )}

      {/* Results */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alice's States */}
          <Card className="p-6 border-quantum-alice/20">
            <h3 className="text-lg font-semibold mb-4 text-quantum-alice">
              Alice's Quantum States
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-8 gap-2">
                {result.aliceStates.slice(0, 16).map((state, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded border border-quantum-alice/30 bg-quantum-alice/10 flex items-center justify-center text-xs font-mono text-quantum-alice"
                    title={`Qubit ${i}: ${state.state} (${state.basis})`}
                  >
                    {state.state}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                States prepared in {result.aliceStates.length} qubits
              </div>
            </div>
          </Card>

          {/* Bob's Measurements */}
          <Card className="p-6 border-quantum-bob/20">
            <h3 className="text-lg font-semibold mb-4 text-quantum-bob">
              Bob's Measurements
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-8 gap-2">
                {result.bobMeasurements.slice(0, 16).map((measurement, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded border border-quantum-bob/30 bg-quantum-bob/10 flex items-center justify-center text-xs font-mono text-quantum-bob"
                    title={`Measurement ${i}: ${measurement.state} (${measurement.basis})`}
                  >
                    {measurement.state}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Measurements from {result.bobMeasurements.length} qubits
              </div>
            </div>
          </Card>

          {/* Key Sifting Results */}
          <Card className="p-6 border-quantum-entangled/20 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-quantum-entangled flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Secure Key Generation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Matching Bases</Label>
                <div className="flex flex-wrap gap-1">
                  {result.matchingBases.map((match, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                        match
                          ? 'bg-quantum-entangled/20 text-quantum-entangled border border-quantum-entangled/30'
                          : 'bg-muted text-muted-foreground border border-border'
                      }`}
                    >
                      {match ? '✓' : '✗'}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Sifted Key</Label>
                <div className="p-3 rounded bg-primary/5 border border-primary/20">
                  <div className="font-mono text-sm text-primary break-all">
                    {result.siftedKey || 'No key generated'}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Key Length</Label>
                  <div className="text-lg font-semibold text-quantum-entangled">
                    {result.siftedKey.length} bits
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Error Rate (QBER)</Label>
                  <div className={`text-lg font-semibold ${
                    result.errorRate < 0.11 ? 'text-primary' : 'text-destructive'
                  }`}>
                    {(result.errorRate * 100).toFixed(2)}%
                  </div>
                </div>
                <Badge
                  variant={result.errorRate < 0.11 ? 'default' : 'destructive'}
                  className="w-full justify-center"
                >
                  {result.errorRate < 0.11 ? 'Secure' : 'Compromised'}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};