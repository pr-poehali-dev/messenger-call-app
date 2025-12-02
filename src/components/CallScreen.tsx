import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CallScreenProps {
  userName: string;
  onEndCall: () => void;
}

const CallScreen = ({ userName, onEndCall }: CallScreenProps) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
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
    <div className="flex-1 flex flex-col items-center justify-between p-8 bg-gradient-to-br from-background via-primary/5 to-secondary/5 animate-fade-in">
      <div className="text-center space-y-6 flex-1 flex flex-col items-center justify-center">
        <div className="relative animate-scale-in">
          <div className="absolute inset-0 gradient-purple rounded-full opacity-20 animate-pulse-slow blur-2xl" />
          <Avatar className="w-40 h-40 border-4 border-primary/30 relative z-10">
            <AvatarFallback className="gradient-purple text-white text-5xl font-bold">
              АИ
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full glass-effect">
            <span className="text-xs font-medium text-green-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              онлайн
            </span>
          </div>
        </div>

        <div className="space-y-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h1 className="text-3xl font-bold">{userName}</h1>
          <p className="text-lg text-muted-foreground">Голосовой звонок</p>
          <div className="text-2xl font-mono gradient-purple bg-clip-text text-transparent">
            {formatDuration(callDuration)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="glass-effect rounded-xl p-4 text-center">
            <Icon name="Signal" size={24} className="mx-auto mb-2 text-green-500" />
            <p className="text-xs text-muted-foreground">Отличное</p>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center">
            <Icon name="Gauge" size={24} className="mx-auto mb-2 text-blue-500" />
            <p className="text-xs text-muted-foreground">Качество HD</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => setIsMuted(!isMuted)}
            size="lg"
            variant={isMuted ? 'default' : 'secondary'}
            className={`w-16 h-16 rounded-full transition-all hover:scale-110 ${
              isMuted ? 'bg-destructive hover:bg-destructive/90' : 'glass-effect'
            }`}
          >
            <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} />
          </Button>

          <Button
            onClick={onEndCall}
            size="lg"
            className="w-20 h-20 rounded-full bg-destructive hover:bg-destructive/90 transition-all hover:scale-110"
          >
            <Icon name="PhoneOff" size={28} />
          </Button>

          <Button
            onClick={() => setIsSpeaker(!isSpeaker)}
            size="lg"
            variant={isSpeaker ? 'default' : 'secondary'}
            className={`w-16 h-16 rounded-full transition-all hover:scale-110 ${
              isSpeaker ? 'gradient-blue' : 'glass-effect'
            }`}
          >
            <Icon name={isSpeaker ? 'Volume2' : 'Volume'} size={24} />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" className="hover:scale-110 transition-all">
            <Icon name="MessageSquare" size={18} className="mr-2" />
            Сообщение
          </Button>
          <Button variant="ghost" size="sm" className="hover:scale-110 transition-all">
            <Icon name="UserPlus" size={18} className="mr-2" />
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallScreen;
