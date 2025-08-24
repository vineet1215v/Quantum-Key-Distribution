import { cn } from "@/lib/utils";

interface QuantumChannelProps {
  active: boolean;
  eveActive?: boolean;
}

export const QuantumChannel = ({ active, eveActive = false }: QuantumChannelProps) => {
  return (
    <div className="relative py-8">
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-quantum-alice/20 border-2 border-quantum-alice flex items-center justify-center">
            <span className="text-quantum-alice font-bold">A</span>
          </div>
          <p className="text-sm text-quantum-alice mt-2">Alice</p>
        </div>
        
        <div className="flex-1 relative mx-8">
          {/* Quantum channel line */}
          <div className={cn(
            "h-1 bg-gradient-to-r from-quantum-alice via-quantum-entangled to-quantum-bob rounded-full relative overflow-hidden",
            active && "animate-quantum-pulse"
          )}>
            {/* Photon particles */}
            {active && (
              <>
                <div className="absolute top-0 left-0 w-3 h-3 bg-quantum-entangled rounded-full -translate-y-1 animate-photon-travel" 
                     style={{ animationDelay: "0s" }} />
                <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full -translate-y-0.5 animate-photon-travel" 
                     style={{ animationDelay: "0.5s" }} />
                <div className="absolute top-0 left-0 w-2 h-2 bg-quantum-alice rounded-full -translate-y-0.5 animate-photon-travel" 
                     style={{ animationDelay: "1s" }} />
              </>
            )}
          </div>
          
          {/* Eve's interception point */}
          {eveActive && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 rounded-full bg-quantum-eve/30 border-2 border-quantum-eve flex items-center justify-center animate-quantum-pulse">
                <span className="text-quantum-eve text-sm font-bold">E</span>
              </div>
              {/* Interference lines */}
              <div className="absolute inset-0 rounded-full border-2 border-quantum-eve/50 animate-ping" />
              <div className="absolute -top-2 -bottom-2 -left-2 -right-2 rounded-full border border-quantum-eve/30 animate-ping" 
                   style={{ animationDelay: "0.5s" }} />
            </div>
          )}
          
          {/* Channel labels */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded border">
              Quantum Channel
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-quantum-bob/20 border-2 border-quantum-bob flex items-center justify-center">
            <span className="text-quantum-bob font-bold">B</span>
          </div>
          <p className="text-sm text-quantum-bob mt-2">Bob</p>
        </div>
      </div>
      
      {/* Channel status */}
      <div className="flex justify-center mt-4">
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border",
          active 
            ? "bg-quantum-entangled/20 border-quantum-entangled text-quantum-entangled" 
            : "bg-muted/30 border-border text-muted-foreground",
          eveActive && "bg-quantum-eve/20 border-quantum-eve text-quantum-eve animate-pulse"
        )}>
          {eveActive ? "⚠️ Channel Compromised" : active ? "🔄 Transmitting" : "⏸️ Idle"}
        </div>
      </div>
    </div>
  );
};