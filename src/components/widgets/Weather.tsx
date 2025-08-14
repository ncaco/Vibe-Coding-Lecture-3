'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Droplets, Eye, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  description: string;
  icon: string;
  pressure: number;
  uvIndex: number;
}

interface WeatherProps {
  city?: string;
  autoLocation?: boolean;
  unit?: 'celsius' | 'fahrenheit';
  compact?: boolean;
  showDetails?: boolean;
  showForecast?: boolean;
  className?: string;
}

const Weather: React.FC<WeatherProps> = ({
  city = '서울',
  autoLocation = false,
  unit = 'celsius',
  compact = false,
  showDetails = true,
  showForecast = true,
  className = ''
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 더미 날씨 데이터 (실제 API 연동 시 제거)
  const mockWeatherData: WeatherData = {
    temperature: 22,
    feelsLike: 24,
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    description: '맑음',
    icon: 'sunny',
    pressure: 1013,
    uvIndex: 5
  };

  useEffect(() => {
    // 실제 날씨 API 연동 시 사용
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // 여기에 실제 날씨 API 호출 로직 추가
        // const response = await fetch(`/api/weather?city=${city}`);
        // const data = await response.json();
        
        // 임시로 더미 데이터 사용
        setTimeout(() => {
          setWeather(mockWeatherData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('날씨 정보를 가져올 수 없습니다.');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const getWeatherIcon = (icon: string, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16'
    };

    switch (icon) {
      case 'sunny':
        return <Sun className={cn(sizeClasses[size], "text-yellow-400 drop-shadow-lg")} />;
      case 'cloudy':
        return <Cloud className={cn(sizeClasses[size], "text-gray-300 drop-shadow-lg")} />;
      case 'rainy':
        return <CloudRain className={cn(sizeClasses[size], "text-blue-400 drop-shadow-lg")} />;
      case 'snowy':
        return <CloudSnow className={cn(sizeClasses[size], "text-blue-200 drop-shadow-lg")} />;
      default:
        return <Sun className={cn(sizeClasses[size], "text-yellow-400 drop-shadow-lg")} />;
    }
  };

  const getWeatherGradient = (icon: string) => {
    switch (icon) {
      case 'sunny':
        return 'from-yellow-400/20 via-orange-300/10 to-yellow-200/20';
      case 'cloudy':
        return 'from-gray-400/20 via-gray-300/10 to-gray-200/20';
      case 'rainy':
        return 'from-blue-400/20 via-blue-300/10 to-blue-200/20';
      case 'snowy':
        return 'from-blue-200/20 via-blue-100/10 to-white/20';
      default:
        return 'from-yellow-400/20 via-orange-300/10 to-yellow-200/20';
    }
  };

  if (loading) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6", className)}>
        <div className="flex items-center justify-center h-32">
          <div className="relative">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-blue-400 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="text-center text-blue-600 text-sm">날씨 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-pink-100 p-6", className)}>
        <div className="text-center text-red-600">
          <Cloud className="w-12 h-12 mx-auto mb-3 text-red-400" />
          <div className="text-sm">{error || '날씨 정보를 불러올 수 없습니다.'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-gradient-to-br", getWeatherGradient(weather.icon), className)}>
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="relative p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">{city}</h3>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{format(new Date(), 'HH:mm')}</span>
          </div>
        </div>
        
        {/* 메인 날씨 정보 */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {getWeatherIcon(weather.icon, 'lg')}
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-gray-800">
              {weather.temperature}°
              <span className="text-2xl text-gray-600">{unit === 'celsius' ? 'C' : 'F'}</span>
            </div>
            <div className="text-lg text-gray-700 font-medium">{weather.description}</div>
            <div className="text-sm text-gray-600">
              체감온도 {weather.feelsLike}°{unit === 'celsius' ? 'C' : 'F'}
            </div>
          </div>
        </div>
        
        {/* 상세 정보 */}
        {showDetails && !compact && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Droplets className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-medium">습도</div>
                    <div className="text-lg font-bold text-gray-800">{weather.humidity}%</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Wind className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-medium">바람</div>
                    <div className="text-lg font-bold text-gray-800">{weather.windSpeed} km/h</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Eye className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-medium">가시거리</div>
                    <div className="text-lg font-bold text-gray-800">{weather.visibility} km</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Thermometer className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-medium">기압</div>
                    <div className="text-lg font-bold text-gray-800">{weather.pressure} hPa</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 추가 정보 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">자외선 지수</div>
                <div className="text-lg font-bold text-gray-800">{weather.uvIndex}</div>
                <div className="text-xs text-gray-600">보통</div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center">
                <div className="text-xs text-gray-600 font-medium mb-1">바람 세기</div>
                <div className="text-lg font-bold text-gray-800">보통</div>
                <div className="text-xs text-gray-600">12 km/h</div>
              </div>
            </div>
          </div>
        )}
        
        {/* 마지막 업데이트 */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/40 backdrop-blur-sm rounded-full px-4 py-2">
            <Clock className="w-3 h-3 text-gray-600" />
            <span className="text-xs text-gray-700 font-medium">
              마지막 업데이트: {format(new Date(), 'HH:mm:ss')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
