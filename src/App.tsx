import { ExcuseBox } from './components/ExcuseBox';
import { ThemeSelector } from './components/ThemeSelector';
import './index.css';

function App() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-3 sm:p-4">
      {/* 헤더 */}
      <div className="text-center mb-4 sm:mb-6 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
          🔮 오늘의 핑계™️
        </h1>
        <p className="text-white/90 text-sm sm:text-base drop-shadow-md">
          "오늘은 안 되는 날이에요… 핑계가 필요하니까요."
        </p>
      </div>

      {/* 테마 선택기 */}
      <ThemeSelector />

      {/* 핑계 생성 박스 */}
      <ExcuseBox />

      {/* 푸터 */}
      <div className="mt-4 sm:mt-6 text-center text-white/70 text-xs sm:text-sm px-2">
        <p className="mb-1">
          진짜 오늘은 안 되는 날이야. 근데 왜 그런지는 물어보지 마.
        </p>
        <p className="text-xs">
          — 오늘의 핑계™️
        </p>
      </div>
    </div>
  );
}

export default App;
