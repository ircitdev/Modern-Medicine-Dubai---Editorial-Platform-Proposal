import React, { useState, useRef, useEffect } from 'react';
import { PodcastEpisode } from '../types';
import { PODCAST_SERIES } from '../constants';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Download, 
  Headphones, 
  Sparkles, 
  Check, 
  Copy, 
  Share2, 
  ExternalLink,
  Radio,
  ListMusic,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AudioPodcastPlayerProps {
  initialEpisodeId?: string;
  variant?: 'studio' | 'compact' | 'mini';
  allowEpisodeSwitching?: boolean;
  titleOverride?: string;
  onShowToast?: (msg: string) => void;
}

export const AudioPodcastPlayer: React.FC<AudioPodcastPlayerProps> = ({
  initialEpisodeId = 'podcast-market-risks',
  variant = 'studio',
  allowEpisodeSwitching = true,
  titleOverride,
  onShowToast,
}) => {
  const [currentEpisodeId, setCurrentEpisodeId] = useState<string>(initialEpisodeId);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentEpisode = PODCAST_SERIES.find((ep) => ep.id === currentEpisodeId) || PODCAST_SERIES[0];

  // When episode changes, update audio src
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setIsLoaded(false);
      audioRef.current.load();
    }
  }, [currentEpisodeId]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio play prevented', e);
      });
    }
  };

  // Time format MM:SS
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoaded(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentEpisode.audioUrl);
    setCopiedLink(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // =========================================================================
  // MINI / COMPACT VARIANT (for embedding in CompetitorsView / B2B Proposal)
  // =========================================================================
  if (variant === 'compact' || variant === 'mini') {
    return (
      <div className="bg-[#FAF9F5] p-4 sm:p-5 rounded-2xl border border-[#E2DFD7] space-y-3 shadow-xs">
        <audio
          ref={audioRef}
          src={currentEpisode.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#222321] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Headphones className="w-4 h-4 text-[#7FA9BC]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold text-[#7FA9BC] uppercase tracking-wider block truncate">
                {currentEpisode.category} • {currentEpisode.durationLabel}
              </span>
              <h4 className="font-serif font-bold text-sm text-[#222321] truncate">
                {titleOverride || currentEpisode.title}
              </h4>
            </div>
          </div>

          <a
            href={currentEpisode.audioUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="p-1.5 rounded-lg bg-white border border-[#E2DFD7] hover:bg-[#EFEDE8] text-[#747775] hover:text-[#222321] transition-colors shrink-0"
            title="Скачать аудиозапись"
          >
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Small Controls Row */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-[#222321] hover:bg-black text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            )}
          </button>

          {/* Scrub bar */}
          <div className="flex-1 space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-[#E2DFD7] rounded-lg appearance-none cursor-pointer accent-[#222321]"
            />
            <div className="flex justify-between text-[10px] text-[#747775] font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{duration ? formatTime(duration) : currentEpisode.durationLabel}</span>
            </div>
          </div>

          {/* Speed */}
          <button
            onClick={() => handleSpeedChange(playbackSpeed === 1.0 ? 1.5 : playbackSpeed === 1.5 ? 2.0 : 1.0)}
            className="px-2 py-0.5 rounded-md bg-white border border-[#E2DFD7] text-[10px] font-mono font-bold text-[#222321] hover:bg-[#EFEDE8] transition-colors shrink-0"
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // FULL STUDIO VARIANT (Multi-Episode Player)
  // =========================================================================
  return (
    <div className="bg-white p-6 sm:p-9 rounded-3xl border border-[#E2DFD7] shadow-sm space-y-8">
      
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentEpisode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#F1EDE6] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEDE8] text-[#7FA9BC] text-[10px] font-bold uppercase tracking-widest mb-2">
            <Radio className="w-3.5 h-3.5 text-[#7FA9BC] animate-pulse" />
            <span>Официальная серия подкастов Modern Medicine</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#222321] font-bold">
            Аудио-экспертиза & Стратегический разбор рынка
          </h3>

          <p className="text-xs sm:text-sm text-[#747775] mt-1 max-w-2xl leading-relaxed">
            4 ключевых эпизода об экономике частной медицины в ОАЭ, регуляторике DHA, партнерстве с отелем Fairmont Dubai и архитектуре цифровой клиники нового поколения.
          </p>
        </div>

        {/* Global Share / Download Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-full border border-[#E2DFD7] bg-[#F7F6F3] hover:bg-white text-[#222321] text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Скопировать прямую ссылку на аудиофайл"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Ссылка скопирована!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#7FA9BC]" />
                <span>Ссылка на .m4a</span>
              </>
            )}
          </button>

          <a
            href={currentEpisode.audioUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="px-3.5 py-2 rounded-full bg-[#222321] hover:bg-black text-white text-xs font-medium transition-all flex items-center gap-1.5 shadow-2xs"
            title="Скачать файл подкаста .m4a"
          >
            <Download className="w-3.5 h-3.5 text-[#7FA9BC]" />
            <span>Скачать</span>
          </a>
        </div>
      </div>

      {/* Episode Tabs Switcher */}
      {allowEpisodeSwitching && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#747775]">
            <span className="font-semibold text-[#222321] flex items-center gap-1.5">
              <ListMusic className="w-4 h-4 text-[#7FA9BC]" />
              Выберите эпизод для прослушивания (4 темы):
            </span>
            <span className="text-[11px] font-mono">Всего 34+ минуты аналитики</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PODCAST_SERIES.map((ep, idx) => {
              const isSelected = ep.id === currentEpisodeId;
              return (
                <button
                  key={ep.id}
                  onClick={() => setCurrentEpisodeId(ep.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#222321] text-white border-[#222321] shadow-md scale-[1.01]'
                      : 'bg-[#FAF9F5] text-[#222321] border-[#E2DFD7] hover:bg-white hover:border-[#B49E87]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                      <span className={isSelected ? 'text-[#7FA9BC]' : 'text-[#7FA9BC]'}>
                        ЭПИЗОД 0{idx + 1}
                      </span>
                      <span className={isSelected ? 'text-white/70' : 'text-[#747775]'}>
                        {ep.durationLabel}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-xs line-clamp-2">
                      {ep.title}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] flex items-center justify-between">
                    <span className={isSelected ? 'text-white/60' : 'text-[#747775]'}>
                      {ep.contextTag}
                    </span>
                    {isSelected && isPlaying && (
                      <span className="flex items-center gap-1 text-[#7FA9BC] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7FA9BC] animate-ping" />
                        Play
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Studio Player Box */}
      <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-3xl border border-[#E2DFD7] space-y-6">
        
        {/* Episode Info & Category Badge */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold bg-[#7FA9BC]/20 text-[#222321] px-2.5 py-0.5 rounded-full">
              {currentEpisode.category}
            </span>
            <span className="text-[10px] font-mono bg-white border border-[#E2DFD7] text-[#747775] px-2.5 py-0.5 rounded-full">
              Локация: {currentEpisode.contextTag}
            </span>
            <span className="text-[10px] font-mono text-[#747775] ml-auto">
              Хронометраж: {currentEpisode.durationLabel}
            </span>
          </div>

          <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#222321]">
            {currentEpisode.title}
          </h4>

          <p className="text-xs text-[#747775] leading-relaxed">
            {currentEpisode.description}
          </p>
        </div>

        {/* Animated Waveform Equalizer */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-16 sm:h-20 px-4 bg-white/70 rounded-2xl border border-[#E2DFD7]/80">
          {[35, 60, 90, 45, 80, 100, 55, 75, 40, 85, 95, 65, 30, 70, 90, 50, 80, 60, 40, 75, 95, 50, 85, 40, 60].map((h, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              style={{
                height: isPlaying ? `${Math.max(25, (h * (Math.sin(i + currentTime) + 1.2)) / 2)}%` : `${h * 0.35}%`,
                backgroundColor: i % 3 === 0 ? '#222321' : i % 2 === 0 ? '#7FA9BC' : '#B49E87',
              }}
            />
          ))}
        </div>

        {/* Player Controls & Scrubber */}
        <div className="space-y-4">
          
          {/* Scrub Range Bar */}
          <div className="space-y-1.5">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-[#E2DFD7] rounded-lg appearance-none cursor-pointer accent-[#222321]"
            />
            <div className="flex items-center justify-between text-xs text-[#747775] font-mono">
              <span className="font-medium text-[#222321]">{formatTime(currentTime)}</span>
              <span>{duration ? formatTime(duration) : currentEpisode.durationLabel}</span>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            
            {/* Play / Restart Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-14 h-14 bg-[#222321] hover:bg-black text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer group"
                title={isPlaying ? 'Пауза' : 'Воспроизвести'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white fill-white ml-0.5 group-hover:scale-105 transition-transform" />
                )}
              </button>

              <button
                onClick={handleRestart}
                className="p-3 rounded-full hover:bg-white text-[#747775] hover:text-[#222321] transition-colors border border-transparent hover:border-[#E2DFD7] cursor-pointer"
                title="Слушать сначала"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleToggleMute}
                className="p-3 rounded-full hover:bg-white text-[#747775] hover:text-[#222321] transition-colors border border-transparent hover:border-[#E2DFD7] cursor-pointer"
                title={isMuted ? 'Включить звук' : 'Выключить звук'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center bg-white rounded-full border border-[#E2DFD7] p-1 text-xs">
              {[1.0, 1.25, 1.5, 2.0].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-3 py-1 rounded-full font-medium font-mono transition-all cursor-pointer ${
                    playbackSpeed === speed
                      ? 'bg-[#222321] text-white shadow-xs'
                      : 'text-[#747775] hover:text-[#222321]'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Key Takeaways & Topics Covered */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2DFD7] space-y-2.5">
          <span className="text-[10px] font-mono text-[#7FA9BC] uppercase font-bold tracking-wider block">
            Ключевые темы и инсайты данного выпуска:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {currentEpisode.keyTopics.map((topic, i) => (
              <div key={i} className="flex items-start gap-2 text-[#222321]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FA9BC] mt-1.5 shrink-0" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
