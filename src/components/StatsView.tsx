import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface StatsViewProps {
  onClose: () => void;
}

const StatsView = ({ onClose }: StatsViewProps) => {
  const stats = {
    totalMessages: 3245,
    totalCalls: 127,
    totalVideoCalls: 48,
    totalTime: 1847,
    contacts: 156,
    groups: 8,
    channels: 12,
  };

  const activityData = [
    { day: 'ПН', messages: 45, calls: 3 },
    { day: 'ВТ', messages: 62, calls: 5 },
    { day: 'СР', messages: 38, calls: 2 },
    { day: 'ЧТ', messages: 71, calls: 7 },
    { day: 'ПТ', messages: 89, calls: 6 },
    { day: 'СБ', messages: 52, calls: 4 },
    { day: 'ВС', messages: 34, calls: 1 },
  ];

  const maxMessages = Math.max(...activityData.map(d => d.messages));

  return (
    <div className="flex-1 flex flex-col bg-background animate-fade-in overflow-y-auto">
      <div className="relative h-48 gradient-blue overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
        >
          <Icon name="X" size={24} />
        </Button>
        <div className="relative z-10 p-6 h-full flex items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Статистика</h1>
            <p className="text-white/80">Ваша активность за последние 7 дней</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
          <div className="glass-effect p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center">
                <Icon name="MessageSquare" size={18} className="text-white" />
              </div>
              <Icon name="TrendingUp" size={16} className="text-green-500" />
            </div>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">Сообщений</p>
          </div>

          <div className="glass-effect p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full gradient-blue flex items-center justify-center">
                <Icon name="Phone" size={18} className="text-white" />
              </div>
              <Icon name="TrendingUp" size={16} className="text-green-500" />
            </div>
            <div className="text-2xl font-bold">{stats.totalCalls}</div>
            <p className="text-xs text-muted-foreground">Звонков</p>
          </div>

          <div className="glass-effect p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Icon name="Video" size={18} className="text-white" />
              </div>
              <Icon name="TrendingUp" size={16} className="text-green-500" />
            </div>
            <div className="text-2xl font-bold">{stats.totalVideoCalls}</div>
            <p className="text-xs text-muted-foreground">Видеозвонков</p>
          </div>

          <div className="glass-effect p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Icon name="Clock" size={18} className="text-white" />
              </div>
              <Icon name="TrendingUp" size={16} className="text-green-500" />
            </div>
            <div className="text-2xl font-bold">{Math.floor(stats.totalTime / 60)}ч</div>
            <p className="text-xs text-muted-foreground">Время звонков</p>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-2xl animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="BarChart3" size={18} />
            Активность за неделю
          </h3>
          <div className="space-y-4">
            {activityData.map((data, index) => (
              <div key={data.day} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium w-8">{data.day}</span>
                  <div className="flex-1 mx-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full gradient-purple rounded-full transition-all"
                          style={{ width: `${(data.messages / maxMessages) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {data.messages} 💬
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full gradient-blue rounded-full transition-all"
                          style={{ width: `${(data.calls / 7) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {data.calls} 📞
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="glass-effect p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Контакты</h4>
              <Icon name="Users" size={18} className="text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{stats.contacts}</div>
            <Progress value={75} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">+12 за неделю</p>
          </div>

          <div className="glass-effect p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Группы</h4>
              <Icon name="Users" size={18} className="text-secondary" />
            </div>
            <div className="text-3xl font-bold mb-2">{stats.groups}</div>
            <Progress value={40} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">2 активные</p>
          </div>

          <div className="glass-effect p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Каналы</h4>
              <Icon name="Radio" size={18} className="text-accent" />
            </div>
            <div className="text-3xl font-bold mb-2">{stats.channels}</div>
            <Progress value={60} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">5 Premium</p>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-2xl animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Award" size={18} />
            Достижения
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Icon name="Star" size={20} className="text-white" />
              </div>
              <div>
                <div className="font-semibold">Активный собеседник</div>
                <p className="text-xs text-muted-foreground">1000+ сообщений</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <div>
                <div className="font-semibold">Быстрый ответ</div>
                <p className="text-xs text-muted-foreground">Средний ответ &lt; 1 мин</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center">
                <Icon name="Crown" size={20} className="text-white" />
              </div>
              <div>
                <div className="font-semibold">Premium пользователь</div>
                <p className="text-xs text-muted-foreground">Безлимитные звонки</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Icon name="Heart" size={20} className="text-white" />
              </div>
              <div>
                <div className="font-semibold">Верный друг</div>
                <p className="text-xs text-muted-foreground">100+ дней в приложении</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsView;
