'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import { Card } from '@/components/ui';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '@/lib/utils';

type ChartType = 'line' | 'bar' | 'pie' | 'area';

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface ChartProps {
  type?: ChartType;
  data?: ChartData[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  compact?: boolean;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({
  type = 'line',
  data = [],
  title = '차트',
  height = 300,
  showLegend = true,
  showGrid = true,
  compact = false,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 샘플 데이터 (실제 사용 시 props로 전달)
  const sampleData: ChartData[] = [
    { name: '1월', value: 400, sales: 2400, profit: 2400 },
    { name: '2월', value: 300, sales: 1398, profit: 2210 },
    { name: '3월', value: 200, sales: 9800, profit: 2290 },
    { name: '4월', value: 278, sales: 3908, profit: 2000 },
    { name: '5월', value: 189, sales: 4800, profit: 2181 },
    { name: '6월', value: 239, sales: 3800, profit: 2500 },
    { name: '7월', value: 349, sales: 4300, profit: 2100 },
  ];

  const chartData = data.length > 0 ? data : sampleData;

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

  const getChartIcon = (chartType: ChartType) => {
    switch (chartType) {
      case 'line':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'bar':
        return <BarChart3 className="w-5 h-5 text-green-500" />;
      case 'pie':
        return <PieChart className="w-5 h-5 text-purple-500" />;
      case 'area':
        return <Activity className="w-5 h-5 text-orange-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
    }
  };

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        <XAxis 
          dataKey="name" 
          stroke="#888888"
          fontSize={12}
        />
        <YAxis 
          stroke="#888888"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--background-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px'
          }}
        />
        {showLegend && <Legend />}
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#8884d8" 
          strokeWidth={2}
          dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2 }}
        />
        <Line 
          type="monotone" 
          dataKey="sales" 
          stroke="#82ca9d" 
          strokeWidth={2}
          dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#82ca9d', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={chartData}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        <XAxis 
          dataKey="name" 
          stroke="#888888"
          fontSize={12}
        />
        <YAxis 
          stroke="#888888"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--background-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px'
          }}
        />
        {showLegend && <Legend />}
        <Bar 
          dataKey="value" 
          fill="#8884d8" 
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="sales" 
          fill="#82ca9d" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent || 0 * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]}
              opacity={activeIndex === index ? 1 : 0.8}
            />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--background-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px'
          }}
        />
        {showLegend && <Legend />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );

  const renderAreaChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        <XAxis 
          dataKey="name" 
          stroke="#888888"
          fontSize={12}
        />
        <YAxis 
          stroke="#888888"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--background-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px'
          }}
        />
        {showLegend && <Legend />}
        <Area 
          type="monotone" 
          dataKey="value" 
          stackId="1"
          stroke="#8884d8" 
          fill="#8884d8" 
          fillOpacity={0.6}
        />
        <Area 
          type="monotone" 
          dataKey="sales" 
          stackId="1"
          stroke="#82ca9d" 
          fill="#82ca9d" 
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'pie':
        return renderPieChart();
      case 'area':
        return renderAreaChart();
      default:
        return renderLineChart();
    }
  };

  return (
    <div className={cn("p-4", className)}>
      <div className="flex items-center justify-center mb-4">
        <BarChart3 className="w-5 h-5 text-accent mr-2" />
        <h3 className="text-lg font-semibold text-text">{title}</h3>
      </div>
      
      <div className="text-center mb-2">
        <div className="text-sm text-text-secondary">{type} 차트</div>
      </div>
      
      <div className="mb-4">
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
      
      {/* 범례 */}
      {showLegend && !compact && (
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-xs text-text-secondary">sales</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-xs text-text-secondary">value</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
