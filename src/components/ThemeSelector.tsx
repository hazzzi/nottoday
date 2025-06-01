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
    <div className="w-full max-w-md mx-auto mb-8">
      <h3 className="text-white text-center mb-4 font-semibold">
        어떤 상황의 핑계가 필요하신가요?
      </h3>
      
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setTheme(null)}
          className={`theme-button ${
            selectedTheme === null ? 'active' : 'inactive'
          }`}
        >
          🎲 랜덤
        </button>
        
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => setTheme(theme)}
            className={`theme-button ${
              selectedTheme === theme ? 'active' : 'inactive'
            }`}
          >
            {themeEmojis[theme]} {theme}
          </button>
        ))}
      </div>
    </div>
  );
}; 