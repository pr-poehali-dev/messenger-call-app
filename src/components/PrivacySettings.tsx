import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PrivacySettingsProps {
  onClose: () => void;
}

const PrivacySettings = ({ onClose }: PrivacySettingsProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    showOnline: true,
    showLastSeen: true,
    showProfilePhoto: 'everyone',
    showStatus: 'contacts',
    readReceipts: true,
    twoStepVerification: false,
    endToEndEncryption: true,
    allowCalls: 'everyone',
    allowVideoCalls: 'contacts',
    allowGroups: 'everyone',
    blockScreenshots: false,
    autoDeleteMessages: 'off',
  });

  const handleSave = () => {
    toast({
      title: 'Настройки сохранены',
      description: 'Ваши настройки приватности обновлены',
    });
  };

  const privacyOptions = [
    { value: 'everyone', label: 'Все' },
    { value: 'contacts', label: 'Мои контакты' },
    { value: 'nobody', label: 'Никто' },
  ];

  const autoDeleteOptions = [
    { value: 'off', label: 'Выключено' },
    { value: '24h', label: '24 часа' },
    { value: '7d', label: '7 дней' },
    { value: '30d', label: '30 дней' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background animate-fade-in overflow-y-auto">
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 hover:bg-white/10"
        >
          <Icon name="X" size={24} />
        </Button>
        <div className="relative z-10 p-6 h-full flex items-end">
          <div>
            <h1 className="text-3xl font-bold mb-2">Приватность</h1>
            <p className="text-muted-foreground">Контролируйте доступ к вашим данным</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 max-w-3xl mx-auto w-full">
        <div className="glass-effect p-6 rounded-2xl space-y-4 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center">
              <Icon name="Eye" size={18} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold">Видимость профиля</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="showOnline" className="font-medium">Показывать статус онлайн</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Другие пользователи увидят, когда вы в сети
                </p>
              </div>
              <Switch
                id="showOnline"
                checked={settings.showOnline}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showOnline: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="showLastSeen" className="font-medium">Время последнего визита</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Когда вы были онлайн в последний раз
                </p>
              </div>
              <Switch
                id="showLastSeen"
                checked={settings.showLastSeen}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, showLastSeen: checked })
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="font-medium">Кто видит фото профиля</Label>
              <Select
                value={settings.showProfilePhoto}
                onValueChange={(value) =>
                  setSettings({ ...settings, showProfilePhoto: value })
                }
              >
                <SelectTrigger className="glass-effect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {privacyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Кто видит статус</Label>
              <Select
                value={settings.showStatus}
                onValueChange={(value) =>
                  setSettings({ ...settings, showStatus: value })
                }
              >
                <SelectTrigger className="glass-effect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {privacyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-2xl space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full gradient-blue flex items-center justify-center">
              <Icon name="MessageSquare" size={18} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold">Сообщения</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="readReceipts" className="font-medium">Отчёты о прочтении</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Отправлять уведомления о прочтении сообщений
                </p>
              </div>
              <Switch
                id="readReceipts"
                checked={settings.readReceipts}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, readReceipts: checked })
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="font-medium">Автоудаление сообщений</Label>
              <Select
                value={settings.autoDeleteMessages}
                onValueChange={(value) =>
                  setSettings({ ...settings, autoDeleteMessages: value })
                }
              >
                <SelectTrigger className="glass-effect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {autoDeleteOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Сообщения автоматически удаляются через указанное время
              </p>
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-2xl space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Icon name="Shield" size={18} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold">Безопасность</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="twoStep" className="font-medium">Двухфакторная аутентификация</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Дополнительная защита при входе в аккаунт
                </p>
              </div>
              <Switch
                id="twoStep"
                checked={settings.twoStepVerification}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, twoStepVerification: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="encryption" className="font-medium">Сквозное шифрование</Label>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <Icon name="Lock" size={12} className="text-green-500" />
                  Ваши сообщения защищены
                </p>
              </div>
              <Switch
                id="encryption"
                checked={settings.endToEndEncryption}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, endToEndEncryption: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="screenshots" className="font-medium">Блокировка скриншотов</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Запретить создание скриншотов чатов
                </p>
              </div>
              <Switch
                id="screenshots"
                checked={settings.blockScreenshots}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, blockScreenshots: checked })
                }
              />
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-2xl space-y-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <Icon name="Phone" size={18} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold">Звонки и группы</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-medium">Кто может звонить</Label>
              <Select
                value={settings.allowCalls}
                onValueChange={(value) =>
                  setSettings({ ...settings, allowCalls: value })
                }
              >
                <SelectTrigger className="glass-effect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {privacyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Кто может делать видеозвонки</Label>
              <Select
                value={settings.allowVideoCalls}
                onValueChange={(value) =>
                  setSettings({ ...settings, allowVideoCalls: value })
                }
              >
                <SelectTrigger className="glass-effect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {privacyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Кто может добавлять в группы</Label>
              <Select
                value={settings.allowGroups}
                onValueChange={(value) =>
                  setSettings({ ...settings, allowGroups: value })
                }
              >
                <SelectTrigger className="glass-effect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {privacyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <Button onClick={handleSave} className="flex-1 gradient-purple hover:opacity-90">
            <Icon name="Check" size={18} className="mr-2" />
            Сохранить настройки
          </Button>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
