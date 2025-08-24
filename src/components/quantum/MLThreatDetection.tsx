import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, AlertTriangle, TrendingUp, Activity } from "lucide-react";

interface MLThreatDetectionProps {
  attacks: number;
  isRunning: boolean;
  networkLatency: number;
}

export const MLThreatDetection = ({ attacks, isRunning, networkLatency }: MLThreatDetectionProps) => {
  const mlModels = [
    { name: "Neural Network", accuracy: 94.5, precision: 92.1, recall: 96.8, type: "Deep Learning" },
    { name: "Random Forest", accuracy: 89.2, precision: 87.5, recall: 91.3, type: "Ensemble" },
    { name: "SVM", accuracy: 85.7, precision: 84.2, recall: 87.9, type: "Classical ML" },
    { name: "Anomaly Detection", accuracy: 91.3, precision: 89.7, recall: 93.4, type: "Unsupervised" }
  ];

  const threatCategories = [
    { name: "Intercept-Resend", probability: 15.2, severity: "High", confidence: 89.5 },
    { name: "Beam Splitting", probability: 8.7, severity: "Medium", confidence: 76.3 },
    { name: "PNS Attack", probability: 3.1, severity: "Critical", confidence: 92.8 },
    { name: "Side Channel", probability: 12.5, severity: "Medium", confidence: 82.1 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-quantum-entangled/20">
          <h3 className="text-lg font-bold text-quantum-entangled mb-4">ML Model Performance</h3>
          <div className="space-y-4">
            {mlModels.map((model) => (
              <div key={model.name} className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-quantum-alice">{model.name}</h4>
                  <Badge variant="outline" className="text-xs">{model.type}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Accuracy:</span>
                    <div className="font-mono text-quantum-entangled">{model.accuracy}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Precision:</span>
                    <div className="font-mono text-quantum-bob">{model.precision}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Recall:</span>
                    <div className="font-mono text-quantum-alice">{model.recall}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-quantum-eve/20">
          <h3 className="text-lg font-bold text-quantum-eve mb-4">Real-time Threat Analysis</h3>
          <div className="space-y-4">
            {threatCategories.map((threat) => (
              <div key={threat.name} className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{threat.name}</h4>
                  <Badge variant="outline" className={
                    threat.severity === "Critical" ? "text-quantum-eve border-quantum-eve/30" :
                    threat.severity === "High" ? "text-quantum-alice border-quantum-alice/30" :
                    "text-quantum-bob border-quantum-bob/30"
                  }>
                    {threat.severity}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Probability:</span>
                    <span className="font-mono">{threat.probability}%</span>
                  </div>
                  <Progress value={threat.probability} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Confidence:</span>
                    <span className="font-mono text-quantum-entangled">{threat.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};