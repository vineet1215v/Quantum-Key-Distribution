import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuantumBit } from "./QuantumBit";
import { cn } from "@/lib/utils";

interface ParticipantCardProps {
  name: string;
  role: string;
  color: string;
  data: {
    bits: number[];
    bases: number[];
  };
  active: boolean;
  className?: string;
}

export const ParticipantCard = ({ 
  name, 
  role, 
  color, 
  data, 
  active, 
  className 
}: ParticipantCardProps) => {
  const colorClasses = {
    "quantum-alice": "border-quantum-alice/30 text-quantum-alice",
    "quantum-bob": "border-quantum-bob/30 text-quantum-bob", 
    "quantum-eve": "border-quantum-eve/30 text-quantum-eve",
    "quantum-entangled": "border-quantum-entangled/30 text-quantum-entangled"
  };

  return (
    <Card className={cn(
      "p-4 transition-all duration-300",
      colorClasses[color as keyof typeof colorClasses] || "border-border",
      active && "ring-2 ring-current/20 shadow-lg",
      className
    )}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "border-current",
              active ? "bg-current/10" : "opacity-50"
            )}
          >
            {active ? "Active" : "Inactive"}
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
              Quantum Bits
            </p>
            <div className="grid grid-cols-4 gap-2">
              {data.bits.map((bit, i) => (
                <QuantumBit
                  key={i}
                  bit={bit}
                  basis={data.bases[i]}
                  measured={active}
                  animate={active}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
              Measurement Bases
            </p>
            <div className="grid grid-cols-4 gap-2">
              {data.bases.map((basis, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-12 h-6 rounded border-2 flex items-center justify-center text-xs font-mono",
                    basis === 0 
                      ? "bg-quantum-entangled/20 border-quantum-entangled text-quantum-entangled" 
                      : "bg-quantum-noise/20 border-quantum-noise text-quantum-noise",
                    active && "animate-quantum-entangle"
                  )}
                >
                  {basis === 0 ? "+" : "×"}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity indicator */}
        {active && (
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span className="text-current">
              {name === "Alice" ? "Preparing states" : 
               name === "Bob" ? "Measuring qubits" : 
               "Intercepting transmission"}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};