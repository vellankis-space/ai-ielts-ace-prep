
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Headphones, BookOpen, PenTool, Mic } from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
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
    { name: 'Listening', score: userData.moduleAverages.listening, icon: Headphones, iconColor: 'text-blue-400', circleBgColor: 'bg-blue-400/10' },
    { name: 'Reading', score: userData.moduleAverages.reading, icon: BookOpen, iconColor: 'text-emerald-400', circleBgColor: 'bg-emerald-400/10' },
    { name: 'Writing', score: userData.moduleAverages.writing, icon: PenTool, iconColor: 'text-purple-400', circleBgColor: 'bg-purple-400/10' },
    { name: 'Speaking', score: userData.moduleAverages.speaking, icon: Mic, iconColor: 'text-orange-400', circleBgColor: 'bg-orange-400/10' }
  ];

  const getBandDescription = (score: number) => {
    if (score >= 8.0) return 'Very Good User';
    if (score >= 7.0) return 'Good User';
    if (score >= 6.0) return 'Competent User';
    if (score >= 5.0) return 'Modest User';
    return 'Limited User';
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.0) return 'text-emerald-400';
    if (score >= 6.0) return 'text-blue-400';
    if (score >= 5.0) return 'text-orange-400';
    return 'text-red-400';
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
    <Card className="glass-card border-white/5">
      <CardHeader className="items-center pb-4">
        <CardTitle>Overall Progress Overview</CardTitle>
        <CardDescription>
          Your performance across different IELTS modules
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Score - Radar Chart and Band */}
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/5">
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
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 9]} tick={false} axisLine={false} />
                <Radar
                  name="Your Score"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="url(#scoreGradient)"
                  fillOpacity={isChartHovered ? 0.8 : 0.5}
                  strokeWidth={isChartHovered ? 2 : 1}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
            <div className="mt-4 text-center">
              <div className={`text-4xl font-bold ${getScoreColor(userData.currentBand)}`}>
                {userData.currentBand}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {getBandDescription(userData.currentBand)}
              </div>
            </div>
          </div>

          {/* Module Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => (
              <div key={module.name} className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                <div className={`p-3 rounded-xl mb-3 ${module.circleBgColor}`}>
                  <module.icon className={`w-6 h-6 ${module.iconColor}`} />
                </div>
                <h3 className="font-medium text-foreground mb-1">{module.name}</h3>
                <div className={`text-2xl font-bold ${getScoreColor(module.score)}`}>
                  {module.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
