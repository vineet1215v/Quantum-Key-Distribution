import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QuantumBit } from "./QuantumBit";
import { QuantumChannel } from "./QuantumChannel";
import { ParticipantCard } from "./ParticipantCard";
import { Play, Pause, RotateCcw, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SecureMessaging } from "./SecureMessaging";
import { runBB84Simulation } from "@/lib/quantum-api";

interface BB84SimulatorProps {
  isSimulating: boolean;
  onSimulationChange: (simulating: boolean) => void;
}

export const BB84Simulator = ({ isSimulating, onSimulationChange }: BB84SimulatorProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [eveEnabled, setEveEnabled] = useState(false);
  const [qubitLength, setQubitLength] = useState(16);
  const [simulationData, setSimulationData] = useState({
    aliceBits: [] as number[],
    aliceBases: [] as number[],
    bobBases: [] as number[],
    bobResults: [] as number[],
    matchingBases: [] as boolean[],
    finalKey: [] as number[]
  });

  const steps = [
    "Alice generates random bits and bases",
    "Alice prepares quantum states",
    "Quantum transmission through channel",
    "Bob measures with random bases", 
    "Public basis comparison",
    "Key sifting and error checking",
    "Final secure key established"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            onSimulationChange(false);
            return prev;
          }
          return prev + 1;
        });
        setProgress((prev) => Math.min(prev + 100 / steps.length, 100));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, onSimulationChange]);

  const startSimulation = async () => {
    try {
      const response = await runBB84Simulation({ 
        qubit_length: qubitLength, 
        eve_enabled: eveEnabled 
      });
      
      if (response.success) {
        setSimulationData({
          aliceBits: response.data.alice_bits,
          aliceBases: response.data.alice_bases,
          bobBases: response.data.bob_bases,
          bobResults: response.data.bob_results,
          matchingBases: response.data.matching_bases,
          finalKey: response.data.final_key
        });

        setCurrentStep(0);
        setProgress(0);
        onSimulationChange(true);
      } else {
        console.error('Simulation error:', response.error);
      }
    } catch (error) {
      console.error('Error starting simulation:', error);
    }
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setProgress(0);
    onSimulationChange(false);
  };

  return (
    <Card className="p-6 space-y-6 border-quantum-entangled/20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-quantum-entangled">BB84 Protocol Simulation</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="qubit-length" className="text-sm text-muted-foreground">Qubits:</Label>
            <Input
              id="qubit-length"
              type="number"
              min="8"
              max="128"
              step="8"
              value={qubitLength}
              onChange={(e) => setQubitLength(Number(e.target.value))}
              disabled={isSimulating}
              className="w-20 h-8 text-center"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEveEnabled(!eveEnabled)}
            className={eveEnabled ? "border-quantum-eve text-quantum-eve" : ""}
          >
            {eveEnabled ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
            Eve {eveEnabled ? "Active" : "Disabled"}
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Simulation Progress</span>
          <Badge variant="outline" className="text-quantum-entangled border-quantum-entangled/30">
            Step {currentStep + 1} of {steps.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground">{steps[currentStep]}</p>
      </div>

      {/* Participants */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ParticipantCard
          name="Alice"
          role="Sender"
          color="quantum-alice"
          data={{
            bits: simulationData.aliceBits.slice(0, 8),
            bases: simulationData.aliceBases.slice(0, 8)
          }}
          active={currentStep <= 2}
        />
        
        {eveEnabled && (
          <ParticipantCard
            name="Eve"
            role="Eavesdropper"
            color="quantum-eve"
            data={{
              bits: simulationData.aliceBits.slice(0, 8).map(() => Math.random() > 0.5 ? 1 : 0),
              bases: simulationData.aliceBases.slice(0, 8).map(() => Math.random() > 0.5 ? 1 : 0)
            }}
            active={currentStep === 2}
            className="animate-quantum-pulse"
          />
        )}

        <ParticipantCard
          name="Bob"
          role="Receiver"
          color="quantum-bob"
          data={{
            bits: simulationData.bobResults.slice(0, 8),
            bases: simulationData.bobBases.slice(0, 8)
          }}
          active={currentStep >= 3}
        />
      </div>

      {/* Quantum Channel Visualization */}
      <QuantumChannel 
        active={isSimulating && currentStep >= 1 && currentStep <= 3}
        eveActive={eveEnabled && currentStep === 2}
      />

      {/* Key Generation Results */}
      {currentStep >= 5 && (
        <Card className="p-4 bg-muted/30 border-quantum-entangled/20">
          <h3 className="text-lg font-semibold mb-3 text-quantum-entangled">Key Generation Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Matching Bases:</p>
              <div className="flex flex-wrap gap-1">
                {simulationData.matchingBases.map((match, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded text-xs flex items-center justify-center font-mono ${
                      match 
                        ? "bg-quantum-entangled/20 text-quantum-entangled border border-quantum-entangled/30" 
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {match ? "✓" : "✗"}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Final Secure Key:</p>
              <div className="flex flex-wrap gap-1">
                {simulationData.finalKey.map((bit, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded bg-primary/20 text-primary border border-primary/30 text-xs flex items-center justify-center font-mono"
                  >
                    {bit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Secure Messaging Interface */}
      {currentStep >= 6 && (
        <SecureMessaging
          hasSecureKey={simulationData.finalKey.length > 0}
          quantumKey={simulationData.finalKey}
          eveActive={eveEnabled}
          isConnected={currentStep >= 6}
        />
      )}

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={startSimulation}
          disabled={isSimulating}
          className="bg-quantum-entangled hover:bg-quantum-entangled/80"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Simulation
        </Button>
        <Button
          variant="outline"
          onClick={resetSimulation}
          className="border-quantum-alice text-quantum-alice hover:bg-quantum-alice/10"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </Card>
  );
};