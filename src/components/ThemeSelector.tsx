import { themes, type ExcuseTheme } from '../data/excuses';
import { useThemeStore } from '../store/themeStore';

const themeEmojis: Record<ExcuseTheme, string> = {
  '직장': '💼',
  '연인': '💕',
  '친구': '👫',
  '부모님': '👨‍👩‍👧‍👦',
  '만능': '🎭'
};

export const ThemeSelector = () => {
  const { selectedTheme, setTheme } = useThemeStore();

  return (
    <div className="w-full max-w-xs sm:max-w-md mx-auto mb-4 sm:mb-6 px-2">
      <h3 className="text-white text-center mb-2 sm:mb-3 font-medium text-xs sm:text-sm drop-shadow-md">
        어떤 상황의 핑계가 필요하신가요?
      </h3>
      
      <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
        <button
          onClick={() => setTheme(null)}
          className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 hover:scale-105 shadow-sm touch-manipulation ${
            selectedTheme === null 
              ? 'bg-primary-500 text-white shadow-md' 
              : 'bg-white/80 text-gray-700 hover:bg-white/95'
          }`}
        >
          🎲 랜덤
        </button>
        
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => setTheme(theme)}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 hover:scale-105 shadow-sm touch-manipulation ${
              selectedTheme === theme 
                ? 'bg-primary-500 text-white shadow-md' 
                : 'bg-white/80 text-gray-700 hover:bg-white/95'
            }`}
          >
            {themeEmojis[theme]} {theme}
          </button>
        ))}
      </div>
    </div>
  );
}; 