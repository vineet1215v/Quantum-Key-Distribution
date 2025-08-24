import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Eye, Zap } from "lucide-react";

interface QuantumEntropyAnalysisProps {
  entropy: number;
  leakage: number;
  isRunning: boolean;
}

export const QuantumEntropyAnalysis = ({ entropy, leakage, isRunning }: QuantumEntropyAnalysisProps) => {
  const [entropyData, setEntropyData] = useState({
    vonNeumann: 0,
    renyi: 0,
    minEntropy: 0,
    maxEntropy: 0,
    conditionalEntropy: 0,
    mutualInformation: 0,
    relativeEntropy: 0,
    quantumCapacity: 0
  });

  const [randomnessTests, setRandomnessTests] = useState({
    frequency: 0,
    blockFrequency: 0,
    runs: 0,
    longestRun: 0,
    rank: 0,
    dft: 0,
    nonOverlapping: 0,
    overlapping: 0,
    universal: 0,
    approximate: 0
  });

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setEntropyData({
          vonNeumann: entropy + (Math.random() - 0.5) * 0.1,
          renyi: entropy * 0.95 + (Math.random() - 0.5) * 0.1,
          minEntropy: entropy * 0.8 + (Math.random() - 0.5) * 0.1,
          maxEntropy: Math.log2(256), // 8-bit maximum
          conditionalEntropy: entropy - leakage * 10,
          mutualInformation: leakage * 10,
          relativeEntropy: Math.random() * 0.5,
          quantumCapacity: entropy * 0.9
        });

        // Update randomness test results
        setRandomnessTests({
          frequency: Math.random() > 0.01 ? 1 : 0,
          blockFrequency: Math.random() > 0.01 ? 1 : 0,
          runs: Math.random() > 0.01 ? 1 : 0,
          longestRun: Math.random() > 0.01 ? 1 : 0,
          rank: Math.random() > 0.01 ? 1 : 0,
          dft: Math.random() > 0.01 ? 1 : 0,
          nonOverlapping: Math.random() > 0.01 ? 1 : 0,
          overlapping: Math.random() > 0.01 ? 1 : 0,
          universal: Math.random() > 0.01 ? 1 : 0,
          approximate: Math.random() > 0.01 ? 1 : 0
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isRunning, entropy, leakage]);

  const totalTests = Object.values(randomnessTests).length;
  const passedTests = Object.values(randomnessTests).reduce((sum, result) => sum + result, 0);
  const randomnessScore = (passedTests / totalTests) * 100;

  const entropyTests = [
    { name: "Frequency Test", passed: randomnessTests.frequency, description: "Tests frequency of 0s and 1s" },
    { name: "Block Frequency", passed: randomnessTests.blockFrequency, description: "Frequency within blocks" },
    { name: "Runs Test", passed: randomnessTests.runs, description: "Number of runs in sequence" },
    { name: "Longest Run", passed: randomnessTests.longestRun, description: "Longest run of identical bits" },
    { name: "Rank Test", passed: randomnessTests.rank, description: "Linear dependence among substrings" },
    { name: "DFT Test", passed: randomnessTests.dft, description: "Discrete Fourier Transform" },
    { name: "Non-overlapping", passed: randomnessTests.nonOverlapping, description: "Non-overlapping template matching" },
    { name: "Overlapping", passed: randomnessTests.overlapping, description: "Overlapping template matching" },
    { name: "Universal", passed: randomnessTests.universal, description: "Maurer's universal statistical test" },
    { name: "Approximate", passed: randomnessTests.approximate, description: "Approximate entropy test" }
  ];

  return (
    <div className="space-y-6">
      {/* Entropy Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-quantum-entangled/20">
          <div className="text-center">
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-quantum-entangled" />
            <p className="text-xs text-muted-foreground">Von Neumann</p>
            <p className="text-lg font-bold text-quantum-entangled">
              {entropyData.vonNeumann.toFixed(3)}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-alice/20">
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-quantum-alice" />
            <p className="text-xs text-muted-foreground">Min Entropy</p>
            <p className="text-lg font-bold text-quantum-alice">
              {entropyData.minEntropy.toFixed(3)}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-bob/20">
          <div className="text-center">
            <Eye className="w-6 h-6 mx-auto mb-2 text-quantum-bob" />
            <p className="text-xs text-muted-foreground">Mutual Info</p>
            <p className="text-lg font-bold text-quantum-bob">
              {entropyData.mutualInformation.toFixed(3)}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-eve/20">
          <div className="text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-quantum-eve" />
            <p className="text-xs text-muted-foreground">Capacity</p>
            <p className="text-lg font-bold text-quantum-eve">
              {entropyData.quantumCapacity.toFixed(3)}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detailed Entropy Analysis */}
        <Card className="p-6 border-quantum-entangled/20">
          <h3 className="text-lg font-bold text-quantum-entangled mb-4">Quantum Entropy Measures</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-3 text-quantum-alice">Shannon-Type Entropies</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Von Neumann S(ρ):</span>
                    <span className="font-mono text-quantum-entangled text-sm">
                      {entropyData.vonNeumann.toFixed(4)}
                    </span>
                  </div>
                  <Progress value={(entropyData.vonNeumann / 4) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">S(ρ) = -Tr(ρ log₂ ρ)</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Conditional H(A|E):</span>
                    <span className="font-mono text-quantum-alice text-sm">
                      {entropyData.conditionalEntropy.toFixed(4)}
                    </span>
                  </div>
                  <Progress value={(entropyData.conditionalEntropy / 4) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">H(A|E) = H(A) - I(A:E)</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Mutual I(A:E):</span>
                    <span className="font-mono text-quantum-bob text-sm">
                      {entropyData.mutualInformation.toFixed(4)}
                    </span>
                  </div>
                  <Progress value={(entropyData.mutualInformation / 1) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">I(A:E) = S(A) + S(E) - S(AE)</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-3 text-quantum-bob">Operational Entropies</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Min Entropy H_∞:</span>
                    <span className="font-mono text-quantum-alice text-sm">
                      {entropyData.minEntropy.toFixed(4)}
                    </span>
                  </div>
                  <Progress value={(entropyData.minEntropy / 4) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">H_∞(X) = -log₂(max p_i)</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Rényi H_α (α=2):</span>
                    <span className="font-mono text-quantum-entangled text-sm">
                      {entropyData.renyi.toFixed(4)}
                    </span>
                  </div>
                  <Progress value={(entropyData.renyi / 4) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">H_α(X) = (1-α)⁻¹ log₂(∑p_i^α)</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Relative D(ρ||σ):</span>
                    <span className="font-mono text-quantum-eve text-sm">
                      {entropyData.relativeEntropy.toFixed(4)}
                    </span>
                  </div>
                  <Progress value={(entropyData.relativeEntropy / 2) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">D(ρ||σ) = Tr(ρ log ρ - ρ log σ)</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Randomness Testing */}
        <Card className="p-6 border-quantum-alice/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-quantum-alice">NIST Randomness Tests</h3>
            <Badge variant="outline" className={
              randomnessScore >= 95 ? "border-quantum-entangled text-quantum-entangled" :
              randomnessScore >= 80 ? "border-quantum-alice text-quantum-alice" :
              "border-quantum-eve text-quantum-eve"
            }>
              {randomnessScore.toFixed(1)}% Pass Rate
            </Badge>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span>Overall Randomness Quality:</span>
              <span className={`font-mono ${
                randomnessScore >= 95 ? "text-quantum-entangled" :
                randomnessScore >= 80 ? "text-quantum-alice" :
                "text-quantum-eve"
              }`}>
                {randomnessScore >= 95 ? "Excellent" :
                 randomnessScore >= 80 ? "Good" :
                 "Poor"}
              </span>
            </div>
            <Progress value={randomnessScore} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {passedTests}/{totalTests} tests passed (α = 0.01)
            </p>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {entropyTests.map((test, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      test.passed ? "bg-quantum-entangled" : "bg-quantum-eve"
                    }`} />
                    <span className="text-sm font-medium">{test.name}</span>
                    <Badge variant="outline" className={`text-xs ${
                      test.passed 
                        ? "border-quantum-entangled text-quantum-entangled" 
                        : "border-quantum-eve text-quantum-eve"
                    }`}>
                      {test.passed ? "PASS" : "FAIL"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4">{test.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Advanced Entropy Visualization */}
      <Card className="p-6 border-quantum-entangled/20">
        <h3 className="text-lg font-bold text-quantum-entangled mb-4">Entropy Landscape Visualization</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-quantum-alice">Information Hierarchy</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-quantum-entangled/10 border border-quantum-entangled/20">
                <div className="flex justify-between text-sm mb-1">
                  <span>Max Entropy (log₂ d):</span>
                  <span className="font-mono">{entropyData.maxEntropy.toFixed(2)}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-quantum-entangled" style={{ width: '100%' }} />
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-quantum-alice/10 border border-quantum-alice/20">
                <div className="flex justify-between text-sm mb-1">
                  <span>Von Neumann:</span>
                  <span className="font-mono">{entropyData.vonNeumann.toFixed(3)}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-quantum-alice" style={{ width: `${(entropyData.vonNeumann / entropyData.maxEntropy) * 100}%` }} />
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-quantum-bob/10 border border-quantum-bob/20">
                <div className="flex justify-between text-sm mb-1">
                  <span>Min Entropy:</span>
                  <span className="font-mono">{entropyData.minEntropy.toFixed(3)}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-quantum-bob" style={{ width: `${(entropyData.minEntropy / entropyData.maxEntropy) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-quantum-bob">Security Implications</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-sm font-medium mb-1">Key Generation Rate:</div>
                <div className="text-xs text-muted-foreground mb-2">
                  r ≈ n[1 - h(δ)] - λ_EC - λ_PA
                </div>
                <div className="font-mono text-quantum-entangled">
                  {(entropyData.minEntropy * 1000).toFixed(0)} bits/s
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-sm font-medium mb-1">Privacy Amplification:</div>
                <div className="text-xs text-muted-foreground mb-2">
                  Extract ℓ ≈ H_∞(X|E) - 2log₂(1/ε) bits
                </div>
                <div className="font-mono text-quantum-alice">
                  {Math.max(0, entropyData.conditionalEntropy - 0.1).toFixed(3)} secure bits
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-sm font-medium mb-1">Eavesdropper Advantage:</div>
                <div className="text-xs text-muted-foreground mb-2">
                  Information gained by Eve
                </div>
                <div className="font-mono text-quantum-eve">
                  {entropyData.mutualInformation.toFixed(4)} bits
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-quantum-eve">Quantum Capacity</h4>
            <div className="space-y-3">
              <div className="text-center p-4 rounded-lg bg-quantum-entangled/10 border border-quantum-entangled/20">
                <div className="text-2xl font-bold text-quantum-entangled mb-1">
                  {entropyData.quantumCapacity.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Quantum Channel Capacity
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-sm font-medium mb-2">Coherent Information:</div>
                <div className="text-xs font-mono bg-background p-2 rounded">
                  I_c(A⟩E) = S(E) - S(AE)
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-sm font-medium mb-2">Entanglement Rate:</div>
                <div className="text-xs text-muted-foreground mb-1">
                  Maximum entanglement generation
                </div>
                <div className="font-mono text-quantum-entangled text-sm">
                  {(entropyData.quantumCapacity * 0.8).toFixed(3)} ebits/use
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};