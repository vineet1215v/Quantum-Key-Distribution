import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { QuantumNetworkTopology } from "./QuantumNetworkTopology";
import { QuantumErrorCorrection } from "./QuantumErrorCorrection";
import { InformationTheoreticSecurity } from "./InformationTheoreticSecurity";
import { QuantumEntropyAnalysis } from "./QuantumEntropyAnalysis";
import { PostQuantumComparison } from "./PostQuantumComparison";
import { MLThreatDetection } from "./MLThreatDetection";
import { Play, Pause, Settings, Download, Upload, Zap, Brain, Network, Shield } from "lucide-react";

export const AdvancedSimulator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [channelNoise, setChannelNoise] = useState([0.02]);
  const [keyLength, setKeyLength] = useState([1024]);
  const [photonRate, setPhotonRate] = useState([1000000]);
  const [networkNodes, setNetworkNodes] = useState([4]);
  const [simulationMode, setSimulationMode] = useState("multi-protocol");
  
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    totalPhotons: 0,
    successfulTransmissions: 0,
    detectedAttacks: 0,
    keyGenerationRate: 0,
    quantumEntropy: 0,
    informationLeakage: 0,
    networkLatency: 0,
    errorCorrectionEfficiency: 0
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setRealTimeMetrics(prev => ({
          totalPhotons: prev.totalPhotons + Math.floor(Math.random() * 1000 + 500),
          successfulTransmissions: prev.successfulTransmissions + Math.floor(Math.random() * 950 + 450),
          detectedAttacks: prev.detectedAttacks + (Math.random() < 0.1 ? 1 : 0),
          keyGenerationRate: Math.random() * 100 + 850,
          quantumEntropy: Math.random() * 0.2 + 3.8,
          informationLeakage: Math.random() * 0.01,
          networkLatency: Math.random() * 5 + 10,
          errorCorrectionEfficiency: Math.random() * 5 + 94
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const protocols = [
    { id: "bb84", name: "BB84", description: "Bennett-Brassard 1984", efficiency: 50, security: 95 },
    { id: "b92", name: "B92", description: "Bennett 1992", efficiency: 25, security: 90 },
    { id: "e91", name: "E91", description: "Ekert 1991", efficiency: 45, security: 98 },
    { id: "sarg04", name: "SARG04", description: "Scarani-Acin-Ribordy-Gisin", efficiency: 42, security: 96 },
    { id: "cog", name: "COG", description: "Coherent One-Way", efficiency: 65, security: 92 },
    { id: "dps", name: "DPS-QKD", description: "Differential Phase Shift", efficiency: 70, security: 94 }
  ];

  const exportSimulationData = () => {
    const data = {
      timestamp: new Date().toISOString(),
      parameters: { channelNoise: channelNoise[0], keyLength: keyLength[0], photonRate: photonRate[0] },
      metrics: realTimeMetrics,
      protocols: protocols
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantum-simulation-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Advanced Control Panel */}
      <Card className="p-6 border-quantum-entangled/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-quantum-entangled">Advanced Quantum Cryptography Lab</h2>
            <p className="text-muted-foreground">Multi-protocol quantum key distribution with ML-enhanced security</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className={isRunning ? "bg-quantum-eve hover:bg-quantum-eve/80" : "bg-quantum-entangled hover:bg-quantum-entangled/80"}
            >
              {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? "Pause" : "Start"} Lab
            </Button>
            <Button variant="outline" onClick={exportSimulationData}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Real-time Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-quantum-alice">Channel Noise Level</label>
            <Slider
              value={channelNoise}
              onValueChange={setChannelNoise}
              max={0.15}
              min={0.001}
              step={0.001}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">{(channelNoise[0] * 100).toFixed(1)}%</p>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-quantum-bob">Key Length (bits)</label>
            <Slider
              value={keyLength}
              onValueChange={setKeyLength}
              max={4096}
              min={256}
              step={256}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">{keyLength[0]} bits</p>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-quantum-entangled">Photon Rate (Hz)</label>
            <Slider
              value={photonRate}
              onValueChange={setPhotonRate}
              max={10000000}
              min={100000}
              step={100000}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">{(photonRate[0] / 1000000).toFixed(1)}M Hz</p>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-quantum-noise">Network Nodes</label>
            <Slider
              value={networkNodes}
              onValueChange={setNetworkNodes}
              max={12}
              min={2}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">{networkNodes[0]} nodes</p>
          </div>
        </div>
      </Card>

      {/* Real-time Performance Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-quantum-entangled/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-quantum-entangled/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-quantum-entangled" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Photon Rate</p>
              <p className="text-xl font-bold text-quantum-entangled">
                {realTimeMetrics.totalPhotons.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-alice/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-quantum-alice/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-quantum-alice" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Key Rate (kbps)</p>
              <p className="text-xl font-bold text-quantum-alice">
                {realTimeMetrics.keyGenerationRate.toFixed(1)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-bob/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-quantum-bob/20 flex items-center justify-center">
              <Brain className="w-4 h-4 text-quantum-bob" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quantum Entropy</p>
              <p className="text-xl font-bold text-quantum-bob">
                {realTimeMetrics.quantumEntropy.toFixed(3)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-quantum-eve/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-quantum-eve/20 flex items-center justify-center">
              <Network className="w-4 h-4 text-quantum-eve" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Attacks Detected</p>
              <p className="text-xl font-bold text-quantum-eve">
                {realTimeMetrics.detectedAttacks}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Advanced Features Tabs */}
      <Tabs defaultValue="network" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="network">Quantum Network</TabsTrigger>
          <TabsTrigger value="error-correction">Error Correction</TabsTrigger>
          <TabsTrigger value="security">Security Analysis</TabsTrigger>
          <TabsTrigger value="entropy">Entropy Analysis</TabsTrigger>
          <TabsTrigger value="post-quantum">Post-Quantum</TabsTrigger>
          <TabsTrigger value="ml-detection">ML Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="network">
          <QuantumNetworkTopology 
            nodes={networkNodes[0]} 
            isRunning={isRunning}
            metrics={realTimeMetrics}
          />
        </TabsContent>

        <TabsContent value="error-correction">
          <QuantumErrorCorrection 
            noiseLevel={channelNoise[0]}
            isRunning={isRunning}
            efficiency={realTimeMetrics.errorCorrectionEfficiency}
          />
        </TabsContent>

        <TabsContent value="security">
          <InformationTheoreticSecurity 
            protocols={protocols}
            currentMetrics={realTimeMetrics}
            isRunning={isRunning}
          />
        </TabsContent>

        <TabsContent value="entropy">
          <QuantumEntropyAnalysis 
            entropy={realTimeMetrics.quantumEntropy}
            leakage={realTimeMetrics.informationLeakage}
            isRunning={isRunning}
          />
        </TabsContent>

        <TabsContent value="post-quantum">
          <PostQuantumComparison 
            qkdMetrics={realTimeMetrics}
            isRunning={isRunning}
          />
        </TabsContent>

        <TabsContent value="ml-detection">
          <MLThreatDetection 
            attacks={realTimeMetrics.detectedAttacks}
            isRunning={isRunning}
            networkLatency={realTimeMetrics.networkLatency}
          />
        </TabsContent>
      </Tabs>

      {/* Protocol Comparison Matrix */}
      <Card className="p-6 border-quantum-entangled/20">
        <h3 className="text-xl font-bold text-quantum-entangled mb-4">Multi-Protocol Performance Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {protocols.map((protocol) => (
            <Card key={protocol.id} className="p-4 border-quantum-alice/20">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-quantum-alice">{protocol.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {isRunning ? "Active" : "Standby"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{protocol.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Efficiency:</span>
                    <span className="text-quantum-bob">{protocol.efficiency}%</span>
                  </div>
                  <Progress value={protocol.efficiency} className="h-1" />
                  <div className="flex justify-between text-sm">
                    <span>Security:</span>
                    <span className="text-quantum-entangled">{protocol.security}%</span>
                  </div>
                  <Progress value={protocol.security} className="h-1" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};