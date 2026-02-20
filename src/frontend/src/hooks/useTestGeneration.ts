import { useState } from 'react';
import { useActor } from './useActor';
import type { TestSuite } from '../backend';

export function useTestGeneration() {
  const { actor } = useActor();
  const [testSuite, setTestSuite] = useState<TestSuite | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateTestCases = async (requirements: string[]) => {
    if (!actor) {
      setError('Backend actor not initialized');
      throw new Error('Backend actor not initialized');
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await actor.getTestSuite(requirements);
      setTestSuite(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate test cases';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateTestCases,
    testSuite,
    isLoading,
    error,
  };
}
