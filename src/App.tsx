import { ExcuseBox } from './components/ExcuseBox';
import { ThemeSelector } from './components/ThemeSelector';
import './index.css';

function App() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🔮 오늘의 핑계™️
        </h1>
        <p className="text-white/80 text-lg">
          "오늘은 안 되는 날이에요… 핑계가 필요하니까요."
        </p>
      </div>

      {/* 테마 선택기 */}
      <ThemeSelector />

      {/* 핑계 생성 박스 */}
      <ExcuseBox />

      {/* 푸터 */}
      <div className="mt-8 text-center text-white/60 text-sm">
        <p className="mb-2">
          진짜 오늘은 안 되는 날이야. 근데 왜 그런지는 물어보지 마.
        </p>
        <p>
          — 오늘의 핑계™️
        </p>
      </div>
    </div>
  );
}

export default App;
