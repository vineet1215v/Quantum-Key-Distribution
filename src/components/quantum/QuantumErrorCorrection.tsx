import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Zap, Activity } from "lucide-react";

interface QuantumErrorCorrectionProps {
  noiseLevel: number;
  isRunning: boolean;
  efficiency: number;
}

export const QuantumErrorCorrection = ({ noiseLevel, isRunning, efficiency }: QuantumErrorCorrectionProps) => {
  const [errorStats, setErrorStats] = useState({
    totalErrors: 0,
    correctedErrors: 0,
    uncorrectableErrors: 0,
    syndromeDetections: 0,
    parityChecks: 0
  });
  
  const [selectedCode, setSelectedCode] = useState("shor");
  const [errorPattern, setErrorPattern] = useState<string[]>([]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const newErrors = Math.floor(noiseLevel * 1000 + Math.random() * 100);
        const corrected = Math.floor(newErrors * (efficiency / 100));
        
        setErrorStats(prev => ({
          totalErrors: prev.totalErrors + newErrors,
          correctedErrors: prev.correctedErrors + corrected,
          uncorrectableErrors: prev.uncorrectableErrors + (newErrors - corrected),
          syndromeDetections: prev.syndromeDetections + Math.floor(Math.random() * 50),
          parityChecks: prev.parityChecks + Math.floor(Math.random() * 200)
        }));
        
        // Generate error pattern visualization
        const pattern = Array.from({ length: 16 }, () => 
          Math.random() < noiseLevel ? "error" : Math.random() < 0.1 ? "corrected" : "clean"
        );
        setErrorPattern(pattern);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isRunning, noiseLevel, efficiency]);

  const errorCorrectionCodes = [
    {
      id: "shor",
      name: "Shor Code",
      description: "9-qubit code correcting arbitrary single-qubit errors",
      efficiency: 88,
      redundancy: "9:1",
      threshold: 0.025
    },
    {
      id: "steane",
      name: "Steane Code", 
      description: "7-qubit CSS code with transversal gates",
      efficiency: 92,
      redundancy: "7:1",
      threshold: 0.029
    },
    {
      id: "surface",
      name: "Surface Code",
      description: "Topological code with high error threshold",
      efficiency: 95,
      redundancy: "Variable",
      threshold: 0.01
    },
    {
      id: "color",
      name: "Color Code",
      description: "2D topological code with universal gates",
      efficiency: 90,
      redundancy: "Variable", 
      threshold: 0.008
    },
    {
      id: "repetition",
      name: "Repetition Code",
      description: "Simple bit-flip error correction",
      efficiency: 75,
      redundancy: "3:1",
      threshold: 0.15
    }
  ];

  const currentCode = errorCorrectionCodes.find(code => code.id === selectedCode);
  const correctionRate = errorStats.totalErrors > 0 ? (errorStats.correctedErrors / errorStats.totalErrors) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Error Correction Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-quantum-eve/20">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-quantum-eve" />
            <div>
              <p className="text-sm text-muted-foreground">Total Errors</p>
              <p className="text-xl font-bold text-quantum-eve">
                {errorStats.totalErrors.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-entangled/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-quantum-entangled" />
            <div>
              <p className="text-sm text-muted-foreground">Corrected</p>
              <p className="text-xl font-bold text-quantum-entangled">
                {errorStats.correctedErrors.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-alice/20">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-quantum-alice" />
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-xl font-bold text-quantum-alice">
                {correctionRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-bob/20">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-quantum-bob" />
            <div>
              <p className="text-sm text-muted-foreground">Syndrome Det.</p>
              <p className="text-xl font-bold text-quantum-bob">
                {errorStats.syndromeDetections.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="codes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="codes">Error Correction Codes</TabsTrigger>
          <TabsTrigger value="visualization">Error Visualization</TabsTrigger>
          <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="codes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Selection */}
            <Card className="p-6 border-quantum-entangled/20">
              <h3 className="text-lg font-bold text-quantum-entangled mb-4">Quantum Error Correction Codes</h3>
              <div className="space-y-4">
                {errorCorrectionCodes.map((code) => (
                  <div
                    key={code.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCode === code.id
                        ? "border-quantum-entangled bg-quantum-entangled/10"
                        : "border-border hover:border-quantum-entangled/50"
                    }`}
                    onClick={() => setSelectedCode(code.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-quantum-alice">{code.name}</h4>
                      <Badge variant="outline" className="text-quantum-bob border-quantum-bob/30">
                        {code.redundancy}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{code.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span>Efficiency:</span>
                        <span className="text-quantum-entangled">{code.efficiency}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Threshold:</span>
                        <span className="text-quantum-eve">{(code.threshold * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Current Code Analysis */}
            <Card className="p-6 border-quantum-alice/20">
              <h3 className="text-lg font-bold text-quantum-alice mb-4">
                {currentCode?.name} Analysis
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2 text-quantum-entangled">Code Properties</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Logical Qubits:</span>
                      <span className="font-mono">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Physical Qubits:</span>
                      <span className="font-mono">{currentCode?.redundancy.split(':')[0] || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Error Threshold:</span>
                      <span className="font-mono text-quantum-eve">
                        {((currentCode?.threshold || 0) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Noise:</span>
                      <span className={`font-mono ${
                        noiseLevel > (currentCode?.threshold || 0) ? "text-quantum-eve" : "text-quantum-entangled"
                      }`}>
                        {(noiseLevel * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2 text-quantum-bob">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Correction Efficiency</span>
                        <span className="text-sm font-mono">{currentCode?.efficiency}%</span>
                      </div>
                      <Progress value={currentCode?.efficiency || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Noise Tolerance</span>
                        <span className="text-sm font-mono">
                          {noiseLevel < (currentCode?.threshold || 0) ? "Within Threshold" : "Above Threshold"}
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(100, (noiseLevel / (currentCode?.threshold || 1)) * 100)} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-quantum-entangled/10 border border-quantum-entangled/20">
                  <h4 className="font-semibold mb-2 text-quantum-entangled">Stabilizer Generators</h4>
                  <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                    {selectedCode === "shor" && (
                      <>
                        <div className="bg-background p-2 rounded">X₁X₂X₃ ⊗ I⊗6</div>
                        <div className="bg-background p-2 rounded">X₄X₅X₆ ⊗ I⊗6</div>
                        <div className="bg-background p-2 rounded">Z₁Z₄ ⊗ I⊗7</div>
                        <div className="bg-background p-2 rounded">Z₂Z₅ ⊗ I⊗7</div>
                      </>
                    )}
                    {selectedCode === "steane" && (
                      <>
                        <div className="bg-background p-2 rounded">IIIXXXX</div>
                        <div className="bg-background p-2 rounded">IXXIIXX</div>
                        <div className="bg-background p-2 rounded">XIXIXIX</div>
                        <div className="bg-background p-2 rounded">IIIZZZZ</div>
                      </>
                    )}
                    {selectedCode !== "shor" && selectedCode !== "steane" && (
                      <div className="bg-background p-2 rounded text-muted-foreground">
                        Complex stabilizer structure...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <Card className="p-6 border-quantum-entangled/20">
            <h3 className="text-lg font-bold text-quantum-entangled mb-4">Real-time Error Pattern</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-8 gap-2">
                {errorPattern.map((status, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all ${
                      status === "error"
                        ? "bg-quantum-eve/20 border-quantum-eve text-quantum-eve animate-pulse"
                        : status === "corrected"
                        ? "bg-quantum-entangled/20 border-quantum-entangled text-quantum-entangled"
                        : "bg-muted/30 border-border text-muted-foreground"
                    }`}
                  >
                    {status === "error" ? "E" : status === "corrected" ? "C" : "✓"}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-quantum-eve/20 border border-quantum-eve"></div>
                  <span>Error Detected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-quantum-entangled/20 border border-quantum-entangled"></div>
                  <span>Error Corrected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-muted/30 border border-border"></div>
                  <span>Clean Qubit</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-quantum-alice/20">
              <h3 className="text-lg font-bold text-quantum-alice mb-4">Syndrome Detection</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-full h-8 rounded border flex items-center justify-center text-xs font-mono ${
                        Math.random() > 0.7
                          ? "bg-quantum-eve/20 border-quantum-eve text-quantum-eve"
                          : "bg-muted/30 border-border text-muted-foreground"
                      }`}
                    >
                      {Math.random() > 0.7 ? "1" : "0"}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Syndrome measurements detect error patterns without disturbing the logical state.
                </p>
              </div>
            </Card>

            <Card className="p-6 border-quantum-bob/20">
              <h3 className="text-lg font-bold text-quantum-bob mb-4">Error Recovery</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Recovery Operations:</span>
                  <Badge variant="outline" className="text-quantum-bob border-quantum-bob/30">
                    {Math.floor(Math.random() * 10 + 5)}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {["Pauli-X", "Pauli-Z", "Pauli-Y", "Identity"].map((op, i) => (
                    <div key={op} className="flex justify-between items-center text-sm">
                      <span>{op}:</span>
                      <span className="font-mono text-quantum-entangled">
                        {Math.floor(Math.random() * 50)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-quantum-entangled/20">
              <h3 className="text-lg font-bold text-quantum-entangled mb-4">Error Correction Efficiency</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Logical Error Rate:</span>
                    <span className="font-mono text-quantum-entangled">
                      {(noiseLevel * (1 - efficiency/100) * 100).toFixed(4)}%
                    </span>
                  </div>
                  <Progress value={noiseLevel * (1 - efficiency/100) * 1000} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Overhead Factor:</span>
                    <span className="font-mono text-quantum-alice">
                      {currentCode?.redundancy.split(':')[0] || "N/A"}×
                    </span>
                  </div>
                  <Progress value={parseInt(currentCode?.redundancy.split(':')[0] || "0") * 10} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Pseudothreshold:</span>
                    <span className="font-mono text-quantum-bob">
                      {((currentCode?.threshold || 0) * 0.8 * 100).toFixed(2)}%
                    </span>
                  </div>
                  <Progress value={(currentCode?.threshold || 0) * 0.8 * 1000} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-quantum-alice/20">
              <h3 className="text-lg font-bold text-quantum-alice mb-4">Fault-Tolerance Analysis</h3>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <h4 className="font-semibold text-sm mb-2">Threshold Theorem</h4>
                  <p className="text-xs text-muted-foreground">
                    If physical error rate p &lt; p_th, logical error rate decreases exponentially 
                    with code distance.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Status:</span>
                    <Badge variant="outline" className={
                      noiseLevel < (currentCode?.threshold || 0)
                        ? "border-quantum-entangled text-quantum-entangled"
                        : "border-quantum-eve text-quantum-eve"
                    }>
                      {noiseLevel < (currentCode?.threshold || 0) ? "Below Threshold" : "Above Threshold"}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Distance:</span>
                    <span className="font-mono text-quantum-bob">
                      {selectedCode === "steane" ? "3" : selectedCode === "shor" ? "3" : "Variable"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Clifford Gates:</span>
                    <Badge variant="outline" className="text-quantum-entangled border-quantum-entangled/30">
                      Transversal
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};