import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, Eye, AlertTriangle, TrendingUp, BarChart3 } from "lucide-react";

interface SecurityAnalysisProps {
  protocols: any[];
  currentMetrics: any;
  isRunning: boolean;
}

export const InformationTheoreticSecurity = ({ protocols, currentMetrics, isRunning }: SecurityAnalysisProps) => {
  const [securityMetrics, setSecurityMetrics] = useState({
    mutualInformation: 0,
    conditionalEntropy: 0,
    evesInformation: 0,
    privacyAmplification: 0,
    keySecrecy: 0,
    holevobound: 0
  });

  const [selectedAttack, setSelectedAttack] = useState("intercept-resend");

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setSecurityMetrics({
          mutualInformation: Math.random() * 0.5 + 3.5,
          conditionalEntropy: Math.random() * 0.3 + 3.2,
          evesInformation: Math.random() * 0.2,
          privacyAmplification: Math.random() * 0.15 + 0.85,
          keySecrecy: Math.random() * 0.05 + 0.95,
          holevobound: Math.random() * 0.1 + 0.4
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const attackScenarios = [
    {
      id: "intercept-resend",
      name: "Intercept-Resend Attack",
      description: "Eve intercepts, measures, and resends qubits",
      detectionRate: 25,
      informationGain: 50,
      complexity: "Low",
      qberImpact: 25
    },
    {
      id: "beam-splitting",
      name: "Beam Splitting Attack",
      description: "Eve splits beam and measures portion", 
      detectionRate: 15,
      informationGain: 30,
      complexity: "Medium",
      qberImpact: 15
    },
    {
      id: "pns-attack",
      name: "Photon Number Splitting",
      description: "Exploits multi-photon pulses",
      detectionRate: 5,
      informationGain: 80,
      complexity: "High",
      qberImpact: 3
    },
    {
      id: "detector-blinding",
      name: "Detector Blinding",
      description: "Blinds Bob's detectors with bright light",
      detectionRate: 2,
      informationGain: 95,
      complexity: "High",
      qberImpact: 1
    },
    {
      id: "trojan-horse",
      name: "Trojan Horse Attack",
      description: "Sends additional photons back to Alice",
      detectionRate: 8,
      informationGain: 40,
      complexity: "Medium",
      qberImpact: 8
    }
  ];

  const currentAttack = attackScenarios.find(a => a.id === selectedAttack);

  return (
    <div className="space-y-6">
      {/* Security Overview Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4 border-quantum-entangled/20">
          <div className="text-center">
            <Shield className="w-6 h-6 mx-auto mb-2 text-quantum-entangled" />
            <p className="text-xs text-muted-foreground">Mutual Info</p>
            <p className="text-lg font-bold text-quantum-entangled">
              {securityMetrics.mutualInformation.toFixed(3)}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-alice/20">
          <div className="text-center">
            <Lock className="w-6 h-6 mx-auto mb-2 text-quantum-alice" />
            <p className="text-xs text-muted-foreground">Cond. Entropy</p>
            <p className="text-lg font-bold text-quantum-alice">
              {securityMetrics.conditionalEntropy.toFixed(3)}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-eve/20">
          <div className="text-center">
            <Eye className="w-6 h-6 mx-auto mb-2 text-quantum-eve" />
            <p className="text-xs text-muted-foreground">Eve's Info</p>
            <p className="text-lg font-bold text-quantum-eve">
              {securityMetrics.evesInformation.toFixed(3)}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-bob/20">
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-quantum-bob" />
            <p className="text-xs text-muted-foreground">Privacy Amp</p>
            <p className="text-lg font-bold text-quantum-bob">
              {(securityMetrics.privacyAmplification * 100).toFixed(1)}%
            </p>
          </div>
        </Card>
        
        <Card className="p-4 border-primary/20">
          <div className="text-center">
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Key Secrecy</p>
            <p className="text-lg font-bold text-primary">
              {(securityMetrics.keySecrecy * 100).toFixed(2)}%
            </p>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-noise/20">
          <div className="text-center">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-quantum-noise" />
            <p className="text-xs text-muted-foreground">Holevo χ</p>
            <p className="text-lg font-bold text-quantum-noise">
              {securityMetrics.holevobound.toFixed(3)}
            </p>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="theoretical" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="theoretical">Information Theory</TabsTrigger>
          <TabsTrigger value="attacks">Attack Analysis</TabsTrigger>
          <TabsTrigger value="protocols">Protocol Security</TabsTrigger>
          <TabsTrigger value="proofs">Security Proofs</TabsTrigger>
        </TabsList>

        <TabsContent value="theoretical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-quantum-entangled/20">
              <h3 className="text-lg font-bold text-quantum-entangled mb-4">Fundamental Security Measures</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2 text-quantum-alice">Shannon Entropy H(X)</h4>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Alice's Key Entropy:</span>
                    <span className="font-mono text-quantum-alice">
                      {securityMetrics.mutualInformation.toFixed(3)} bits
                    </span>
                  </div>
                  <Progress value={(securityMetrics.mutualInformation / 4) * 100} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    H(X) = -∑ p(x) log₂ p(x)
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2 text-quantum-bob">Conditional Entropy H(X|E)</h4>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Key given Eve's Info:</span>
                    <span className="font-mono text-quantum-bob">
                      {securityMetrics.conditionalEntropy.toFixed(3)} bits
                    </span>
                  </div>
                  <Progress value={(securityMetrics.conditionalEntropy / 4) * 100} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    H(X|E) = H(X) - I(X:E)
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2 text-quantum-eve">Mutual Information I(X:E)</h4>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Eve's Information:</span>
                    <span className="font-mono text-quantum-eve">
                      {securityMetrics.evesInformation.toFixed(3)} bits
                    </span>
                  </div>
                  <Progress value={(securityMetrics.evesInformation / 1) * 100} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    I(X:E) = H(X) - H(X|E)
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-quantum-alice/20">
              <h3 className="text-lg font-bold text-quantum-alice mb-4">Quantum Security Bounds</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-quantum-entangled/10 border border-quantum-entangled/20">
                  <h4 className="font-semibold mb-2 text-quantum-entangled">Holevo Bound</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>χ(quantum state):</span>
                      <span className="font-mono text-quantum-entangled">
                        {securityMetrics.holevobound.toFixed(3)}
                      </span>
                    </div>
                    <Progress value={securityMetrics.holevobound * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Maximum information extractable from quantum ensemble
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-quantum-bob/10 border border-quantum-bob/20">
                  <h4 className="font-semibold mb-2 text-quantum-bob">No-Cloning Security</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cloning Fidelity:</span>
                      <span className="font-mono text-quantum-bob">≤ 5/6 ≈ 0.833</span>
                    </div>
                    <Progress value={83.3} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Fundamental limit on quantum state copying
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-quantum-alice/10 border border-quantum-alice/20">
                  <h4 className="font-semibold mb-2 text-quantum-alice">Uncertainty Principle</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ΔX · ΔZ ≥:</span>
                      <span className="font-mono text-quantum-alice">1/2</span>
                    </div>
                    <Progress value={50} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Conjugate observables cannot be precisely known
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-semibold mb-2 text-primary">Leftover Hash Lemma</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Security Parameter ε:</span>
                      <span className="font-mono text-primary">2⁻ˢ</span>
                    </div>
                    <Progress value={95} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Privacy amplification security guarantee
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attacks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 border-quantum-eve/20">
              <h3 className="text-lg font-bold text-quantum-eve mb-4">Attack Scenario Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {attackScenarios.map((attack) => (
                  <div
                    key={attack.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAttack === attack.id
                        ? "border-quantum-eve bg-quantum-eve/10"
                        : "border-border hover:border-quantum-eve/50"
                    }`}
                    onClick={() => setSelectedAttack(attack.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-quantum-eve">{attack.name}</h4>
                      <Badge variant="outline" className={`text-xs ${
                        attack.complexity === "High" ? "border-quantum-eve text-quantum-eve" :
                        attack.complexity === "Medium" ? "border-quantum-alice text-quantum-alice" :
                        "border-quantum-bob text-quantum-bob"
                      }`}>
                        {attack.complexity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{attack.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Detection:</span>
                        <span className="text-quantum-entangled">{attack.detectionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Info Gain:</span>
                        <span className="text-quantum-eve">{attack.informationGain}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-quantum-entangled/20">
              <h3 className="text-lg font-bold text-quantum-entangled mb-4">
                {currentAttack?.name} Details
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <h4 className="font-semibold text-sm mb-2 text-quantum-eve">Attack Impact</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>QBER Increase:</span>
                      <span className="font-mono text-quantum-eve">
                        +{currentAttack?.qberImpact}%
                      </span>
                    </div>
                    <Progress value={currentAttack?.qberImpact || 0} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Information Gain:</span>
                      <span className="font-mono text-quantum-eve">
                        {currentAttack?.informationGain}%
                      </span>
                    </div>
                    <Progress value={currentAttack?.informationGain || 0} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Detection Rate:</span>
                      <span className="font-mono text-quantum-entangled">
                        {currentAttack?.detectionRate}%
                      </span>
                    </div>
                    <Progress value={currentAttack?.detectionRate || 0} className="h-2" />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-quantum-entangled/10 border border-quantum-entangled/20">
                  <h4 className="font-semibold text-sm mb-2 text-quantum-entangled">Countermeasures</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    {selectedAttack === "intercept-resend" && (
                      <>
                        <li>• Statistical testing of QBER</li>
                        <li>• Random basis selection</li>
                        <li>• Decoy state protocols</li>
                      </>
                    )}
                    {selectedAttack === "pns-attack" && (
                      <>
                        <li>• Weak coherent pulses</li>
                        <li>• Decoy state method</li>
                        <li>• Statistical analysis</li>
                      </>
                    )}
                    {selectedAttack === "detector-blinding" && (
                      <>
                        <li>• Monitor detector response</li>
                        <li>• Power level monitoring</li>
                        <li>• Self-testing protocols</li>
                      </>
                    )}
                    {!["intercept-resend", "pns-attack", "detector-blinding"].includes(selectedAttack) && (
                      <>
                        <li>• Protocol-specific defenses</li>
                        <li>• Continuous monitoring</li>
                        <li>• Statistical analysis</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-quantum-alice/10 border border-quantum-alice/20">
                  <h4 className="font-semibold text-sm mb-2 text-quantum-alice">Security Status</h4>
                  <div className="text-center">
                    <Badge variant="outline" className={
                      (currentAttack?.detectionRate || 0) > 20
                        ? "border-quantum-entangled text-quantum-entangled"
                        : (currentAttack?.detectionRate || 0) > 10
                        ? "border-quantum-alice text-quantum-alice"
                        : "border-quantum-eve text-quantum-eve"
                    }>
                      {(currentAttack?.detectionRate || 0) > 20 ? "Easily Detected" :
                       (currentAttack?.detectionRate || 0) > 10 ? "Moderately Detectable" :
                       "Difficult to Detect"}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protocols.map((protocol) => (
              <Card key={protocol.id} className="p-4 border-quantum-entangled/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-quantum-entangled">{protocol.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      Security: {protocol.security}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Theoretical Security:</span>
                        <span className="text-quantum-entangled">{protocol.security}%</span>
                      </div>
                      <Progress value={protocol.security} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Implementation Security:</span>
                        <span className="text-quantum-alice">{protocol.security - 5}%</span>
                      </div>
                      <Progress value={protocol.security - 5} className="h-2" />
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <h5 className="font-semibold text-xs mb-2 text-quantum-bob">Security Features:</h5>
                      <ul className="text-xs space-y-1">
                        {protocol.id === "bb84" && (
                          <>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-quantum-entangled"></div>
                              Information-theoretic security
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-quantum-entangled"></div>
                              Eavesdropping detection
                            </li>
                          </>
                        )}
                        {protocol.id === "e91" && (
                          <>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-quantum-entangled"></div>
                              Bell inequality violation
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-quantum-entangled"></div>
                              Entanglement-based security
                            </li>
                          </>
                        )}
                        {!["bb84", "e91"].includes(protocol.id) && (
                          <>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-quantum-entangled"></div>
                              Quantum mechanical security
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-quantum-entangled"></div>
                              Protocol-specific defenses
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="proofs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-quantum-entangled/20">
              <h3 className="text-lg font-bold text-quantum-entangled mb-4">Security Proof Framework</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2 text-quantum-alice">Composable Security</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Universal composability framework ensures security when protocols are composed.
                  </p>
                  <div className="text-xs font-mono bg-background p-2 rounded">
                    ε-secure ⟹ ε₁ + ε₂ + ... + εₙ ≤ ε_total
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2 text-quantum-bob">Finite-Key Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Security bounds for finite-length keys using concentration inequalities.
                  </p>
                  <div className="text-xs font-mono bg-background p-2 rounded">
                    r ≥ n[1 - h(δ)] - λEC - λPA
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2 text-quantum-eve">Device-Independent Security</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Security based only on observed statistics, not device models.
                  </p>
                  <div className="text-xs font-mono bg-background p-2 rounded">
                    S ≤ 2√2 ⟹ local hidden variables
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-quantum-alice/20">
              <h3 className="text-lg font-bold text-quantum-alice mb-4">Mathematical Foundations</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-quantum-entangled/10 border border-quantum-entangled/20">
                  <h4 className="font-semibold mb-2 text-quantum-entangled">Quantum Entropy</h4>
                  <div className="space-y-2 text-sm">
                    <div className="font-mono text-xs bg-background p-2 rounded">
                      S(ρ) = -Tr(ρ log₂ ρ)
                    </div>
                    <p className="text-muted-foreground">
                      Von Neumann entropy quantifies quantum information content.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-quantum-bob/10 border border-quantum-bob/20">
                  <h4 className="font-semibold mb-2 text-quantum-bob">Trace Distance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="font-mono text-xs bg-background p-2 rounded">
                      ||ρ - σ||₁ = ½ Tr|ρ - σ|
                    </div>
                    <p className="text-muted-foreground">
                      Measures distinguishability between quantum states.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-quantum-alice/10 border border-quantum-alice/20">
                  <h4 className="font-semibold mb-2 text-quantum-alice">Smooth Entropy</h4>
                  <div className="space-y-2 text-sm">
                    <div className="font-mono text-xs bg-background p-2 rounded">
                      H^ε_min(A|E) = max log₂ λ
                    </div>
                    <p className="text-muted-foreground">
                      Operational meaning for finite-key security analysis.
                    </p>
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