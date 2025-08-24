import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BB84Simulator } from "@/components/quantum/BB84Simulator";
import { QiskitLab } from "@/components/quantum/QiskitLab";
import { QuantumCircuitVisualizer } from "@/components/quantum/QuantumCircuitVisualizer";
import { QuantumStats } from "@/components/quantum/QuantumStats";
import { ProtocolInfo } from "@/components/quantum/ProtocolInfo";
import { AdvancedSimulator } from "@/components/quantum/AdvancedSimulator";
import { Atom, Shield, Zap, Activity } from "lucide-react";

const Index = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-quantum-alice/10 via-background to-quantum-bob/10" />
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-quantum-entangled text-quantum-entangled animate-quantum-pulse">
                <Atom className="w-4 h-4 mr-2" />
                Quantum Cryptography Research
              </Badge>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-quantum-entangled via-primary to-quantum-alice bg-clip-text text-transparent leading-tight">
                Quantum Key Distribution
                <br />
                <span className="text-4xl text-muted-foreground">BB84 Protocol Simulator</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Advanced quantum cryptography simulator demonstrating secure communication through quantum key distribution. 
                Visualize quantum states, detect eavesdropping, and analyze security metrics in real-time.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-quantum-alice/10 border border-quantum-alice/20">
                <Shield className="w-5 h-5 text-quantum-alice" />
                <span className="text-quantum-alice font-medium">Quantum Security</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-quantum-entangled/10 border border-quantum-entangled/20">
                <Zap className="w-5 h-5 text-quantum-entangled" />
                <span className="text-quantum-entangled font-medium">Real-time Simulation</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-quantum-bob/10 border border-quantum-bob/20">
                <Activity className="w-5 h-5 text-quantum-bob" />
                <span className="text-quantum-bob font-medium">Advanced Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Simulator Interface */}
      <section className="container mx-auto px-6 py-12">
        <Tabs defaultValue="simulator" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5 bg-card">
          <TabsTrigger value="simulator" className="data-[state=active]:bg-quantum-entangled/20">
            BB84 Simulator
          </TabsTrigger>
          <TabsTrigger value="qiskit" className="data-[state=active]:bg-quantum-alice/20">
            Qiskit Lab
          </TabsTrigger>
          <TabsTrigger value="circuit" className="data-[state=active]:bg-quantum-bob/20">
            Circuit Builder
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-quantum-alice/20">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="protocol" className="data-[state=active]:bg-quantum-bob/20">
            Protocol Info
          </TabsTrigger>
        </TabsList>

          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <BB84Simulator 
                  isSimulating={isSimulating}
                  onSimulationChange={setIsSimulating}
                />
              </div>
              <div className="space-y-6">
                <QuantumStats />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qiskit" className="space-y-6">
            <QiskitLab />
          </TabsContent>

          <TabsContent value="circuit" className="space-y-6">
            <QuantumCircuitVisualizer />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <AdvancedSimulator />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <Card className="p-6 border-quantum-entangled/20">
                <h3 className="text-lg font-semibold mb-4 text-quantum-entangled">Security Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">QBER Threshold:</span>
                    <span className="font-mono text-quantum-entangled">11%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current QBER:</span>
                    <span className="font-mono text-primary">4.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Level:</span>
                    <Badge variant="outline" className="border-primary text-primary">Secure</Badge>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-quantum-alice/20">
                <h3 className="text-lg font-semibold mb-4 text-quantum-alice">Key Generation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Raw Key Length:</span>
                    <span className="font-mono text-quantum-alice">1024 bits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sifted Key:</span>
                    <span className="font-mono text-primary">512 bits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Final Key:</span>
                    <span className="font-mono text-quantum-entangled">384 bits</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-quantum-bob/20">
                <h3 className="text-lg font-semibold mb-4 text-quantum-bob">Channel Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Channel Noise:</span>
                    <span className="font-mono text-quantum-bob">2.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transmission Rate:</span>
                    <span className="font-mono text-primary">98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Efficiency:</span>
                    <span className="font-mono text-quantum-entangled">75.3%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="protocol">
            <ProtocolInfo />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;