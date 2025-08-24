import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Activity, AlertTriangle } from "lucide-react";

export const QuantumStats = () => {
  const stats = {
    qber: 4.2,
    keyRate: 87.3,
    security: 98.6,
    efficiency: 75.8,
    photonCount: 1247,
    errorCount: 52
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 border-quantum-entangled/20">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-quantum-entangled" />
          <h3 className="font-semibold text-quantum-entangled">Security Metrics</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">QBER (Quantum Bit Error Rate)</span>
              <span className="text-sm font-mono">{stats.qber}%</span>
            </div>
            <Progress value={stats.qber * 2} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Threshold: 11% | Status: 
              <Badge variant="outline" className="ml-1 border-primary text-primary">Secure</Badge>
            </p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Security Level</span>
              <span className="text-sm font-mono">{stats.security}%</span>
            </div>
            <Progress value={stats.security} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-quantum-alice/20">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-quantum-alice" />
          <h3 className="font-semibold text-quantum-alice">Performance</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Key Generation Rate</span>
              <span className="text-sm font-mono">{stats.keyRate}%</span>
            </div>
            <Progress value={stats.keyRate} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Protocol Efficiency</span>
              <span className="text-sm font-mono">{stats.efficiency}%</span>
            </div>
            <Progress value={stats.efficiency} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-quantum-bob/20">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-quantum-bob" />
          <h3 className="font-semibold text-quantum-bob">Real-time Data</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-2xl font-bold font-mono text-quantum-bob">
              {stats.photonCount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Photons Transmitted</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-2xl font-bold font-mono text-quantum-eve">
              {stats.errorCount}
            </div>
            <p className="text-xs text-muted-foreground">Detection Errors</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 border-quantum-eve/20">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-quantum-eve" />
          <h3 className="font-semibold text-quantum-eve">Threat Detection</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Eavesdropping Detection</span>
            <Badge variant="outline" className="border-primary text-primary">
              No Threats
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Channel Integrity</span>
            <Badge variant="outline" className="border-quantum-entangled text-quantum-entangled">
              Secure
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Anomaly Score</span>
            <span className="text-sm font-mono text-primary">0.03</span>
          </div>
        </div>
      </Card>
    </div>
  );
};