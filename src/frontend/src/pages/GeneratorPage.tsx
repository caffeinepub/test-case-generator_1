import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import TestCaseDisplay from '../components/TestCaseDisplay';
import { useTestGeneration } from '../hooks/useTestGeneration';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, FileText } from 'lucide-react';

type WorkflowState = 'upload' | 'processing' | 'results' | 'error';

export default function GeneratorPage() {
  const [workflowState, setWorkflowState] = useState<WorkflowState>('upload');
  const { generateTestCases, testSuite, isLoading, error } = useTestGeneration();

  const handleFileProcessed = async (requirements: string[]) => {
    setWorkflowState('processing');
    try {
      await generateTestCases(requirements);
      setWorkflowState('results');
    } catch (err) {
      setWorkflowState('error');
    }
  };

  const handleReset = () => {
    setWorkflowState('upload');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-4xl font-bold tracking-tight">
          Transform Requirements into{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Comprehensive Test Cases
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload your Word documents containing user stories and requirements. 
          Our system generates functional, boundary, edge, exploratory, positive, and negative test cases.
        </p>
      </div>

      {/* Main Content */}
      {workflowState === 'upload' && (
        <div className="max-w-3xl mx-auto">
          <FileUpload onFileProcessed={handleFileProcessed} />
        </div>
      )}

      {workflowState === 'processing' && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur-xl opacity-20 animate-pulse" />
            <Loader2 className="h-16 w-16 animate-spin text-emerald-600 relative" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">Generating Test Cases</h3>
            <p className="text-muted-foreground">Analyzing requirements and creating comprehensive test coverage...</p>
          </div>
        </div>
      )}

      {workflowState === 'error' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || 'An error occurred while generating test cases. Please try again.'}
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button onClick={handleReset} variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Upload Another Document
            </Button>
          </div>
        </div>
      )}

      {workflowState === 'results' && testSuite && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Generated Test Cases</h3>
              <p className="text-muted-foreground">Review and export your comprehensive test suite</p>
            </div>
            <Button onClick={handleReset} variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate New
            </Button>
          </div>
          <TestCaseDisplay testSuite={testSuite} />
        </div>
      )}
    </div>
  );
}
