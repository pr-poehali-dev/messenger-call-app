import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VideoCallScreenProps {
  userName: string;
  onEndCall: () => void;
}

const VideoCallScreen = ({ userName, onEndCall }: VideoCallScreenProps) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col relative bg-gradient-to-br from-background via-primary/10 to-secondary/10 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 p-4 flex items-center justify-between glass-effect">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary/30">
            <AvatarFallback className="gradient-purple text-white font-semibold">
              АИ
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{userName}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Видеозвонок</span>
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs font-mono gradient-purple bg-clip-text text-transparent">
                {formatDuration(callDuration)}
              </span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-muted/50 transition-all hover:scale-110"
        >
          <Icon name="Maximize2" size={18} />
        </Button>
      </div>

      <div className="flex-1 relative z-10 p-6">
        <div className="h-full rounded-3xl overflow-hidden relative glass-effect border-2 border-primary/20 animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            {!isCameraOn ? (
              <div className="text-center space-y-4">
                <Avatar className="w-40 h-40 mx-auto border-4 border-primary/30">
                  <AvatarFallback className="gradient-purple text-white text-5xl font-bold">
                    АИ
                  </AvatarFallback>
                </Avatar>
                <p className="text-lg text-muted-foreground">Камера выключена</p>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 opacity-50">
                    <Icon name="Video" size={80} className="mx-auto text-primary animate-pulse-slow" />
                    <p className="text-xl font-semibold">Видеопоток {userName}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute top-4 right-4 w-40 h-52 rounded-2xl overflow-hidden glass-effect border-2 border-white/20 animate-slide-up shadow-2xl">
            {isCameraOn ? (
              <div className="relative w-full h-full bg-gradient-to-br from-accent/30 to-secondary/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2 opacity-60">
                    <Icon name="User" size={40} className="mx-auto text-white" />
                    <p className="text-xs text-white">Ваша камера</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                <Icon name="VideoOff" size={32} className="text-muted-foreground" />
              </div>
            )}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
              <span className="text-[10px] text-white font-medium">Вы</span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 glass-effect px-4 py-2 rounded-full flex items-center gap-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <Icon name="Signal" size={16} className="text-green-500" />
            <span className="text-xs text-muted-foreground">HD качество</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-4">
        <div className="flex items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <Button
            onClick={() => setIsMuted(!isMuted)}
            size="lg"
            variant={isMuted ? 'default' : 'secondary'}
            className={`w-14 h-14 rounded-full transition-all hover:scale-110 ${
              isMuted ? 'bg-destructive hover:bg-destructive/90' : 'glass-effect'
            }`}
          >
            <Icon name={isMuted ? 'MicOff' : 'Mic'} size={22} />
          </Button>

          <Button
            onClick={() => setIsCameraOn(!isCameraOn)}
            size="lg"
            variant={isCameraOn ? 'secondary' : 'default'}
            className={`w-14 h-14 rounded-full transition-all hover:scale-110 ${
              !isCameraOn ? 'bg-destructive hover:bg-destructive/90' : 'glass-effect'
            }`}
          >
            <Icon name={isCameraOn ? 'Video' : 'VideoOff'} size={22} />
          </Button>

          <Button
            onClick={onEndCall}
            size="lg"
            className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90 transition-all hover:scale-110 shadow-lg shadow-destructive/50"
          >
            <Icon name="PhoneOff" size={26} />
          </Button>

          <Button
            onClick={() => setIsSpeaker(!isSpeaker)}
            size="lg"
            variant={isSpeaker ? 'default' : 'secondary'}
            className={`w-14 h-14 rounded-full transition-all hover:scale-110 ${
              isSpeaker ? 'gradient-blue' : 'glass-effect'
            }`}
          >
            <Icon name={isSpeaker ? 'Volume2' : 'Volume'} size={22} />
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-14 h-14 rounded-full glass-effect transition-all hover:scale-110"
          >
            <Icon name="MoreVertical" size={22} />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm animate-slide-up" style={{ animationDelay: '300ms' }}>
          <Button variant="ghost" size="sm" className="hover:scale-110 transition-all glass-effect">
            <Icon name="MessageSquare" size={16} className="mr-2" />
            Чат
          </Button>
          <Button variant="ghost" size="sm" className="hover:scale-110 transition-all glass-effect">
            <Icon name="Users" size={16} className="mr-2" />
            Участники
          </Button>
          <Button variant="ghost" size="sm" className="hover:scale-110 transition-all glass-effect">
            <Icon name="Share2" size={16} className="mr-2" />
            Демонстрация
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallScreen;
