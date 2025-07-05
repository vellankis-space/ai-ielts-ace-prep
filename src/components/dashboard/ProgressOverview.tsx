
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Headphones, BookOpen, PenTool, Mic, TrendingUp } from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { type ChartConfig } from '@/components/ui/chart';

interface ProgressOverviewProps {
  userData: {
    currentBand: number;
    moduleAverages: {
      listening: number;
      reading: number;
      writing: number;
      speaking: number;
    };
  };
}

const ProgressOverview = ({ userData }: ProgressOverviewProps) => {
  const [isChartHovered, setIsChartHovered] = React.useState(false);
  const modules = [
    { name: 'Listening', score: userData.moduleAverages.listening, icon: Headphones, iconColor: 'text-blue-500', circleBgColor: 'bg-blue-100' },
    { name: 'Reading', score: userData.moduleAverages.reading, icon: BookOpen, iconColor: 'text-green-500', circleBgColor: 'bg-green-100' },
    { name: 'Writing', score: userData.moduleAverages.writing, icon: PenTool, iconColor: 'text-orange-500', circleBgColor: 'bg-orange-100' },
    { name: 'Speaking', score: userData.moduleAverages.speaking, icon: Mic, iconColor: 'text-purple-500', circleBgColor: 'bg-purple-100' }
  ];

  const getBandDescription = (score: number) => {
    if (score >= 8.0) return 'Very Good User';
    if (score >= 7.0) return 'Good User';
    if (score >= 6.0) return 'Competent User';
    if (score >= 5.0) return 'Modest User';
    return 'Limited User';
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.0) return 'text-green-600';
    if (score >= 6.0) return 'text-blue-600';
    if (score >= 5.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const chartData = [
    { subject: 'Listening', score: userData.moduleAverages.listening, fullMark: 9 },
    { subject: 'Reading', score: userData.moduleAverages.reading, fullMark: 9 },
    { subject: 'Writing', score: userData.moduleAverages.writing, fullMark: 9 },
    { subject: 'Speaking', score: userData.moduleAverages.speaking, fullMark: 9 },
  ];

  const chartConfig = {
    score: {
      label: "Your Score",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Overall Progress Overview</CardTitle>
        <CardDescription>
          Your performance across different IELTS modules
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Score - Radar Chart and Band */}
          <Card className="flex flex-col items-center justify-center p-6">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] w-full"
            >
              <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={chartData}
            onMouseEnter={() => setIsChartHovered(true)}
            onMouseLeave={() => setIsChartHovered(false)}
          >
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" /> {/* Corresponds to blue-600 */}
                <stop offset="100%" stopColor="#14b8a6" /> {/* Corresponds to teal-500 */}
              </linearGradient>
            </defs>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={90} domain={[0, 9]} />
            <Radar
              name="Your Score"
              dataKey="score"
              stroke="url(#scoreGradient)"
              fill="url(#scoreGradient)"
              fillOpacity={isChartHovered ? 0.8 : 0.6}
              strokeWidth={isChartHovered ? 3 : 1}
              activeDot={{ r: 8, fill: 'white', stroke: 'url(#scoreGradient)', strokeWidth: 2 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          </RadarChart>
            </ChartContainer>
            <div className="mt-4 text-center">
              <div className={`text-4xl font-bold ${getScoreColor(userData.currentBand)}`}>
                {userData.currentBand}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {getBandDescription(userData.currentBand)}
              </div>
            </div>
          </Card>
          
          {/* Module Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => (
              <Card key={module.name} className="text-center p-3">
                <CardContent className="p-0">
                  <div className="flex items-center justify-center mb-3">
                    <div className={`p-3 rounded-full ${module.circleBgColor}`}>
                    <module.icon className={`w-6 h-6 ${module.iconColor}`} />
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{module.name}</h3>
                  <div className={`text-2xl font-bold ${getScoreColor(module.score)} mb-2`}>
                    {module.score}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
