import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Network, Users, Zap, Shield, AlertTriangle } from "lucide-react";

interface NetworkNode {
  id: string;
  name: string;
  type: "alice" | "bob" | "relay" | "trusted";
  position: { x: number; y: number };
  status: "active" | "compromised" | "offline";
  keyBuffer: number;
  connections: string[];
}

interface QuantumNetworkTopologyProps {
  nodes: number;
  isRunning: boolean;
  metrics: any;
}

export const QuantumNetworkTopology = ({ nodes, isRunning, metrics }: QuantumNetworkTopologyProps) => {
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [routingAlgorithm, setRoutingAlgorithm] = useState("shortest-path");
  const [networkStats, setNetworkStats] = useState({
    totalThroughput: 0,
    averageLatency: 0,
    securityLevel: 0,
    activeConnections: 0
  });

  // Initialize network topology
  useEffect(() => {
    const newNodes: NetworkNode[] = [];
    const positions = generateNodePositions(nodes);
    
    for (let i = 0; i < nodes; i++) {
      const nodeType = i === 0 ? "alice" : i === nodes - 1 ? "bob" : 
                      i % 3 === 0 ? "trusted" : "relay";
      
      newNodes.push({
        id: `node-${i}`,
        name: nodeType === "alice" ? "Alice" : nodeType === "bob" ? "Bob" : 
              nodeType === "trusted" ? `TR-${i}` : `R-${i}`,
        type: nodeType,
        position: positions[i],
        status: Math.random() > 0.9 ? "compromised" : "active",
        keyBuffer: Math.floor(Math.random() * 1000),
        connections: generateConnections(i, nodes)
      });
    }
    
    setNetworkNodes(newNodes);
  }, [nodes]);

  // Update network stats
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setNetworkStats({
          totalThroughput: Math.random() * 1000 + 500,
          averageLatency: Math.random() * 20 + 5,
          securityLevel: Math.random() * 10 + 85,
          activeConnections: Math.floor(Math.random() * nodes * 2)
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isRunning, nodes]);

  const generateNodePositions = (count: number) => {
    const positions = [];
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    
    for (let i = 0; i < count; i++) {
      const angle = (2 * Math.PI * i) / count;
      positions.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      });
    }
    return positions;
  };

  const generateConnections = (nodeIndex: number, totalNodes: number) => {
    const connections = [];
    // Connect to next and previous nodes (ring topology)
    connections.push(`node-${(nodeIndex + 1) % totalNodes}`);
    connections.push(`node-${(nodeIndex - 1 + totalNodes) % totalNodes}`);
    
    // Add some random connections for mesh topology
    if (Math.random() > 0.5) {
      const randomNode = Math.floor(Math.random() * totalNodes);
      if (randomNode !== nodeIndex) {
        connections.push(`node-${randomNode}`);
      }
    }
    
    return connections;
  };

  const getNodeColor = (type: string, status: string) => {
    if (status === "compromised") return "quantum-eve";
    if (status === "offline") return "quantum-noise";
    
    switch (type) {
      case "alice": return "quantum-alice";
      case "bob": return "quantum-bob";
      case "trusted": return "quantum-entangled";
      default: return "primary";
    }
  };

  const routingAlgorithms = [
    { id: "shortest-path", name: "Shortest Path", efficiency: 85 },
    { id: "load-balancing", name: "Load Balancing", efficiency: 92 },
    { id: "security-aware", name: "Security-Aware", efficiency: 78 },
    { id: "quantum-optimal", name: "Quantum Optimal", efficiency: 95 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Visualization */}
        <Card className="lg:col-span-2 p-6 border-quantum-entangled/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-quantum-entangled">Quantum Network Topology</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-quantum-entangled border-quantum-entangled/30">
                {nodes} Nodes
              </Badge>
              <Badge variant="outline" className={isRunning ? "text-primary border-primary/30" : "text-muted-foreground"}>
                {isRunning ? "Live" : "Static"}
              </Badge>
            </div>
          </div>
          
          {/* SVG Network Visualization */}
          <div className="relative bg-muted/20 rounded-lg p-4 min-h-[400px]">
            <svg width="100%" height="400" viewBox="0 0 400 400" className="overflow-visible">
              {/* Draw connections first */}
              {networkNodes.map((node) =>
                node.connections.map((connectionId) => {
                  const targetNode = networkNodes.find(n => n.id === connectionId);
                  if (!targetNode) return null;
                  
                  return (
                    <line
                      key={`${node.id}-${connectionId}`}
                      x1={node.position.x}
                      y1={node.position.y}
                      x2={targetNode.position.x}
                      y2={targetNode.position.y}
                      stroke="hsl(var(--quantum-entangled))"
                      strokeWidth="2"
                      strokeOpacity="0.3"
                      className={isRunning ? "animate-pulse" : ""}
                    />
                  );
                })
              )}
              
              {/* Draw nodes */}
              {networkNodes.map((node) => (
                <g key={node.id}>
                  <circle
                    cx={node.position.x}
                    cy={node.position.y}
                    r="20"
                    fill={`hsl(var(--${getNodeColor(node.type, node.status)}) / 0.2)`}
                    stroke={`hsl(var(--${getNodeColor(node.type, node.status)}))`}
                    strokeWidth="3"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedNode === node.id ? "scale-110" : "hover:scale-105"
                    } ${isRunning && node.status === "active" ? "animate-quantum-pulse" : ""}`}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  />
                  <text
                    x={node.position.x}
                    y={node.position.y + 5}
                    textAnchor="middle"
                    className={`text-xs font-bold fill-${getNodeColor(node.type, node.status)} pointer-events-none`}
                  >
                    {node.name}
                  </text>
                  
                  {/* Status indicator */}
                  {node.status === "compromised" && (
                    <circle
                      cx={node.position.x + 15}
                      cy={node.position.y - 15}
                      r="5"
                      fill="hsl(var(--quantum-eve))"
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Key buffer indicator */}
                  <rect
                    x={node.position.x - 10}
                    y={node.position.y + 25}
                    width="20"
                    height="3"
                    fill="hsl(var(--muted))"
                    rx="1"
                  />
                  <rect
                    x={node.position.x - 10}
                    y={node.position.y + 25}
                    width={Math.min(20, (node.keyBuffer / 1000) * 20)}
                    height="3"
                    fill={`hsl(var(--${getNodeColor(node.type, node.status)}))`}
                    rx="1"
                  />
                </g>
              ))}
            </svg>
          </div>
        </Card>

        {/* Network Controls & Stats */}
        <div className="space-y-6">
          <Card className="p-4 border-quantum-alice/20">
            <div className="flex items-center gap-2 mb-4">
              <Network className="w-5 h-5 text-quantum-alice" />
              <h3 className="font-bold text-quantum-alice">Network Control</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Routing Algorithm</label>
                <select 
                  value={routingAlgorithm}
                  onChange={(e) => setRoutingAlgorithm(e.target.value)}
                  className="w-full p-2 rounded border bg-background text-foreground"
                >
                  {routingAlgorithms.map(algo => (
                    <option key={algo.id} value={algo.id}>{algo.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Algorithm Efficiency:</span>
                  <span className="text-quantum-entangled">
                    {routingAlgorithms.find(a => a.id === routingAlgorithm)?.efficiency}%
                  </span>
                </div>
                <Progress 
                  value={routingAlgorithms.find(a => a.id === routingAlgorithm)?.efficiency || 0} 
                  className="h-2" 
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 border-quantum-bob/20">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-quantum-bob" />
              <h3 className="font-bold text-quantum-bob">Network Stats</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Total Throughput:</span>
                <span className="font-mono text-quantum-bob">
                  {networkStats.totalThroughput.toFixed(1)} Mbps
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average Latency:</span>
                <span className="font-mono text-quantum-alice">
                  {networkStats.averageLatency.toFixed(1)} ms
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Security Level:</span>
                <span className="font-mono text-quantum-entangled">
                  {networkStats.securityLevel.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Connections:</span>
                <span className="font-mono text-primary">
                  {networkStats.activeConnections}
                </span>
              </div>
            </div>
          </Card>

          {selectedNode && (
            <Card className="p-4 border-quantum-entangled/20">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-quantum-entangled" />
                <h3 className="font-bold text-quantum-entangled">Node Details</h3>
              </div>
              
              {(() => {
                const node = networkNodes.find(n => n.id === selectedNode);
                if (!node) return null;
                
                return (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Name:</span>
                      <span className="font-mono text-quantum-entangled">{node.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Type:</span>
                      <Badge variant="outline" className={`border-${getNodeColor(node.type, node.status)}/30 text-${getNodeColor(node.type, node.status)}`}>
                        {node.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status:</span>
                      <Badge variant="outline" className={node.status === "compromised" ? "border-quantum-eve text-quantum-eve" : "border-primary text-primary"}>
                        {node.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Key Buffer:</span>
                      <span className="font-mono text-quantum-bob">{node.keyBuffer} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Connections:</span>
                      <span className="font-mono text-quantum-alice">{node.connections.length}</span>
                    </div>
                  </div>
                );
              })()}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};