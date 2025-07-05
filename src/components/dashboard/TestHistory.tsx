
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
import { Eye, Calendar, ChevronDown } from 'lucide-react';
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
    if (score >= 7.0) return 'text-green-600 bg-green-50';
    if (score >= 6.0) return 'text-blue-600 bg-blue-50';
    if (score >= 5.0) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getTypeVariant = (type: string) => {
    return type === 'mock' ? 'default' : 'secondary';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Recent Test History
          </CardTitle>
          <ToggleGroup type="single" value={filter} onValueChange={(value: "all" | "practice" | "mock") => setFilter(value)}>
            <ToggleGroupItem value="all" aria-label="Toggle all">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="practice" aria-label="Toggle practice">
              Practice
            </ToggleGroupItem>
            <ToggleGroupItem value="mock" aria-label="Toggle mock tests">
              Mock Tests
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  Date Completed
                  <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('module')}
              >
                <div className="flex items-center">
                  Module
                  <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('score')}
              >
                <div className="flex items-center">
                  Score/Band
                  <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTests.map((test) => (
              <TableRow key={test.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {format(new Date(test.date), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>{test.module}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(test.score)}`}>
                    {test.score}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={getTypeVariant(test.type)}>
                    {test.type.charAt(0).toUpperCase() + test.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {sortedTests.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tests found for the selected filter.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestHistory;
