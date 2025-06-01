import { useState } from 'react';
import { Copy, RefreshCw, CheckCircle } from 'lucide-react';
import { getRandomExcuse, type Excuse } from '../data/excuses';
import { useThemeStore } from '../store/themeStore';

export const ExcuseBox = () => {
  const { selectedTheme } = useThemeStore();
  const [currentExcuse, setCurrentExcuse] = useState<Excuse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generateExcuse = async () => {
    setIsGenerating(true);
    
    // 로딩 애니메이션을 위한 딜레이
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newExcuse = getRandomExcuse(selectedTheme || undefined);
    setCurrentExcuse(newExcuse);
    setIsGenerating(false);
    setIsCopied(false);
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

  return (
    <div className="excuse-card p-8 max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🔮 오늘의 핑계™️
        </h2>
        <p className="text-gray-600 text-sm">
          {selectedTheme ? `${selectedTheme}용 핑계` : '랜덤 핑계'}
        </p>
      </div>

      {/* 핑계 표시 영역 */}
      <div className="min-h-[120px] flex items-center justify-center mb-6">
        {currentExcuse ? (
          <div className="text-center space-y-3">
            <div className="text-4xl mb-2">{currentExcuse.emoji}</div>
            <p className="text-lg text-gray-800 leading-relaxed font-medium">
              "{currentExcuse.text}"
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🎲</div>
            <p className="text-lg">버튼을 눌러서 핑계를 생성해보세요!</p>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3">
        <button
          onClick={generateExcuse}
          disabled={isGenerating}
          className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? '생성 중...' : '새 핑계 생성'}
        </button>

        {currentExcuse && (
          <button
            onClick={copyToClipboard}
            className={`px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl ${
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
        <div className="mt-3 text-center text-green-600 text-sm font-medium">
          📋 클립보드에 복사되었습니다!
        </div>
      )}
    </div>
  );
}; 