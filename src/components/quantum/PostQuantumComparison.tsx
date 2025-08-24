import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Zap, Clock } from "lucide-react";

interface PostQuantumComparisonProps {
  qkdMetrics: any;
  isRunning: boolean;
}

export const PostQuantumComparison = ({ qkdMetrics, isRunning }: PostQuantumComparisonProps) => {
  const algorithms = [
    { name: "RSA-2048", keySize: 2048, security: 112, quantumResistant: false, performance: 85 },
    { name: "ECC P-256", keySize: 256, security: 128, quantumResistant: false, performance: 95 },
    { name: "Kyber-768", keySize: 768, security: 128, quantumResistant: true, performance: 88 },
    { name: "Dilithium-3", keySize: 1952, security: 128, quantumResistant: true, performance: 75 },
    { name: "QKD BB84", keySize: 1024, security: 256, quantumResistant: true, performance: 65 }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 border-quantum-entangled/20">
        <h3 className="text-lg font-bold text-quantum-entangled mb-4">Post-Quantum vs Classical Cryptography</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {algorithms.map((algo) => (
            <Card key={algo.name} className={`p-4 ${algo.quantumResistant ? 'border-quantum-entangled/20' : 'border-quantum-eve/20'}`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">{algo.name}</h4>
                  <Badge variant="outline" className={algo.quantumResistant ? "text-quantum-entangled border-quantum-entangled/30" : "text-quantum-eve border-quantum-eve/30"}>
                    {algo.quantumResistant ? "Quantum Safe" : "Vulnerable"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Security Level:</span>
                    <span className="font-mono">{algo.security} bits</span>
                  </div>
                  <Progress value={(algo.security / 256) * 100} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Performance:</span>
                    <span className="font-mono">{algo.performance}%</span>
                  </div>
                  <Progress value={algo.performance} className="h-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};