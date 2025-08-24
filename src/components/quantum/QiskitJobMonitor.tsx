import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  BarChart3,
  RefreshCw 
} from 'lucide-react';
import { qiskitAPI, QiskitQuantumJob } from '@/lib/qiskit-api';
import { useToast } from '@/hooks/use-toast';

interface QiskitJobMonitorProps {
  jobs: QiskitQuantumJob[];
  onJobUpdate: (job: QiskitQuantumJob) => void;
  onJobsRefresh: () => void;
}

export const QiskitJobMonitor: React.FC<QiskitJobMonitorProps> = ({
  jobs,
  onJobUpdate,
  onJobsRefresh
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Auto-refresh pending/running jobs every 5 seconds
    const interval = setInterval(() => {
      const activeJobs = jobs.filter(job => 
        job.status === 'pending' || job.status === 'running'
      );
      
      if (activeJobs.length > 0) {
        refreshJobStatuses();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [jobs]);

  const refreshJobStatuses = async () => {
    const activeJobs = jobs.filter(job => 
      job.status === 'pending' || job.status === 'running'
    );

    for (const job of activeJobs) {
      try {
        const updatedJob = await qiskitAPI.getJob(job.id);
        if (updatedJob.status !== job.status) {
          onJobUpdate(updatedJob);
          
          if (updatedJob.status === 'completed') {
            toast({
              title: "Job Completed",
              description: `Quantum job ${job.id.substring(0, 8)}... finished successfully`,
            });
          } else if (updatedJob.status === 'failed') {
            toast({
              title: "Job Failed",
              description: `Quantum job ${job.id.substring(0, 8)}... failed to execute`,
              variant: "destructive"
            });
          }
        }
      } catch (error) {
        console.error(`Failed to refresh job ${job.id}:`, error);
      }
    }
  };

  const handleRefreshAll = async () => {
    setRefreshing(true);
    try {
      await refreshJobStatuses();
      onJobsRefresh();
      toast({
        title: "Jobs Refreshed",
        description: "All job statuses have been updated",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh job statuses",
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatResults = (results: any) => {
    if (!results?.quasi_dists?.[0]) return null;
    
    const counts = results.quasi_dists[0];
    const total = Object.values(counts).reduce((sum: number, count: any) => sum + Number(count), 0);
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => Number(b) - Number(a))
      .slice(0, 4)
      .map(([state, count]) => {
        const numCount = Number(count);
        const totalNum = Number(total);
        return {
          state,
          count: numCount,
          probability: ((numCount / totalNum) * 100).toFixed(1)
        };
      });
  };

  if (jobs.length === 0) {
    return (
      <Card className="border-quantum-bob/20">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            No quantum jobs submitted yet.<br />
            Submit a circuit to see job monitoring.
          </p>
        </CardContent>
      </Card>
    );
  }

  const activeJobs = jobs.filter(job => job.status === 'pending' || job.status === 'running');
  const completedJobs = jobs.filter(job => job.status === 'completed');
  const failedJobs = jobs.filter(job => job.status === 'failed');

  return (
    <div className="space-y-6">
      <Card className="border-quantum-bob/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-quantum-bob">Quantum Job Monitor</CardTitle>
              <CardDescription>
                Track your quantum computing jobs in real-time
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshAll}
              disabled={refreshing}
            >
              {refreshing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{activeJobs.length}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedJobs.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{failedJobs.length}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
          </div>

          {activeJobs.length > 0 && (
            <Alert className="mb-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <AlertDescription>
                {activeJobs.length} job{activeJobs.length > 1 ? 's' : ''} currently executing on quantum hardware
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {jobs.slice().reverse().map((job) => (
          <Card key={job.id} className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <div className="font-medium">
                      Job {job.id.substring(0, 8)}...
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(job.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(job.status)}>
                  {job.status}
                </Badge>
              </div>

              {job.status === 'running' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Executing...</span>
                    <span>~2-5 minutes</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              )}

              {job.status === 'completed' && job.results && (
                <div className="mt-4 p-4 bg-card rounded-lg border">
                  <h4 className="font-medium mb-3 text-quantum-entangled">
                    Measurement Results
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {formatResults(job.results)?.map(({ state, count, probability }) => (
                      <div key={state} className="flex justify-between text-sm">
                        <span className="font-mono">|{state}⟩</span>
                        <span className="text-muted-foreground">
                          {count} ({probability}%)
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Total shots: {job.results.metadata?.[0]?.shots || 'N/A'}
                  </div>
                </div>
              )}

              {job.status === 'failed' && (
                <Alert className="mt-4">
                  <XCircle className="w-4 h-4" />
                  <AlertDescription>
                    Job execution failed. This may be due to hardware issues or invalid circuit parameters.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};