import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center animate-scale-in">
            <Icon name="MessageSquare" size={36} className="text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Мессенджер</h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-muted border-border"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-muted border-border"
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-muted-foreground">Запомнить меня</span>
                </label>
                <button type="button" className="text-white hover:underline">
                  Забыли пароль?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              или
            </span>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-border hover:bg-muted"
            >
              <Icon name="Chrome" size={18} className="mr-2" />
              Войти через Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full border-border hover:bg-muted"
            >
              <Icon name="Github" size={18} className="mr-2" />
              Войти через GitHub
            </Button>
          </div>

          <div className="text-center mt-6 text-sm">
            <span className="text-muted-foreground">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            </span>{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-white hover:underline font-medium"
            >
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>Продолжая, вы соглашаетесь с</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <button className="hover:text-white transition-colors">
              Условиями использования
            </button>
            <span>•</span>
            <button className="hover:text-white transition-colors">
              Политикой конфиденциальности
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
