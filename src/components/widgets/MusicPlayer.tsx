'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  liked: boolean;
}

interface MusicPlayerProps {
  title?: string;
  songs?: Song[];
  compact?: boolean;
  showPlaylist?: boolean;
  showControls?: boolean;
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title = '음악 플레이어',
  songs = [],
  compact = false,
  showPlaylist = true,
  showControls = true,
  className = ''
}) => {
  const [currentSong, setCurrentSong] = useState<Song>({
    id: 1,
    title: '좋은 날',
    artist: '아이유',
    album: 'Real',
    duration: 235,
    cover: '🎵',
    liked: true
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const [playlist] = useState<Song[]>([
    {
      id: 1,
      title: '좋은 날',
      artist: '아이유',
      album: 'Real',
      duration: 235,
      cover: '🎵',
      liked: true
    },
    {
      id: 2,
      title: 'Dynamite',
      artist: 'BTS',
      album: 'Dynamite',
      duration: 199,
      cover: '🎵',
      liked: false
    },
    {
      id: 3,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 200,
      cover: '🎵',
      liked: true
    }
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleShuffle = () => setShuffle(!shuffle);
  const toggleRepeat = () => setRepeat(!repeat);
  const toggleLike = () => setCurrentSong(prev => ({ ...prev, liked: !prev.liked }));

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
  };

  if (compact) {
    return (
      <div className={cn("p-3", className)}>
        <div className="flex items-center justify-center mb-3">
          <span className="text-2xl mr-2">🎵</span>
          <h3 className="text-sm font-semibold text-text">{title}</h3>
        </div>
        
        <div className="text-center mb-3">
          <div className="text-lg font-bold text-text truncate">{currentSong.title}</div>
          <div className="text-xs text-text-secondary">{currentSong.artist}</div>
        </div>
        
        <div className="flex justify-center space-x-2">
          <button
            onClick={togglePlay}
            className="p-2 bg-accent text-white rounded-full hover:bg-accent-hover transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("p-4", className)}>
      <div className="flex items-center justify-center mb-4">
        <span className="text-3xl mr-2">🎵</span>
        <h3 className="text-lg font-semibold text-text">{title}</h3>
      </div>
      
      {/* 현재 재생 중인 곡 */}
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-text mb-2">{currentSong.title}</div>
        <div className="text-sm text-text-secondary mb-1">{currentSong.artist}</div>
        <div className="text-xs text-text-secondary">{currentSong.album}</div>
      </div>
      
      {/* 재생 컨트롤 */}
      {showControls && (
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={toggleShuffle}
            className={cn("p-2 rounded-lg transition-colors", 
              shuffle ? "bg-accent text-white" : "hover:bg-background-secondary"
            )}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          
          <button className="p-2 hover:bg-background-secondary rounded-lg transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-3 bg-accent text-white rounded-full hover:bg-accent-hover transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          
          <button className="p-2 hover:bg-background-secondary rounded-lg transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
          
          <button
            onClick={toggleRepeat}
            className={cn("p-2 rounded-lg transition-colors", 
              repeat ? "bg-accent text-white" : "hover:bg-background-secondary"
            )}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* 진행 바 */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentSong.duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={currentSong.duration}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      
      {/* 볼륨 및 좋아요 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button onClick={toggleMute} className="p-1 hover:bg-background-secondary rounded">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        <button
          onClick={toggleLike}
          className={cn("p-2 rounded-lg transition-colors", 
            currentSong.liked ? "text-red-500 hover:bg-red-50" : "hover:bg-background-secondary"
          )}
        >
          <Heart className={cn("w-4 h-4", currentSong.liked && "fill-current")} />
        </button>
      </div>
      
      {/* 플레이리스트 */}
      {showPlaylist && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-text-secondary mb-2">플레이리스트</div>
          {playlist.map((song) => (
            <div
              key={song.id}
              className={cn("flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
                currentSong.id === song.id ? "bg-accent text-white" : "hover:bg-background-secondary"
              )}
              onClick={() => setCurrentSong(song)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{song.cover}</span>
                <div>
                  <div className="text-sm font-medium">{song.title}</div>
                  <div className="text-xs opacity-80">{song.artist}</div>
                </div>
              </div>
              <div className="text-xs">{formatTime(song.duration)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
