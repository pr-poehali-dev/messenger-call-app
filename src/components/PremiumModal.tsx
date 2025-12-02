import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'monthly' | 'yearly') => void;
}

const premiumFeatures = [
  { icon: 'Crown', text: 'Приоритетный статус в чатах', premium: true },
  { icon: 'Zap', text: 'Эксклюзивные Premium каналы', premium: true },
  { icon: 'Video', text: 'HD видеозвонки без ограничений', premium: true },
  { icon: 'Download', text: 'Загрузка файлов до 4 ГБ', premium: true },
  { icon: 'Palette', text: 'Уникальные темы оформления', premium: true },
  { icon: 'Shield', text: 'Усиленная приватность', premium: true },
  { icon: 'Sparkles', text: 'Анимированные аватары', premium: true },
  { icon: 'Users', text: 'Создание до 50 групп', premium: true },
];

const PremiumModal = ({ isOpen, onClose, onSubscribe }: PremiumModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-primary/5 to-secondary/5 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center animate-scale-in">
                <Icon name="Crown" size={24} className="text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold gradient-purple bg-clip-text text-transparent">
              Premium подписка
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Получите все возможности приложения без ограничений
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid md:grid-cols-2 gap-3">
            {premiumFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 glass-effect p-3 rounded-xl animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon as any} size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <div className="glass-effect p-6 rounded-2xl border-2 border-primary/30 hover:border-primary/50 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Месячная подписка</h3>
                  <p className="text-sm text-muted-foreground">Оплата каждый месяц</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold gradient-purple bg-clip-text text-transparent">
                    299₽
                  </div>
                  <p className="text-xs text-muted-foreground">в месяц</p>
                </div>
              </div>
              <Button
                onClick={() => onSubscribe('monthly')}
                className="w-full gradient-purple hover:opacity-90 transition-all group-hover:scale-105"
              >
                <Icon name="Zap" size={18} className="mr-2" />
                Подключить за 299₽/мес
              </Button>
            </div>

            <div className="glass-effect p-6 rounded-2xl border-2 border-yellow-500/50 hover:border-yellow-500 transition-all cursor-pointer group relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0">
                  <Icon name="TrendingDown" size={12} className="mr-1" />
                  -40%
                </Badge>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Годовая подписка</h3>
                  <p className="text-sm text-muted-foreground">Выгода 1440₽ в год</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground line-through">3588₽</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    2148₽
                  </div>
                  <p className="text-xs text-muted-foreground">179₽ в месяц</p>
                </div>
              </div>
              <Button
                onClick={() => onSubscribe('yearly')}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:opacity-90 transition-all group-hover:scale-105 text-white"
              >
                <Icon name="Crown" size={18} className="mr-2" />
                Подключить за 2148₽/год
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Shield" size={14} />
              <span>Безопасная оплата</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="RefreshCw" size={14} />
              <span>Отмена в любой момент</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Check" size={14} />
              <span>Без скрытых платежей</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
