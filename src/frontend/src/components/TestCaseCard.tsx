import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, AlertTriangle, ListChecks } from 'lucide-react';
import type { TestCase } from '../backend';

interface TestCaseCardProps {
  testCase: TestCase;
  categoryColor?: string;
}

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  orange: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
  purple: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  green: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  red: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
  default: 'bg-primary/10 text-primary border-primary/20',
};

export default function TestCaseCard({ testCase, categoryColor = 'default' }: TestCaseCardProps) {
  const colorClass = colorMap[categoryColor] || colorMap.default;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={colorClass}>
                TC-{testCase.id}
              </Badge>
              <Badge variant="secondary">{testCase.type}</Badge>
            </div>
            <CardTitle className="text-lg leading-tight">{testCase.description}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Preconditions */}
        {testCase.preconditions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              Preconditions
            </div>
            <ul className="space-y-2 pl-6">
              {testCase.preconditions.map((precondition, index) => (
                <li key={index} className="text-sm list-disc text-foreground/90">
                  {precondition}
                </li>
              ))}
            </ul>
          </div>
        )}

        {testCase.preconditions.length > 0 && <Separator />}

        {/* Test Steps */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <ListChecks className="h-4 w-4" />
            Test Steps
          </div>
          <ol className="space-y-3">
            {testCase.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground/90 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <Separator />

        {/* Expected Results */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            Expected Results
          </div>
          <ul className="space-y-2 pl-6">
            {testCase.expectedResults.map((result, index) => (
              <li key={index} className="text-sm list-disc text-foreground/90">
                {result}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
