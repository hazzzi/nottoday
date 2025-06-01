import { useState } from 'react';
import { Copy, RefreshCw, CheckCircle } from 'lucide-react';
import { getRandomExcuse, type Excuse } from '../data/excuses';
import { useThemeStore } from '../store/themeStore';

type GeneratingPhase = 'idle' | 'searching' | 'thinking' | 'typing' | 'complete';

const loadingMessages = [
  "핑계 생성 중... 🙄",
  "진짜 그럴싸한 핑계를 찾는 중... 🔍",
  "완벽한 변명을 발굴하는 중... ⛏️",
  "오늘의 베스트 핑계를 선별 중... 🎯",
  "어떻게 말해야 믿을까... 🤔",
];

export const ExcuseBox = () => {
  const { selectedTheme } = useThemeStore();
  const [currentExcuse, setCurrentExcuse] = useState<Excuse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [phase, setPhase] = useState<GeneratingPhase>('idle');
  const [displayText, setDisplayText] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');

  const typeText = async (text: string) => {
    setDisplayText('');
    const words = text.split(' ');
    
    for (let i = 0; i < words.length; i++) {
      const partialText = words.slice(0, i + 1).join(' ');
      setDisplayText(partialText);
      
      // 단어별로 다른 지연시간 (더 자연스럽게)
      const delay = words[i].length > 3 ? 200 : 150;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  const generateExcuse = async () => {
    setIsGenerating(true);
    setPhase('searching');
    setIsCopied(false);
    
    // 1단계: 슬롯머신 스타일 로딩 메시지 변경
    for (let i = 0; i < loadingMessages.length; i++) {
      setLoadingMessage(loadingMessages[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    setPhase('thinking');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 2단계: 핑계 선택
    const newExcuse = getRandomExcuse(selectedTheme || undefined);
    
    setPhase('typing');
    setCurrentExcuse(newExcuse);
    
    // 3단계: 텍스트 타이핑 애니메이션
    await typeText(newExcuse.text);
    
    setPhase('complete');
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    if (!currentExcuse) return;
    
    try {
      await navigator.clipboard.writeText(currentExcuse.text);
      setIsCopied(true);
      
      // 2초 후 복사 상태 초기화
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const renderSlotMachine = () => {
    const slots = ['🎰', '🎲', '🔮', '✨', '💫', '🌟'];
    return (
      <div className="flex justify-center gap-1 mb-3 sm:gap-2 sm:mb-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className={`text-2xl sm:text-3xl animate-bounce ${isGenerating ? 'animate-spin' : ''}`}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: '0.6s'
            }}
          >
            {slot}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-sm p-4 mx-auto excuse-card sm:p-6 lg:p-8 sm:max-w-md">
      <div className="mb-4 text-center sm:mb-6">
        <h2 className="mb-2 text-xl font-bold text-gray-800 sm:text-2xl">
          🔮 오늘의 핑계™️
        </h2>
        <p className="text-xs text-gray-600 sm:text-sm">
          {selectedTheme ? `${selectedTheme}용 핑계` : '랜덤 핑계'}
        </p>
      </div>

      {/* 핑계 표시 영역 */}
      <div className="min-h-[120px] sm:min-h-[160px] flex flex-col items-center justify-center mb-4 sm:mb-6">
        {isGenerating && renderSlotMachine()}
        
        {phase === 'idle' && !currentExcuse && (
          <div className="text-center text-gray-500">
            <div className="mb-2 text-3xl sm:text-4xl animate-pulse">🎲</div>
            <p className="px-2 text-base sm:text-lg">버튼을 눌러서 핑계를 뽑아보세요!</p>
          </div>
        )}

        {(phase === 'searching' || phase === 'thinking') && (
          <div className="px-2 text-center">
            <div className="mb-2 text-2xl sm:text-3xl sm:mb-3 animate-bounce">⏳</div>
            <p className="text-sm font-medium text-gray-600 sm:text-base animate-pulse">
              {loadingMessage || "핑계를 찾는 중..."}
            </p>
          </div>
        )}

        {(phase === 'typing' || phase === 'complete') && currentExcuse && (
          <div className="px-2 space-y-2 text-center sm:space-y-3">
            <div className="mb-2 text-3xl sm:text-4xl animate-bounce">{currentExcuse.emoji}</div>
            <div className="relative">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center px-1">
                "{displayText}
                {phase === 'typing' && (
                  <span className="ml-1 animate-pulse text-primary-500">|</span>
                )}
                "
              </p>
            </div>
            
            {/* 완성 뱃지를 별도 영역으로 이동 */}
            {phase === 'complete' && (
              <div className="flex justify-center mt-2">
                <span className="text-xs bg-green-100 text-green-600 px-3 py-1.5 rounded-full animate-bounce inline-flex items-center gap-1">
                  <span>완성!</span>
                  <span>✨</span>
                </span>
              </div>
            )}
          </div>
        )}

        {phase === 'complete' && currentExcuse && !isGenerating && (
          <div className="px-2 mt-3 text-center sm:mt-4">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
              <span className="px-2 py-1 text-xs text-purple-600 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 sm:px-3">
                🎯 완벽한 핑계
              </span>
              <span className="px-2 py-1 text-xs text-blue-600 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 sm:px-3">
                💯 신뢰도 MAX
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={generateExcuse}
          disabled={isGenerating}
          className={`flex-1 font-semibold py-3 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed text-sm sm:text-base touch-manipulation ${
            isGenerating
              ? 'bg-gray-400 text-white'
              : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white active:scale-95 hover:scale-105'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isGenerating ? '핑계 뽑는 중...' : '🎰 핑계 뽑기'}</span>
          <span className="sm:hidden">{isGenerating ? '뽑는 중...' : '🎰 뽑기'}</span>
        </button>

        {phase === 'complete' && currentExcuse && (
          <button
            onClick={copyToClipboard}
            className={`px-3 sm:px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 hover:scale-105 touch-manipulation ${
              isCopied 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {isCopied ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* 복사 완료 메시지 */}
      {isCopied && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-green-600 rounded-full bg-green-50 sm:px-4 sm:text-sm">
            <span className="animate-bounce">📋</span>
            클립보드에 복사되었습니다!
          </div>
        </div>
      )}

      {/* 재미있는 상태 표시 */}
      {phase === 'complete' && (
        <div className="px-2 mt-3 text-center sm:mt-4">
          <p className="text-xs text-gray-400">
            "이거 말이 되냐?" 라고 물어보면... 🤫
          </p>
        </div>
      )}
    </div>
  );
}; 