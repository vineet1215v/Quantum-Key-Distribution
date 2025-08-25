import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Code, 
  Zap, 
  Settings,
  CircuitBoard,
  Atom,
  Info,
  Loader2
} from 'lucide-react';
import { QiskitConnection } from './QiskitConnection';
import { QiskitJobMonitor } from './QiskitJobMonitor';
import { 
  getQuantumDevices, 
  submitQuantumJob, 
  generateBB84QASM,
  generateBellCircuit,
  QuantumDevice,
  JobSubmissionRequest,
  JobSubmissionResponse,
  QASMGenerationRequest
} from '@/lib/quantum-api';
import { useToast } from '@/hooks/use-toast';

export const QiskitLab: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<QuantumDevice | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState('bb84');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shots, setShots] = useState(1024);
  const [customQASM, setCustomQASM] = useState('');
  const { toast } = useToast();

  // BB84 Protocol state
  const [keyLength, setKeyLength] = useState(8);
  const [bb84Results, setBB84Results] = useState<any>(null);

  // Bell State state
  const [bellResults, setBellResults] = useState<any>(null);

  const handleJobUpdate = (updatedJob: any) => {
    setJobs(prev => prev.map(job => 
      job.job_id === updatedJob.job_id ? updatedJob : job
    ));
  };

  const handleJobsRefresh = () => {
    // Refresh logic handled by QiskitJobMonitor
  };

  const executeCircuit = async (qasm: string, name: string) => {
    if (!selectedDevice) {
      toast({
        title: "No Device Selected",
        description: "Please select a quantum device first",
        variant: "destructive"
      });
      return;
    }

    setIsExecuting(true);
    try {
      const request: JobSubmissionRequest = {
        qasm,
        shots,
        backend: selectedDevice.name
      };

      const response = await submitQuantumJob(request);
      
      if (response.success) {
        const job = {
          job_id: response.job_id,
          status: response.status,
          results: response.results,
          created_at: new Date().toISOString(),
          name: name
        };

        setJobs(prev => [job, ...prev]);
        
        toast({
          title: "Job Submitted",
          description: `Quantum circuit submitted to ${selectedDevice.name}`,
        });
      } else {
        throw new Error(response.error || 'Failed to submit job');
      }

    } catch (error) {
      toast({
        title: "Execution Failed",
        description: error instanceof Error ? error.message : "Failed to submit quantum circuit",
        variant: "destructive"
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const runBB84Protocol = async () => {
    setIsLoading(true);
    try {
      // Generate random bits and bases for Alice and Bob
      const aliceBits = Array.from({ length: keyLength }, () => Math.floor(Math.random() * 2));
      const aliceBases = Array.from({ length: keyLength }, () => Math.floor(Math.random() * 2));
      const bobBases = Array.from({ length: keyLength }, () => Math.floor(Math.random() * 2));

      const request: QASMGenerationRequest = {
        alice_bits: aliceBits,
        alice_bases: aliceBases,
        bob_bases: bobBases
      };

      const response = await generateBB84QASM(request);
      
      if (response.success) {
        setBB84Results({
          aliceBits,
          aliceBases,
          bobBases,
          qasm: response.qasm
        });

        await executeCircuit(response.qasm, 'BB84 Protocol');
      } else {
        throw new Error(response.error || 'Failed to generate QASM');
      }
    } catch (error) {
      toast({
        title: "BB84 Protocol Failed",
        description: error instanceof Error ? error.message : "Failed to run BB84 protocol",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runBellState = async () => {
    setIsLoading(true);
    try {
      const response = await generateBellCircuit();
      
      if (response.success) {
        setBellResults({ 
          qasm: response.qasm,
          circuit_image: response.circuit_image
        });

        await executeCircuit(response.qasm, 'Bell State');
      } else {
        throw new Error(response.error || 'Failed to generate Bell circuit');
      }
    } catch (error) {
      toast({
        title: "Bell State Failed",
        description: error instanceof Error ? error.message : "Failed to create Bell state",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runCustomCircuit = async () => {
    if (!customQASM.trim()) {
      toast({
        title: "No Circuit",
        description: "Please enter a QASM circuit",
        variant: "destructive"
      });
      return;
    }

    await executeCircuit(customQASM, 'Custom Circuit');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Atom className="w-8 h-8 text-quantum-entangled" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-quantum-entangled to-quantum-alice bg-clip-text text-transparent">
            IBM Qiskit Laboratory
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Execute quantum circuits on real IBM quantum computers and simulators. 
          Explore quantum cryptography protocols using authentic quantum hardware.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Connection & Circuits */}
        <div className="lg:col-span-2 space-y-6">
          <QiskitConnection 
            onDeviceSelect={setSelectedDevice}
            selectedDevice={selectedDevice}
          />

          <Card className="border-quantum-entangled/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-quantum-entangled">
                <CircuitBoard className="w-5 h-5" />
                Quantum Circuits
              </CardTitle>
              <CardDescription>
                Execute pre-built protocols or create custom quantum circuits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="bb84">BB84 Protocol</TabsTrigger>
                  <TabsTrigger value="bell">Bell States</TabsTrigger>
                  <TabsTrigger value="custom">Custom QASM</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
                  <Settings className="w-5 h-5 text-quantum-alice" />
                  <div className="flex-1">
                    <Label htmlFor="shots" className="text-sm font-medium">
                      Number of Shots
                    </Label>
                    <Input
                      id="shots"
                      type="number"
                      min="1"
                      max="8192"
                      value={shots}
                      onChange={(e) => setShots(parseInt(e.target.value) || 1024)}
                      className="mt-1 w-32"
                    />
                  </div>
                  {selectedDevice && (
                    <Badge className="bg-quantum-entangled/10 text-quantum-entangled border-quantum-entangled/20">
                      {selectedDevice.name}
                    </Badge>
                  )}
                </div>

                <TabsContent value="bb84" className="space-y-4">
                  <Alert>
                    <Info className="w-4 h-4" />
                    <AlertDescription>
                      The BB84 protocol demonstrates quantum key distribution using quantum superposition and measurement.
                    </AlertDescription>
                  </Alert>

                  <div className="flex items-center gap-4">
                    <div>
                      <Label htmlFor="keyLength" className="text-sm font-medium">
                        Key Length (qubits)
                      </Label>
                      <Input
                        id="keyLength"
                        type="number"
                        min="2"
                        max="16"
                        value={keyLength}
                        onChange={(e) => setKeyLength(parseInt(e.target.value) || 8)}
                        className="mt-1 w-32"
                      />
                    </div>
                    <Button
                      onClick={runBB84Protocol}
                      disabled={!selectedDevice || isExecuting || isLoading}
                      className="bg-quantum-entangled hover:bg-quantum-entangled/80"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {isLoading ? "Generating..." : "Run BB84 Protocol"}
                    </Button>
                  </div>

                  {bb84Results && (
                    <div className="p-4 bg-card rounded-lg border space-y-3">
                      <h4 className="font-medium text-quantum-entangled">Generated Circuit</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Alice Bits:</span>
                          <div className="font-mono">{bb84Results.aliceBits.join('')}</div>
                        </div>
                        <div>
                          <span className="font-medium">Alice Bases:</span>
                          <div className="font-mono">{bb84Results.aliceBases.join('')}</div>
                        </div>
                        <div>
                          <span className="font-medium">Bob Bases:</span>
                          <div className="font-mono">{bb84Results.bobBases.join('')}</div>
                        </div>
                      </div>
                      <Separator />
                      <Textarea
                        value={bb84Results.qasm}
                        readOnly
                        className="font-mono text-xs"
                        rows={8}
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="bell" className="space-y-4">
                  <Alert>
                    <Info className="w-4 h-4" />
                    <AlertDescription>
                      Bell states demonstrate quantum entanglement between two qubits.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={runBellState}
                    disabled={!selectedDevice || isExecuting || isLoading}
                    className="bg-quantum-alice hover:bg-quantum-alice/80"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? "Generating..." : "Create Bell State"}
                  </Button>

                  {bellResults && (
                    <div className="p-4 bg-card rounded-lg border space-y-3">
                      <h4 className="font-medium text-quantum-alice">Bell State Circuit</h4>
                      <Textarea
                        value={bellResults.qasm}
                        readOnly
                        className="font-mono text-xs"
                        rows={6}
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                  <Alert>
                    <Info className="w-4 h-4" />
                    <AlertDescription>
                      Write your own QASM 2.0 quantum circuit and execute it on real hardware.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <Label htmlFor="customQASM" className="text-sm font-medium">
                      QASM 2.0 Circuit
                    </Label>
                    <Textarea
                      id="customQASM"
                      placeholder={`OPENQASM 2.0;
include "qelib1.inc";

qreg q[2];
creg c[2];

h q[0];
cx q[0],q[1];
measure q[0] -> c[0];
measure q[1] -> c[1];`}
                      value={customQASM}
                      onChange={(e) => setCustomQASM(e.target.value)}
                      className="font-mono text-sm"
                      rows={10}
                    />
                  </div>

                  <Button
                    onClick={runCustomCircuit}
                    disabled={!selectedDevice || isExecuting || !customQASM.trim()}
                    className="bg-quantum-bob hover:bg-quantum-bob/80"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Execute Circuit
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Job Monitor */}
        <div>
          <QiskitJobMonitor
            jobs={jobs}
            onJobUpdate={handleJobUpdate}
            onJobsRefresh={handleJobsRefresh}
          />
        </div>
      </div>
    </div>
  );
};