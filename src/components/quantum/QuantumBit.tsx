import { cn } from "@/lib/utils";

interface QuantumBitProps {
  bit: number;
  basis: number;
  measured?: boolean;
  className?: string;
  animate?: boolean;
}

export const QuantumBit = ({ bit, basis, measured = false, className, animate = false }: QuantumBitProps) => {
  // Basis 0 = rectilinear (+, |), Basis 1 = diagonal (×, \)
  const polarization = basis === 0 ? (bit === 0 ? "|" : "—") : (bit === 0 ? "/" : "\\");
  
  return (
    <div className={cn(
      "relative w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono text-lg font-bold transition-all duration-300",
      measured ? "bg-primary/20 border-primary" : "bg-muted/30 border-border",
      animate && "animate-polarization-rotate",
      className
    )}>
      <span className={cn(
        "transition-all duration-300",
        measured ? "text-primary" : "text-muted-foreground",
        animate && "animate-quantum-pulse"
      )}>
        {polarization}
      </span>
      
      {/* Quantum state indicator */}
      <div className={cn(
        "absolute -top-1 -right-1 w-3 h-3 rounded-full",
        bit === 0 ? "bg-quantum-alice" : "bg-quantum-bob",
        animate && "animate-quantum-pulse"
      )} />
      
      {/* Basis indicator */}
      <div className={cn(
        "absolute -bottom-1 -left-1 w-3 h-3 rounded-full",
        basis === 0 ? "bg-quantum-entangled" : "bg-quantum-noise",
        animate && "animate-quantum-entangle"
      )} />
    </div>
  );
};