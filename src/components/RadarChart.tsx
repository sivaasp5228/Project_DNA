import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import type { EvaluationMetrics } from '../types';

interface RadarChartProps {
  metrics: EvaluationMetrics;
}

export const RadarChart: React.FC<RadarChartProps> = ({ metrics }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = [
    { subject: 'Clarity', score: metrics.problemClarity },
    { subject: 'Innovation', score: metrics.innovation },
    { subject: 'Tech Quality', score: metrics.technicalQuality },
    { subject: 'Docs', score: metrics.documentation },
    { subject: 'Scalability', score: metrics.scalability },
    { subject: 'Impact', score: metrics.impact },
    { subject: 'Presentation', score: metrics.presentation },
    { subject: 'Readiness', score: metrics.industryReadiness }
  ];

  if (!isMounted) {
    return <div className="h-[280px] w-full bg-zinc-950/20 border border-zinc-850 rounded-xl flex items-center justify-center text-xs text-zinc-500">Loading charts...</div>;
  }

  return (
    <div className="w-full h-[280px] flex items-center justify-center select-none">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#27272a" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 500 }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: '#52525b', fontSize: 8 }}
            axisLine={false}
          />
          <Radar
            name="Project Score"
            dataKey="score"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.25}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};
