'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Wifi, Battery, Thermometer, MemoryStick, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  battery: number;
  temperature: number;
}

interface SystemMonitorProps {
  className?: string;
  title?: string;
  compact?: boolean;
  showCharts?: boolean;
  showDetails?: boolean;
  refreshInterval?: number;
}

export default function SystemMonitor({ 
  className, 
  title = "시스템 모니터", 
  compact = false,
  showCharts = true,
  showDetails = true,
  refreshInterval = 2000
}: SystemMonitorProps) {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    battery: 0,
    temperature: 0
  });

  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 시뮬레이션된 시스템 통계 생성
  const generateMockStats = (): SystemStats => {
    return {
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      disk: Math.floor(Math.random() * 100),
      network: Math.floor(Math.random() * 100),
      battery: Math.floor(Math.random() * 100),
      temperature: 30 + Math.floor(Math.random() * 40)
    };
  };

  // 통계 업데이트
  useEffect(() => {
    const updateStats = () => {
      setStats(generateMockStats());
      setLastUpdate(new Date());
    };

    // 초기 로드
    updateStats();

    // 주기적 업데이트
    const interval = setInterval(updateStats, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // 온라인 상태 체크
  useEffect(() => {
    const checkOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);

    return () => {
      window.removeEventListener('online', checkOnlineStatus);
      window.removeEventListener('offline', checkOnlineStatus);
    };
  }, []);

  // 진행률 바 컴포넌트
  const ProgressBar = ({ value, color, icon: Icon, label }: { 
    value: number; 
    color: string; 
    icon: any; 
    label: string; 
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-text-secondary" />
          <span className="text-text-secondary">{label}</span>
        </div>
        <span className="font-medium text-text">{value}%</span>
      </div>
      <div className="w-full bg-background-secondary rounded-full h-2">
        <div 
          className={cn("h-2 rounded-full transition-all duration-500", color)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  // 미니 차트 컴포넌트
  const MiniChart = ({ data, color }: { data: number[]; color: string }) => (
    <div className="flex items-end space-x-1 h-8">
      {data.map((value, index) => (
        <div
          key={index}
          className={cn("w-1 rounded-sm transition-all duration-300", color)}
          style={{ height: `${(value / 100) * 32}px` }}
        />
      ))}
    </div>
  );

  // 컴팩트 모드 렌더링
  if (compact) {
    return (
      <div className={cn("h-full p-4 bg-background border border-border rounded-lg", className)}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-text text-sm">{title}</h3>
          <div className="flex items-center space-x-1">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isOnline ? "bg-green-500" : "bg-red-500"
            )} />
            <span className="text-xs text-text-secondary">
              {isOnline ? "온라인" : "오프라인"}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-accent">{stats.cpu}%</div>
            <div className="text-xs text-text-secondary">CPU</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-500">{stats.memory}%</div>
            <div className="text-xs text-text-secondary">메모리</div>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-text-secondary text-center">
          {lastUpdate.toLocaleTimeString()}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("h-full flex flex-col bg-background border border-border rounded-lg", className)}>
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-text">{title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isOnline ? "bg-green-500" : "bg-red-500"
          )} />
          <span className="text-xs text-text-secondary">
            {isOnline ? "온라인" : "오프라인"}
          </span>
          <span className="text-xs text-text-secondary">
            {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* 주요 지표 */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-background-secondary rounded-lg">
            <Cpu className="w-8 h-8 mx-auto mb-2 text-accent" />
            <div className="text-2xl font-bold text-accent">{stats.cpu}%</div>
            <div className="text-sm text-text-secondary">CPU 사용률</div>
          </div>
          <div className="text-center p-3 bg-background-secondary rounded-lg">
            <MemoryStick className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-blue-500">{stats.memory}%</div>
            <div className="text-sm text-text-secondary">메모리 사용률</div>
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="space-y-4">
          <ProgressBar 
            value={stats.cpu} 
            color="bg-accent" 
            icon={Cpu} 
            label="CPU" 
          />
          <ProgressBar 
            value={stats.memory} 
            color="bg-blue-500" 
            icon={MemoryStick} 
            label="메모리" 
          />
          <ProgressBar 
            value={stats.disk} 
            color="bg-green-500" 
            icon={HardDrive} 
            label="디스크" 
          />
          <ProgressBar 
            value={stats.network} 
            color="bg-purple-500" 
            icon={Wifi} 
            label="네트워크" 
          />
        </div>

        {/* 추가 정보 */}
        {showDetails && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Battery className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">배터리:</span>
              <span className="text-sm font-medium text-text">{stats.battery}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">온도:</span>
              <span className="text-sm font-medium text-text">{stats.temperature}°C</span>
            </div>
          </div>
        )}
      </div>

      {/* 미니 차트 */}
      {showCharts && (
        <div className="p-4 border-t border-border">
          <h4 className="text-sm font-medium text-text mb-3">사용률 추이</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-text-secondary mb-2">CPU</div>
              <MiniChart 
                data={[stats.cpu, Math.max(0, stats.cpu - 10), Math.max(0, stats.cpu - 20)]} 
                color="bg-accent" 
              />
            </div>
            <div>
              <div className="text-xs text-text-secondary mb-2">메모리</div>
              <MiniChart 
                data={[stats.memory, Math.max(0, stats.memory - 15), Math.max(0, stats.memory - 25)]} 
                color="bg-blue-500" 
              />
            </div>
          </div>
        </div>
      )}

      {/* 상태 표시 */}
      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>마지막 업데이트: {lastUpdate.toLocaleTimeString()}</span>
          <div className="flex items-center space-x-1">
            <Gauge className="w-3 h-3" />
            <span>실시간 모니터링</span>
          </div>
        </div>
      </div>
    </div>
  );
}
