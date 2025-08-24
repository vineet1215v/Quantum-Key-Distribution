import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Cpu, Shield, Zap, AlertTriangle, Users } from "lucide-react";

export const ProtocolInfo = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-quantum-entangled to-quantum-alice bg-clip-text text-transparent">
          Quantum Key Distribution Protocols
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Deep dive into the theoretical foundations and practical implementations of quantum cryptography protocols.
        </p>
      </div>

      <Tabs defaultValue="bb84" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bb84">BB84 Protocol</TabsTrigger>
          <TabsTrigger value="security">Security Analysis</TabsTrigger>
          <TabsTrigger value="variants">Protocol Variants</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="bb84" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-quantum-alice/20">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-quantum-alice" />
                <h3 className="text-lg font-semibold text-quantum-alice">Protocol Overview</h3>
              </div>
              <div className="space-y-4 text-sm">
                <p>
                  The BB84 protocol, proposed by Bennett and Brassard in 1984, is the first and most famous 
                  quantum key distribution protocol. It uses the fundamental principles of quantum mechanics 
                  to detect eavesdropping attempts.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-quantum-entangled">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Uses two conjugate bases (rectilinear and diagonal)</li>
                    <li>Exploits quantum measurement disturbance</li>
                    <li>Provides information-theoretic security</li>
                    <li>Detects eavesdropping through error analysis</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-quantum-bob/20">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-5 h-5 text-quantum-bob" />
                <h3 className="text-lg font-semibold text-quantum-bob">Protocol Steps</h3>
              </div>
              <div className="space-y-3">
                {[
                  { step: 1, title: "Quantum Transmission", desc: "Alice sends qubits in random states" },
                  { step: 2, title: "Random Measurement", desc: "Bob measures with random bases" },
                  { step: 3, title: "Basis Reconciliation", desc: "Public comparison of measurement bases" },
                  { step: 4, title: "Key Sifting", desc: "Keep bits where bases matched" },
                  { step: 5, title: "Error Estimation", desc: "Calculate quantum bit error rate" },
                  { step: 6, title: "Privacy Amplification", desc: "Extract final secure key" }
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-quantum-bob/20 text-quantum-bob text-xs flex items-center justify-center font-bold shrink-0">
                      {step}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{title}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6 border-quantum-entangled/20">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-quantum-entangled" />
              <h3 className="text-lg font-semibold text-quantum-entangled">Quantum States & Bases</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-quantum-alice">Rectilinear Basis (+)</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 bg-quantum-alice/20 rounded border flex items-center justify-center font-mono text-quantum-alice">|</div>
                    <div>
                      <p className="font-mono text-sm">|0⟩ state</p>
                      <p className="text-xs text-muted-foreground">Vertically polarized</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 bg-quantum-alice/20 rounded border flex items-center justify-center font-mono text-quantum-alice">—</div>
                    <div>
                      <p className="font-mono text-sm">|1⟩ state</p>
                      <p className="text-xs text-muted-foreground">Horizontally polarized</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-quantum-bob">Diagonal Basis (×)</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 bg-quantum-bob/20 rounded border flex items-center justify-center font-mono text-quantum-bob">/</div>
                    <div>
                      <p className="font-mono text-sm">|+⟩ state</p>
                      <p className="text-xs text-muted-foreground">45° polarized</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <div className="w-8 h-8 bg-quantum-bob/20 rounded border flex items-center justify-center font-mono text-quantum-bob">\</div>
                    <div>
                      <p className="font-mono text-sm">|-⟩ state</p>
                      <p className="text-xs text-muted-foreground">135° polarized</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-quantum-entangled/20">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-quantum-entangled" />
                <h3 className="text-lg font-semibold text-quantum-entangled">Security Guarantees</h3>
              </div>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Information-Theoretic Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Security is guaranteed by the laws of physics, not computational assumptions. 
                    Even with unlimited computational power, an adversary cannot break the protocol 
                    without detection.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-quantum-alice/10 border border-quantum-alice/20">
                  <h4 className="font-semibold text-quantum-alice mb-2">No-Cloning Theorem</h4>
                  <p className="text-sm text-muted-foreground">
                    Quantum states cannot be perfectly copied, preventing Eve from intercepting 
                    and forwarding quantum information without introducing detectable errors.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-quantum-bob/10 border border-quantum-bob/20">
                  <h4 className="font-semibold text-quantum-bob mb-2">Measurement Disturbance</h4>
                  <p className="text-sm text-muted-foregroup">
                    Any measurement by an eavesdropper inevitably disturbs the quantum state, 
                    introducing errors that can be detected through statistical analysis.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-quantum-eve/20">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-quantum-eve" />
                <h3 className="text-lg font-semibold text-quantum-eve">Attack Scenarios</h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: "Intercept-Resend Attack",
                    description: "Eve measures all qubits and sends new ones to Bob",
                    detection: "25% error rate in matching bases",
                    severity: "High"
                  },
                  {
                    name: "Beam Splitting Attack", 
                    description: "Eve splits the beam and measures a portion",
                    detection: "Increased error rate proportional to split ratio",
                    severity: "Medium"
                  },
                  {
                    name: "Photon Number Splitting",
                    description: "Exploits multi-photon pulses in weak coherent sources",
                    detection: "Statistics analysis and decoy states",
                    severity: "High"
                  }
                ].map((attack, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/30 border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{attack.name}</h4>
                      <Badge variant="outline" className={
                        attack.severity === "High" ? "border-quantum-eve text-quantum-eve" : 
                        "border-quantum-noise text-quantum-noise"
                      }>
                        {attack.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{attack.description}</p>
                    <p className="text-xs text-quantum-entangled">Detection: {attack.detection}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="variants" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "B92 Protocol",
                year: "1992",
                author: "Bennett",
                description: "Uses only two non-orthogonal quantum states instead of four",
                advantages: ["Simpler implementation", "Lower complexity"],
                color: "quantum-alice"
              },
              {
                name: "E91 Protocol", 
                year: "1991",
                author: "Ekert",
                description: "Based on quantum entanglement and Bell's theorem violations",
                advantages: ["Entanglement-based", "Bell inequality testing"],
                color: "quantum-entangled"
              },
              {
                name: "SARG04 Protocol",
                year: "2004", 
                author: "Scarani et al.",
                description: "More robust against photon-number-splitting attacks",
                advantages: ["PNS attack resistance", "Better with weak pulses"],
                color: "quantum-bob"
              },
              {
                name: "Six-State Protocol",
                year: "1998",
                author: "Bruss",
                description: "Uses three mutually unbiased bases for enhanced security",
                advantages: ["Higher error tolerance", "Better security bounds"],
                color: "quantum-eve"
              },
              {
                name: "COW Protocol",
                year: "2005",
                author: "Stucki et al.",
                description: "Coherent One-Way protocol using time-bin encoding",
                advantages: ["High key rates", "Simple detection"],
                color: "quantum-noise"
              },
              {
                name: "DPS-QKD",
                year: "2002",
                author: "Inoue et al.",
                description: "Differential phase shift quantum key distribution",
                advantages: ["Self-referenced", "Stable implementation"],
                color: "primary"
              }
            ].map((protocol, i) => (
              <Card key={i} className={`p-4 border-${protocol.color}/20`}>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold text-${protocol.color}`}>{protocol.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {protocol.year}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{protocol.author}</p>
                    <p className="text-sm">{protocol.description}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
                      Advantages
                    </h4>
                    <ul className="space-y-1">
                      {protocol.advantages.map((advantage, j) => (
                        <li key={j} className="text-xs flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${protocol.color}`} />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-quantum-entangled/20">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-quantum-entangled" />
                <h3 className="text-lg font-semibold text-quantum-entangled">Technical Implementation</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-quantum-alice">Hardware Components</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-quantum-alice" />
                      Laser source (weak coherent pulses)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-quantum-alice" />
                      Polarization modulators
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-quantum-alice" />
                      Beam splitters and polarizers
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-quantum-alice" />
                      Single photon detectors (APDs/SNSPDs)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-quantum-bob">Software Components</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-quantum-bob" />
                      Random number generation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-quantum-bob" />
                      Timing synchronization
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-quantum-bob" />
                      Error correction protocols
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-quantum-bob" />
                      Privacy amplification algorithms
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-quantum-alice/20">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-quantum-alice" />
                <h3 className="text-lg font-semibold text-quantum-alice">Practical Challenges</h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    challenge: "Detector Efficiency",
                    description: "Low efficiency reduces key generation rate",
                    solution: "Use high-efficiency SNSPDs, optimize detection setup"
                  },
                  {
                    challenge: "Channel Loss",
                    description: "Fiber attenuation limits transmission distance", 
                    solution: "Trusted repeaters, satellite links, quantum repeaters"
                  },
                  {
                    challenge: "Dark Counts",
                    description: "False detections increase error rate",
                    solution: "Cooling detectors, temporal filtering"
                  },
                  {
                    challenge: "Timing Jitter",
                    description: "Imprecise timing affects synchronization",
                    solution: "High-precision clocks, adaptive protocols"
                  }
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/30 border">
                    <h4 className="font-semibold text-sm mb-1 text-quantum-alice">{item.challenge}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                    <p className="text-xs text-quantum-entangled">Solution: {item.solution}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};