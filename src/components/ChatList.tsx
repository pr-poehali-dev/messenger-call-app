import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
  isGroup?: boolean;
  membersCount?: number;
}

interface ChatListProps {
  onSelectChat: (id: number) => void;
  selectedChatId: number | null;
  onShowProfile: () => void;
}

const mockChats: Chat[] = [
  { id: 1, name: 'Анна Иванова', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 3, online: true, avatar: 'АИ' },
  { id: 2, name: 'Команда разработки', lastMessage: 'Дмитрий: Отправил макеты', time: '13:45', unread: 5, online: true, avatar: '👥', isGroup: true, membersCount: 8 },
  { id: 3, name: 'Дмитрий Петров', lastMessage: 'Созвонимся вечером?', time: '13:15', unread: 0, online: true, avatar: 'ДП' },
  { id: 4, name: 'Семья ❤️', lastMessage: 'Мама: Не забудь позвонить', time: '12:20', unread: 2, online: true, avatar: '👨‍👩‍👧', isGroup: true, membersCount: 5 },
  { id: 5, name: 'Елена Смирнова', lastMessage: 'Спасибо за помощь!', time: '11:48', unread: 1, online: false, avatar: 'ЕС' },
  { id: 6, name: 'Игорь Козлов', lastMessage: 'Отправил файлы', time: 'Вчера', unread: 0, online: true, avatar: 'ИК' },
  { id: 7, name: 'Спортзал 💪', lastMessage: 'Алексей: Тренировка в 19:00', time: 'Вчера', unread: 0, online: true, avatar: '🏋️', isGroup: true, membersCount: 12 },
  { id: 8, name: 'Мария Васильева', lastMessage: 'До встречи!', time: 'Вчера', unread: 0, online: false, avatar: 'МВ' },
];

const ChatList = ({ onSelectChat, selectedChatId, onShowProfile }: ChatListProps) => {
  const [search, setSearch] = useState('');
  const [chats] = useState<Chat[]>(mockChats);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full md:w-96 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border glass-effect">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold gradient-purple bg-clip-text text-transparent">
            Сообщения
          </h1>
          <button
            onClick={onShowProfile}
            className="p-2 hover:bg-muted rounded-full transition-all hover:scale-110"
          >
            <Icon name="User" size={24} />
          </button>
        </div>
        <div className="relative">
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Поиск контактов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-muted border-0"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat, index) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-4 cursor-pointer transition-all hover:bg-muted/50 border-b border-border/50 animate-slide-up ${
              selectedChatId === chat.id ? 'bg-muted' : ''
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarFallback className={chat.isGroup ? 'bg-gradient-to-br from-secondary to-accent text-white font-semibold text-xl' : 'gradient-purple text-white font-semibold'}>
                    {chat.avatar}
                  </AvatarFallback>
                </Avatar>
                {chat.online && !chat.isGroup && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card animate-pulse-slow" />
                )}
                {chat.isGroup && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full gradient-blue text-white text-[10px] font-bold flex items-center justify-center border-2 border-card">
                    {chat.membersCount}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    {chat.isGroup && (
                      <Icon name="Users" size={14} className="text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate pr-2">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <Badge className="gradient-purple text-white px-2 py-0.5 text-xs">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;