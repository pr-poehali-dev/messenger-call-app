import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
}

interface ChatWindowProps {
  chatId: number;
  onStartCall: () => void;
  onStartVideoCall: () => void;
  onBack: () => void;
}

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', time: '14:30', isMine: false },
  { id: 2, text: 'Отлично! А у тебя?', time: '14:31', isMine: true },
  { id: 3, text: 'Тоже хорошо! Хочу обсудить проект', time: '14:32', isMine: false },
  { id: 4, text: 'Конечно, давай созвонимся?', time: '14:32', isMine: true },
];

const ChatWindow = ({ chatId, onStartCall, onStartVideoCall, onBack }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isMine: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background animate-fade-in">
      <div className="p-4 border-b border-border glass-effect flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <Avatar className="w-10 h-10 border-2 border-primary/20">
            <AvatarFallback className="gradient-purple text-white font-semibold">
              АИ
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Анна Иванова</h2>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
              онлайн
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onStartVideoCall}
            size="icon"
            className="gradient-purple hover:opacity-90 transition-all hover:scale-110"
          >
            <Icon name="Video" size={20} />
          </Button>
          <Button
            onClick={onStartCall}
            size="icon"
            className="gradient-blue hover:opacity-90 transition-all hover:scale-110"
          >
            <Icon name="Phone" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted transition-all hover:scale-110"
          >
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} animate-slide-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                message.isMine
                  ? 'gradient-purple text-white rounded-br-sm'
                  : 'bg-muted text-foreground rounded-bl-sm'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span
                className={`text-xs mt-1 block ${
                  message.isMine ? 'text-white/70' : 'text-muted-foreground'
                }`}
              >
                {message.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border glass-effect">
        <div className="flex items-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted transition-all hover:scale-110"
          >
            <Icon name="Paperclip" size={20} />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Написать сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-muted border-0 pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 hover:scale-110"
            >
              <Icon name="Smile" size={20} />
            </Button>
          </div>
          <Button
            onClick={handleSend}
            size="icon"
            className="gradient-purple hover:opacity-90 transition-all hover:scale-110"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;