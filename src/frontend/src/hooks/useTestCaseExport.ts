import { useState, useCallback } from 'react';
import type { TestSuite, TestCase } from '../backend';

export function useTestCaseExport() {
  const [copied, setCopied] = useState(false);

  const formatTestCase = (testCase: TestCase): string => {
    let output = `Test Case ID: TC-${testCase.id}\n`;
    output += `Type: ${testCase.type}\n`;
    output += `Description: ${testCase.description}\n\n`;

    if (testCase.preconditions.length > 0) {
      output += `Preconditions:\n`;
      testCase.preconditions.forEach((pre, idx) => {
        output += `  ${idx + 1}. ${pre}\n`;
      });
      output += `\n`;
    }

    output += `Test Steps:\n`;
    testCase.steps.forEach((step, idx) => {
      output += `  ${idx + 1}. ${step}\n`;
    });
    output += `\n`;

    output += `Expected Results:\n`;
    testCase.expectedResults.forEach((result, idx) => {
      output += `  ${idx + 1}. ${result}\n`;
    });
    output += `\n`;
    output += `${'='.repeat(80)}\n\n`;

    return output;
  };

  const formatTestSuite = (testSuite: TestSuite): string => {
    let output = `TEST SUITE REPORT\n`;
    output += `Generated: ${new Date().toLocaleString()}\n`;
    output += `${'='.repeat(80)}\n\n`;

    const categories = [
      { name: 'FUNCTIONAL TEST CASES', data: testSuite.functional },
      { name: 'BOUNDARY TEST CASES', data: testSuite.boundary },
      { name: 'EDGE CASE TEST CASES', data: testSuite.edgeCases },
      { name: 'EXPLORATORY TEST CASES', data: testSuite.exploratory },
      { name: 'POSITIVE TEST CASES', data: testSuite.positive },
      { name: 'NEGATIVE TEST CASES', data: testSuite.negative },
    ];

    categories.forEach(category => {
      if (category.data.length > 0) {
        output += `\n${category.name}\n`;
        output += `${'-'.repeat(80)}\n\n`;
        category.data.forEach(testCase => {
          output += formatTestCase(testCase);
        });
      }
    });

    output += `\nORDERED EXECUTION SEQUENCE\n`;
    output += `${'-'.repeat(80)}\n\n`;
    testSuite.orderedSequence.forEach(testCase => {
      output += formatTestCase(testCase);
    });

    return output;
  };

  const copyToClipboard = useCallback(async (testSuite: TestSuite) => {
    const text = formatTestSuite(testSuite);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, []);

  const downloadAsFile = useCallback((testSuite: TestSuite) => {
    const text = formatTestSuite(testSuite);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `test-cases-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return {
    copyToClipboard,
    downloadAsFile,
    copied,
  };
}
