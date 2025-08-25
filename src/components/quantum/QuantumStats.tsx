import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Activity, AlertTriangle, RefreshCw, AlertCircle, Loader2 } from "lucide-react";
import { getQuantumStats, QuantumStats as QuantumStatsType } from "@/lib/quantum-api";
import { useToast } from "@/hooks/use-toast";

export const QuantumStats = () => {
  const [stats, setStats] = useState<QuantumStatsType>({
    qber_threshold: 11,
    current_qber: 4.2,
    security_level: "secure",
    raw_key_length: 1024,
    sifted_key: 512,
    final_key: 384,
    channel_noise: 0.021,
    transmission_rate: 0.987,
    efficiency: 0.753
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getQuantumStats();
      
      if (response.success) {
        setStats(response.stats);
        toast({
          title: "Stats Updated",
          description: "Quantum statistics refreshed successfully",
        });
      } else {
        throw new Error(response.error || "Failed to fetch statistics");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch quantum statistics";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <Card className="p-6 border-destructive/20">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Failed to Load Statistics</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
        <Button
          onClick={fetchStats}
          variant="outline"
          className="mt-4 border-destructive text-destructive hover:bg-destructive/10"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </Card>
    );
  }

  const calculateEfficiencyPercentage = (efficiency: number) => Math.round(efficiency * 100);
  const calculateTransmissionPercentage = (rate: number) => Math.round(rate * 100);

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-quantum-entangled">Quantum Statistics</h2>
        <Button
          onClick={fetchStats}
          variant="outline"
          size="sm"
          disabled={isLoading}
          className="border-quantum-entangled text-quantum-entangled hover:bg-quantum-entangled/10"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <Card className="p-4 border-quantum-entangled/20">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-quantum-entangled" />
          <h3 className="font-semibold text-quantum-entangled">Security Metrics</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">QBER (Quantum Bit Error Rate)</span>
              <span className="text-sm font-mono">{stats.current_qber.toFixed(1)}%</span>
            </div>
            <Progress value={stats.current_qber * 10} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Threshold: {stats.qber_threshold}% | Status: 
              <Badge variant="outline" className="ml-1 border-primary text-primary">
                {stats.security_level}
              </Badge>
            </p>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Channel Noise</span>
              <span className="text-sm font-mono">{(stats.channel_noise * 100).toFixed(1)}%</span>
            </div>
            <Progress value={stats.channel_noise * 1000} className="h-2" />
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
              <span className="text-sm text-muted-foreground">Transmission Rate</span>
              <span className="text-sm font-mono">{calculateTransmissionPercentage(stats.transmission_rate)}%</span>
            </div>
            <Progress value={calculateTransmissionPercentage(stats.transmission_rate)} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Protocol Efficiency</span>
              <span className="text-sm font-mono">{calculateEfficiencyPercentage(stats.efficiency)}%</span>
            </div>
            <Progress value={calculateEfficiencyPercentage(stats.efficiency)} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-quantum-bob/20">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-quantum-bob" />
          <h3 className="font-semibold text-quantum-bob">Key Generation</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-2xl font-bold font-mono text-quantum-bob">
              {stats.raw_key_length.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Raw Key Bits</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-2xl font-bold font-mono text-quantum-alice">
              {stats.sifted_key.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Sifted Key</p>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-2xl font-bold font-mono text-quantum-entangled">
              {stats.final_key.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Final Key</p>
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
              {stats.security_level === "secure" ? "No Threats" : "Threat Detected"}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Channel Integrity</span>
            <Badge variant="outline" className="border-quantum-entangled text-quantum-entangled">
              {stats.current_qber < stats.qber_threshold ? "Secure" : "Compromised"}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Anomaly Score</span>
            <span className="text-sm font-mono text-primary">
              {(stats.current_qber / stats.qber_threshold).toFixed(2)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
