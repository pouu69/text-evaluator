import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import './App.css';

function App() {
  // 애니메이션을 위한 상태
  const [isVisible, setIsVisible] = useState(false);
  
  // 컴포넌트가 마운트되면 애니메이션 시작
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
          
          <footer className={`mt-24 text-center text-gray-500 text-sm py-8 border-t border-gray-200 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
                  style={{ transitionDelay: '600ms' }}>
            <p>&copy; {new Date().getFullYear()} 텍스트 평가 도구 | 전문적인 텍스트 분석 서비스</p>
            <div className="mt-4 space-x-4">
              <Link to="/terms" className="text-primary-600 hover:text-primary-800">이용약관</Link>
              <Link to="/privacy" className="text-primary-600 hover:text-primary-800">개인정보 처리방침</Link>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
