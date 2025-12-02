import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  isChannel?: boolean;
  membersCount?: number;
  subscribersCount?: number;
  verified?: boolean;
  isPremium?: boolean;
}

interface ChatListProps {
  onSelectChat: (id: number) => void;
  selectedChatId: number | null;
  onShowProfile: () => void;
}

const mockChats: Chat[] = [
  { id: 1, name: 'Анна Иванова', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 3, online: true, avatar: 'АИ', isPremium: true },
  { id: 2, name: 'Команда разработки', lastMessage: 'Дмитрий: Отправил макеты', time: '13:45', unread: 5, online: true, avatar: '👥', isGroup: true, membersCount: 8 },
  { id: 3, name: 'Дмитрий Петров', lastMessage: 'Созвонимся вечером?', time: '13:15', unread: 0, online: true, avatar: 'ДП' },
  { id: 4, name: 'Семья ❤️', lastMessage: 'Мама: Не забудь позвонить', time: '12:20', unread: 2, online: true, avatar: '👨‍👩‍👧', isGroup: true, membersCount: 5 },
  { id: 5, name: 'Елена Смирнова', lastMessage: 'Спасибо за помощь!', time: '11:48', unread: 1, online: false, avatar: 'ЕС' },
  { id: 6, name: 'Игорь Козлов', lastMessage: 'Отправил файлы', time: 'Вчера', unread: 0, online: true, avatar: 'ИК' },
  { id: 7, name: 'Спортзал 💪', lastMessage: 'Алексей: Тренировка в 19:00', time: 'Вчера', unread: 0, online: true, avatar: '🏋️', isGroup: true, membersCount: 12 },
  { id: 8, name: 'Мария Васильева', lastMessage: 'До встречи!', time: 'Вчера', unread: 0, online: false, avatar: 'МВ' },
];

const mockChannels: Chat[] = [
  { id: 101, name: 'Tech News 📱', lastMessage: 'Новый релиз React 19', time: '15:20', unread: 2, online: true, avatar: '📡', isChannel: true, subscribersCount: 24500, verified: true, isPremium: true },
  { id: 102, name: 'Дизайн и UI/UX', lastMessage: '10 трендов 2025 года', time: '14:15', unread: 0, online: true, avatar: '🎨', isChannel: true, subscribersCount: 18200, verified: true },
  { id: 103, name: 'Криптовалюта Premium', lastMessage: '🔒 Эксклюзивный анализ рынка', time: '13:00', unread: 5, online: true, avatar: '💰', isChannel: true, subscribersCount: 8900, verified: true, isPremium: true },
  { id: 104, name: 'Мотивация каждый день', lastMessage: 'Вдохновляющая цитата дня', time: '10:00', unread: 1, online: true, avatar: '✨', isChannel: true, subscribersCount: 45600 },
  { id: 105, name: 'IT Вакансии', lastMessage: 'Senior Developer — удалёнка', time: 'Вчера', unread: 0, online: true, avatar: '💼', isChannel: true, subscribersCount: 12300, verified: true },
];

const ChatList = ({ onSelectChat, selectedChatId, onShowProfile }: ChatListProps) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'chats' | 'channels'>('chats');
  const [chats] = useState<Chat[]>(mockChats);
  const [channels] = useState<Chat[]>(mockChannels);

  const currentList = activeTab === 'chats' ? chats : channels;
  const filteredItems = currentList.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full md:w-96 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border glass-effect">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold gradient-purple bg-clip-text text-transparent">
            {activeTab === 'chats' ? 'Сообщения' : 'Каналы'}
          </h1>
          <button
            onClick={onShowProfile}
            className="p-2 hover:bg-muted rounded-full transition-all hover:scale-110"
          >
            <Icon name="User" size={24} />
          </button>
        </div>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'chats' | 'channels')} className="mb-4">
          <TabsList className="grid w-full grid-cols-2 glass-effect">
            <TabsTrigger value="chats" className="data-[state=active]:gradient-purple data-[state=active]:text-white">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Чаты
            </TabsTrigger>
            <TabsTrigger value="channels" className="data-[state=active]:gradient-blue data-[state=active]:text-white">
              <Icon name="Radio" size={16} className="mr-2" />
              Каналы
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative">
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder={activeTab === 'chats' ? 'Поиск контактов...' : 'Поиск каналов...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-muted border-0"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onSelectChat(item.id)}
            className={`p-4 cursor-pointer transition-all hover:bg-muted/50 border-b border-border/50 animate-slide-up ${
              selectedChatId === item.id ? 'bg-muted' : ''
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className={`w-12 h-12 border-2 ${item.isPremium ? 'border-yellow-500/50' : 'border-primary/20'}`}>
                  <AvatarFallback className={
                    item.isChannel 
                      ? 'bg-gradient-to-br from-accent to-primary text-white font-semibold text-xl' 
                      : item.isGroup 
                      ? 'bg-gradient-to-br from-secondary to-accent text-white font-semibold text-xl' 
                      : 'gradient-purple text-white font-semibold'
                  }>
                    {item.avatar}
                  </AvatarFallback>
                </Avatar>
                {item.online && !item.isGroup && !item.isChannel && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card animate-pulse-slow" />
                )}
                {item.isGroup && item.membersCount && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full gradient-blue text-white text-[10px] font-bold flex items-center justify-center border-2 border-card">
                    {item.membersCount}
                  </div>
                )}
                {item.isChannel && item.subscribersCount && (
                  <div className="absolute -bottom-1 -right-1 px-1.5 h-5 rounded-full gradient-blue text-white text-[9px] font-bold flex items-center justify-center border-2 border-card">
                    {item.subscribersCount > 1000 
                      ? `${Math.floor(item.subscribersCount / 1000)}k` 
                      : item.subscribersCount}
                  </div>
                )}
                {item.isPremium && (
                  <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-2 border-card">
                    <Icon name="Crown" size={10} className="text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    {item.verified && (
                      <Icon name="BadgeCheck" size={14} className="text-blue-500 flex-shrink-0" />
                    )}
                    {item.isGroup && !item.isChannel && (
                      <Icon name="Users" size={14} className="text-muted-foreground flex-shrink-0" />
                    )}
                    {item.isChannel && (
                      <Icon name="Radio" size={14} className="text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate pr-2">
                    {item.lastMessage}
                  </p>
                  {item.unread > 0 && (
                    <Badge className="gradient-purple text-white px-2 py-0.5 text-xs">
                      {item.unread}
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