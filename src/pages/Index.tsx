import { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import CallScreen from '@/components/CallScreen';
import VideoCallScreen from '@/components/VideoCallScreen';
import UserProfile from '@/components/UserProfile';
import PremiumModal from '@/components/PremiumModal';
import StatsView from '@/components/StatsView';
import PrivacySettings from '@/components/PrivacySettings';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    toast({
      title: 'Подписка активирована!',
      description: `Premium ${plan === 'monthly' ? 'месячная' : 'годовая'} подписка успешно подключена`,
    });
    setShowPremiumModal(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatList
        onSelectChat={setSelectedChat}
        selectedChatId={selectedChat}
        onShowProfile={() => setShowProfile(true)}
      />
      
      {selectedChat !== null && !isCallActive && !isVideoCall && !showProfile && (
        <ChatWindow
          chatId={selectedChat}
          onStartCall={() => setIsCallActive(true)}
          onStartVideoCall={() => setIsVideoCall(true)}
          onBack={() => setSelectedChat(null)}
        />
      )}

      {selectedChat === null && !showProfile && !showStats && !showPrivacy && (
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full gradient-purple opacity-20" />
            <h2 className="text-2xl font-semibold text-muted-foreground">
              Выберите чат
            </h2>
            <p className="text-muted-foreground mt-2">
              Начните общение с друзьями
            </p>
          </div>
        </div>
      )}

      {isCallActive && (
        <CallScreen
          userName="Анна Иванова"
          onEndCall={() => setIsCallActive(false)}
        />
      )}

      {isVideoCall && (
        <VideoCallScreen
          userName="Анна Иванова"
          onEndCall={() => setIsVideoCall(false)}
        />
      )}

      {showProfile && (
        <UserProfile 
          onClose={() => setShowProfile(false)} 
          onShowPremium={() => {
            setShowProfile(false);
            setShowPremiumModal(true);
          }}
          onShowStats={() => {
            setShowProfile(false);
            setShowStats(true);
          }}
          onShowPrivacy={() => {
            setShowProfile(false);
            setShowPrivacy(true);
          }}
        />
      )}

      {showStats && (
        <StatsView onClose={() => setShowStats(false)} />
      )}

      {showPrivacy && (
        <PrivacySettings onClose={() => setShowPrivacy(false)} />
      )}

      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default Index;