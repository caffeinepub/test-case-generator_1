import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Copy, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import TestCaseCard from './TestCaseCard';
import { useTestCaseExport } from '../hooks/useTestCaseExport';
import type { TestSuite } from '../backend';

interface TestCaseDisplayProps {
  testSuite: TestSuite;
}

export default function TestCaseDisplay({ testSuite }: TestCaseDisplayProps) {
  const { copyToClipboard, downloadAsFile, exportToExcel, copied, exporting } = useTestCaseExport();
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { key: 'all', label: 'All Tests', data: testSuite.orderedSequence, color: 'default' },
    { key: 'functional', label: 'Functional', data: testSuite.functional, color: 'emerald' },
    { key: 'boundary', label: 'Boundary', data: testSuite.boundary, color: 'amber' },
    { key: 'edge', label: 'Edge Cases', data: testSuite.edgeCases, color: 'orange' },
    { key: 'exploratory', label: 'Exploratory', data: testSuite.exploratory, color: 'purple' },
    { key: 'positive', label: 'Positive', data: testSuite.positive, color: 'green' },
    { key: 'negative', label: 'Negative', data: testSuite.negative, color: 'red' },
  ];

  const totalTests = testSuite.orderedSequence.length;

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border-emerald-500/20">
        <CardHeader>
          <CardTitle>Test Suite Summary</CardTitle>
          <CardDescription>
            Generated {totalTests} comprehensive test cases across multiple categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.slice(1).map((category) => (
              <div key={category.key} className="text-center space-y-1">
                <div className="text-2xl font-bold">{category.data.length}</div>
                <div className="text-xs text-muted-foreground">{category.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => copyToClipboard(testSuite)}
          variant="outline"
          className="gap-2"
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy All
            </>
          )}
        </Button>
        <Button
          onClick={() => downloadAsFile(testSuite)}
          variant="outline"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download as Text
        </Button>
        <Button
          onClick={() => exportToExcel(testSuite)}
          variant="outline"
          className="gap-2"
          disabled={exporting}
        >
          {exporting ? (
            <>
              <FileSpreadsheet className="h-4 w-4 animate-pulse" />
              Exporting...
            </>
          ) : (
            <>
              <FileSpreadsheet className="h-4 w-4" />
              Export to Excel
            </>
          )}
        </Button>
      </div>

      {/* Test Cases Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 h-auto gap-2">
          {categories.map((category) => (
            <TabsTrigger
              key={category.key}
              value={category.key}
              className="flex flex-col items-center gap-1 py-3"
            >
              <span className="text-sm font-medium">{category.label}</span>
              <Badge variant="secondary" className="text-xs">
                {category.data.length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.key} value={category.key} className="space-y-4">
            {category.data.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No {category.label.toLowerCase()} test cases generated
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {category.data.map((testCase, index) => (
                  <TestCaseCard
                    key={`${category.key}-${testCase.id}-${index}`}
                    testCase={testCase}
                    categoryColor={category.color}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
