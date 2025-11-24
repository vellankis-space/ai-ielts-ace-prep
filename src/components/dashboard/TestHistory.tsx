
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Calendar, ChevronDown, Filter } from 'lucide-react';
import { format } from 'date-fns';

interface Test {
  id: number;
  date: string;
  module: string;
  score: number;
  type: 'practice' | 'mock';
}

interface TestHistoryProps {
  tests: Test[];
}

const TestHistory = ({ tests }: TestHistoryProps) => {
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'module'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<'all' | 'practice' | 'mock'>('all');

  const filteredTests = tests.filter(test => filter === 'all' || test.type === filter);

  const sortedTests = [...filteredTests].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'score') {
      comparison = a.score - b.score;
    } else if (sortBy === 'module') {
      comparison = a.module.localeCompare(b.module);
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (column: 'date' | 'score' | 'module') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.0) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (score >= 6.0) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    if (score >= 5.0) return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  const getTypeVariant = (type: string) => {
    return type === 'mock' ? 'default' : 'secondary';
  };

  return (
    <Card className="glass-card border-white/5">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Recent Test History
          </CardTitle>
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
            <Filter className="w-4 h-4 ml-2 text-muted-foreground" />
            <ToggleGroup type="single" value={filter} onValueChange={(value: "all" | "practice" | "mock") => value && setFilter(value)}>
              <ToggleGroupItem value="all" size="sm" className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="practice" size="sm" className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary">
                Practice
              </ToggleGroupItem>
              <ToggleGroupItem value="mock" size="sm" className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary">
                Mock Tests
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-white/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date Completed
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${sortBy === 'date' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('module')}
                >
                  <div className="flex items-center">
                    Module
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${sortBy === 'module' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort('score')}
                >
                  <div className="flex items-center">
                    Score/Band
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${sortBy === 'score' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                  </div>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTests.map((test) => (
                <TableRow key={test.id} className="hover:bg-white/5 border-white/5 transition-colors">
                  <TableCell className="font-medium text-foreground">
                    {format(new Date(test.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{test.module}</TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium border ${getScoreColor(test.score)}`}>
                      {test.score}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(test.type)} className="bg-white/10 hover:bg-white/20 text-foreground border-white/10">
                      {test.type.charAt(0).toUpperCase() + test.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {sortedTests.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-white/5 rounded-b-md border-t-0 border border-white/5">
            No tests found for the selected filter.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestHistory;
