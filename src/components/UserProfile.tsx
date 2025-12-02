import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  onClose: () => void;
  onShowPremium: () => void;
  onShowStats?: () => void;
  onShowPrivacy?: () => void;
}

const UserProfile = ({ onClose, onShowPremium, onShowStats, onShowPrivacy }: UserProfileProps) => {
  return (
    <div className="flex-1 flex flex-col bg-background animate-fade-in">
      <div className="relative h-48 gradient-purple overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
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
      </div>

      <div className="flex-1 p-6 -mt-20">
        <div className="text-center mb-8 animate-scale-in">
          <Avatar className="w-32 h-32 mx-auto border-4 border-background shadow-2xl">
            <AvatarFallback className="gradient-blue text-white text-4xl font-bold">
              МП
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold mt-4">Мой Профиль</h1>
          <p className="text-muted-foreground mt-1">@my_profile</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Badge className="gradient-purple text-white">
              <Icon name="CheckCircle" size={14} className="mr-1" />
              Онлайн
            </Badge>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="glass-effect rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center">
                <Icon name="Phone" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Телефон</p>
                <p className="font-semibold">+7 (999) 123-45-67</p>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center">
                <Icon name="Mail" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">myprofile@example.com</p>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Icon name="MapPin" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Местоположение</p>
                <p className="font-semibold">Москва, Россия</p>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Статус</h3>
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-all">
                <Icon name="Edit2" size={16} />
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">
              Доступен для звонков и сообщений 🚀
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Контакты из телефона</h3>
            <div className="space-y-3">
              {[
                { name: 'Анна Иванова', phone: '+7 999 111-11-11', synced: true },
                { name: 'Дмитрий Петров', phone: '+7 999 222-22-22', synced: true },
                { name: 'Елена Смирнова', phone: '+7 999 333-33-33', synced: false },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={contact.synced ? 'gradient-purple text-white text-xs' : 'bg-muted text-xs'}>
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.phone}</p>
                    </div>
                  </div>
                  {contact.synced ? (
                    <Badge className="gradient-blue text-white text-xs">
                      <Icon name="Check" size={12} className="mr-1" />
                      Синхронизирован
                    </Badge>
                  ) : (
                    <Button variant="outline" size="sm" className="text-xs">
                      Синхронизировать
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 hover:scale-105 transition-all">
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Синхронизировать все контакты
            </Button>
          </div>

          <Button 
            onClick={onShowPremium}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:opacity-90 transition-all hover:scale-105 text-white mb-4"
          >
            <Icon name="Crown" size={18} className="mr-2" />
            Получить Premium
          </Button>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button 
              onClick={onShowStats}
              variant="outline" 
              className="hover:scale-105 transition-all"
            >
              <Icon name="BarChart3" size={18} className="mr-2" />
              Статистика
            </Button>
            <Button 
              onClick={onShowPrivacy}
              variant="outline" 
              className="hover:scale-105 transition-all"
            >
              <Icon name="Shield" size={18} className="mr-2" />
              Приватность
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="hover:scale-105 transition-all">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </Button>
            <Button variant="outline" className="hover:scale-105 transition-all text-destructive">
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;