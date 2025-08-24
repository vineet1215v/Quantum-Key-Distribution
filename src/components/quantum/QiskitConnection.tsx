import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Wifi, WifiOff, Server, Cpu } from 'lucide-react';
import { qiskitAPI, QiskitDevice } from '@/lib/qiskit-api';
import { useToast } from '@/hooks/use-toast';

interface QiskitConnectionProps {
  onDeviceSelect?: (device: QiskitDevice) => void;
  selectedDevice?: QiskitDevice | null;
}

export const QiskitConnection: React.FC<QiskitConnectionProps> = ({
  onDeviceSelect,
  selectedDevice
}) => {
  const [token, setToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [devices, setDevices] = useState<QiskitDevice[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if token is already stored
    const storedToken = localStorage.getItem('qiskit_token');
    if (storedToken) {
      setToken(storedToken);
      setIsConnected(true);
      loadDevices();
    }
  }, []);

  const handleConnect = async () => {
    if (!token.trim()) {
      toast({
        title: "Token Required",
        description: "Please enter your IBM Quantum API token",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      qiskitAPI.setToken(token);
      await loadDevices();
      setIsConnected(true);
      toast({
        title: "Connected Successfully",
        description: "Connected to IBM Quantum services",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to IBM Quantum. Using demo mode.",
        variant: "destructive"
      });
      // Still show demo devices
      await loadDevices();
      setIsConnected(true);
    } finally {
      setLoading(false);
    }
  };

  const loadDevices = async () => {
    try {
      const deviceList = await qiskitAPI.getDevices();
      setDevices(deviceList);
    } catch (error) {
      console.error('Failed to load devices:', error);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('qiskit_token');
    setToken('');
    setIsConnected(false);
    setDevices([]);
    onDeviceSelect?.(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-4 h-4 text-primary" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-destructive" />;
      default:
        return <Server className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'offline':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-quantum-entangled/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-quantum-entangled">
            <Server className="w-5 h-5" />
            IBM Qiskit Connection
          </CardTitle>
          <CardDescription>
            Connect to IBM Quantum services to run circuits on real quantum computers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <>
              <Alert>
                <AlertDescription>
                  Get your API token from{' '}
                  <a 
                    href="https://quantum-computing.ibm.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-quantum-entangled hover:underline"
                  >
                    IBM Quantum Experience
                  </a>
                  {' '}to access real quantum hardware.
                </AlertDescription>
              </Alert>
              
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="Enter IBM Quantum API Token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleConnect}
                  disabled={loading}
                  className="bg-quantum-entangled hover:bg-quantum-entangled/80"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Connect'
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Wifi className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {devices.length} devices available
                </span>
              </div>
              <Button variant="outline" onClick={handleDisconnect} size="sm">
                Disconnect
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {isConnected && devices.length > 0 && (
        <Card className="border-quantum-alice/20">
          <CardHeader>
            <CardTitle className="text-quantum-alice">Quantum Devices</CardTitle>
            <CardDescription>
              Select a quantum device to run your circuits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {devices.map((device) => (
                <div
                  key={device.name}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-quantum-entangled/40 ${
                    selectedDevice?.name === device.name
                      ? 'border-quantum-entangled bg-quantum-entangled/5'
                      : 'border-border'
                  }`}
                  onClick={() => onDeviceSelect?.(device)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-quantum-entangled" />
                      <span className="font-medium">{device.name}</span>
                      {device.simulator && (
                        <Badge variant="outline" className="text-xs">
                          Simulator
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(device.status)}
                      <Badge className={getStatusColor(device.status)}>
                        {device.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">{device.n_qubits}</span> qubits
                    </div>
                    <div>
                      Queue: <span className="font-medium">{device.queue_length}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    Gates: {device.basis_gates.slice(0, 4).join(', ')}
                    {device.basis_gates.length > 4 && '...'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};