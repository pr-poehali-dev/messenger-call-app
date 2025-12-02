import { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import CallScreen from '@/components/CallScreen';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatList
        onSelectChat={setSelectedChat}
        selectedChatId={selectedChat}
        onShowProfile={() => setShowProfile(true)}
      />
      
      {selectedChat !== null && !isCallActive && !showProfile && (
        <ChatWindow
          chatId={selectedChat}
          onStartCall={() => setIsCallActive(true)}
          onBack={() => setSelectedChat(null)}
        />
      )}

      {selectedChat === null && !showProfile && (
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

      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default Index;
