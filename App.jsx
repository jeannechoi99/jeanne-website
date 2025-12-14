import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Microscope, User, Mail, Home as HomeIcon, ExternalLink } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [viewMode, setViewMode] = useState('main');
  const [novelContent, setNovelContent] = useState('novel');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 논문 데이터 - 카테고리 추가 (데이터는 그대로 유지)
  const papers = [
    {
      title: "How Far I'll Go: Imagining Futures of Conversational AI with People with Visual Impairments Through Design Fiction",
      year: "2025",
      venue: "Preprint",
      externalLink: "https://arxiv.org/abs/2510.12268",
      color: "from-indigo-900 to-indigo-900", // 그라디언트 색상 조정
      categories: ["Accessibility"]
    },
    {
      title: "CrisisNews: A Dataset Mapping Two Decades of News Articles on Online Problematic Behavior at Scale",
      year: "2025",
      venue: "Preprint",
      externalLink: "https://arxiv.org/abs/2510.12243",
      color: "from-indigo-900 to-indigo-900", 
      categories: ["Trust & Safety", "Social Computing"]
    },
    {
      title: "HateBuffer: Safeguarding Content Moderators' Mental Well-Being through Hate Speech Content Modification",
      year: "2025",
      venue: "CSCW2025",
      externalLink: "https://dl.acm.org/doi/10.1145/3757609",
      color: "from-indigo-900 to-indigo-900", 
      categories: ["Trust & Safety"]
    },
    {
      title: "Leveling Up Together: Fostering Positive Growth and Safe Online Spaces for Teen Roblox Developers",
      year: "2025",
      venue: "CHI2025",
      externalLink: "https://dl.acm.org/doi/full/10.1145/3706598.3713969",
      color: "from-indigo-900 to-indigo-900", 
      categories: ["Trust & Safety", "Social Computing"]
    },
    {
      title: "Empirical Evaluation of Metaverse Accessibility for People Who Use Alternative Input/Output Methods",
      year: "2023",
      venue: "AAATE2023",
      externalLink: "https://www.researchgate.net/publication/373452260_Empirical_Evaluation_of_Metaverse_Accessibility_for_People_Who_Use_Alternative_InputOutput_Methods",
      color: "from-indigo-900 to-indigo-900", 
      categories: ["Accessibility"]
    },
    {
      title: "Analysis of the Accessibility of Metaverse Platforms from the Perspective of Screen Reader Users",
      year: "2023",
      venue: "JDCS2023",
      externalLink: "https://www.researchgate.net/publication/369860581_Analysis_of_the_Accessibility_of_Metaverse_Platforms_from_the_Perspective_of_Screen_Reader_Users",
      color: "from-indigo-900 to-indigo-900", 
      categories: ["Accessibility"]
    }
  ];

  // 카테고리 목록 자동 생성
  const categories = ['All', ...new Set(papers.flatMap(paper => paper.categories))];

  // 필터링된 논문 목록
  const filteredPapers = selectedCategory === 'All' 
    ? papers 
    : papers.filter(paper => paper.categories.includes(selectedCategory));

  // 창작물 데이터 (데이터는 그대로 유지)
  const creativeWorks = [
    {
      title: "As much as it fades",
      genre: "SF",
      year: "2024",
      description: "Have you ever thought how your memories full of happiness are wasted?",
      color: "from-indigo-900 to-indigo-900", 
      novelFileEng: "novels-eng/fade-eng.txt",
      novelFileKor: "novels-kor/fade-kor.txt"
    },
    {
      title: "Cosmic Love",
      genre: "SF",
      year: "2025",
      description: "I could not say goodbye, because of the light I saw.",
      color: "from-indigo-900 to-indigo-900", 
      novelFileEng: "novels-eng/cosmic-eng.txt",
      novelFileKor: "novels-kor/cosmic-kor.txt"
    }
    // ... (나머지 creativeWorks 데이터)
  ];

  const scrollToSection = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
    setViewMode('main');
    setSelectedWork(null);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openReading = async (work, filePath) => {
    setSelectedWork(work);
    setViewMode('reading');
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (filePath) {
      const fullPath = import.meta.env.BASE_URL + filePath;

      try {
        const response = await fetch(fullPath);
        const text = await response.text();
        
        let html = text
          .replace(/^# (.+)$/gm, '<h2 class="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-700 to-purple-700 bg-clip-text text-transparent">$1</h2>')
          .replace(/^## (.+)$/gm, '<h3 class="text-2xl font-semibold mb-3 text-purple-700 mt-6">$1</h3>')
          .replace(/^\*\*(.+)\*\*$/gm, '<p class="text-slate-700 mb-4"><strong>$1</strong></p>')
          .replace(/^"(.+)"$/gm, '<p class="text-slate-600 italic mb-4 pl-4 border-l-2 border-purple-700">"$1"</p>')
          .replace(/^---$/gm, '<hr class="my-8 border-slate-300" />')
          .replace(/\n\n/g, '</p><p class="text-slate-800 mb-4 leading-relaxed">')
          .replace(/^(?!<[hpH])/gm, '<p class="text-slate-800 mb-4 leading-relaxed">')
          .replace(/$/gm, '</p>');
        
        setNovelContent(html);
      } catch (error) {
        console.error('Failed to load novel:', error);
        setNovelContent('<p class="text-red-700">소설을 불러오는데 실패했습니다.</p>');
      }
    }
    setLoading(false);
  };

  const closeReading = () => {
    setViewMode('novel');
    setSelectedWork(null);
    setNovelContent('');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800"> 
      {viewMode === 'reading' && selectedWork ? (
        <div className="min-h-screen">
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <button
                  onClick={closeReading}
                  className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <X size={20} />
                  <span>Close</span>
                </button>
                <div className="text-lg font-semibold text-slate-900">
                  {selectedWork.title}
                </div>
                <div className="w-24"></div>
              </div>
            </div>
          </nav>

          <div className="pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-xl">
                {loading ? (
                  <div className="text-center text-slate-500">
                    <p>로딩 중...</p>
                  </div>
                ) : (
                  <div 
                    className="prose max-w-none text-slate-800"
                    dangerouslySetInnerHTML={{ __html: novelContent }}
                  />
                )}
              </div>
              
              <div className="mt-8 text-center">
                <button
                  onClick={closeReading}
                  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:scale-105 transition-transform"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-700 to-purple-700 bg-clip-text text-transparent">
                  Jeanne Choi
                </div>
                
                <div className="hidden md:flex space-x-8">
                  {[
                    { id: 'home', label: 'Home', icon: HomeIcon },
                    // { id: 'about', label: 'About', icon: User }, // (About 주석 처리 유지)
                    { id: 'research', label: 'Research', icon: Microscope },
                    { id: 'creative', label: 'Creative Works', icon: BookOpen },
                    // 1. 네비게이션 바 메뉴에서 Contact 버튼 주석 처리
                    // { id: 'contact', label: 'Contact', icon: Mail }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                        activeSection === item.id
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  className="md:hidden text-slate-800"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {menuOpen && (
              <div className="md:hidden bg-white shadow-lg border-t border-slate-200">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {[
                    { id: 'home', label: 'Home', icon: HomeIcon },
                    // { id: 'about', label: 'About', icon: User }, // (About 주석 처리 유지)
                    { id: 'research', label: 'Research', icon: Microscope },
                    { id: 'creative', label: 'Creative Works', icon: BookOpen },
                    // 2. 모바일 메뉴에서 Contact 버튼 주석 처리
                    // { id: 'contact', label: 'Contact', icon: Mail }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>

          <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-700 via-purple-700 to-pink-700 bg-clip-text text-transparent animate-pulse">
                Jeanne Choi
              </h1>
              <p className="text-2xl md:text-3xl text-slate-700 mb-4">
                HCI Researcher × Imaginator
              </p>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Between engineering and creativity, imagines an equitable society
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => scrollToSection('research')}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full hover:scale-105 transition-transform"
                >
                  Research
                </button>
                <button
                  onClick={() => scrollToSection('creative')}
                  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:scale-105 transition-transform"
                >
                  Creative Work
                </button>
              </div>
            </div>
          </section>

          {/* About 섹션 주석 처리 유지 */}
          {/*
          <section id="about" className="min-h-screen py-20 px-4 flex items-center">
            ... (About Content)
          </section>
          */}

          <section id="research" className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent">
                Research
              </h2>
              
              <div className="flex flex-wrap justify-center gap-3 mb-8 mt-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <p className="text-center text-slate-600 mb-6">
                {filteredPapers.length} {filteredPapers.length === 1 ? 'paper' : 'papers'}
              </p>
              
              <div className="space-y-4">
                {filteredPapers.map((paper, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-slate-400 transition-all hover:shadow-xl group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${paper.color}`}></div>
                          <span className="text-sm text-slate-600">{paper.year}</span>
                          
                          <div className="flex gap-2 flex-wrap">
                            {paper.categories.map((cat, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-xs font-medium bg-cyan-100 text-cyan-700 rounded-full border border-cyan-200"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
                          {paper.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-3">
                          {paper.venue}
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0">
                        {paper.externalLink && (
                          <a
                            href={paper.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg transition-all font-medium border border-cyan-200 hover:border-cyan-400"
                          >
                            <ExternalLink size={18} />
                            <span>Link</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="creative" className="min-h-screen py-20 px-4 bg-slate-100">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent">
                Creative Works
              </h2>
              <p className="text-center text-slate-600 mb-12 text-lg">
                The world of my own creation - the world that may happen.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creativeWorks.map((work, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-400 transition-all hover:shadow-2xl group"
                  >
                    <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${work.color} mb-4`}></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {work.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-1">
                      {work.genre} • {work.year}
                    </p>
                    <p className="text-slate-800 mt-4 mb-4">
                      {work.description}
                    </p>
                    
                    <div className="flex gap-2">
                      {work.novelFileEng && (
                        <button
                          onClick={() => openReading(work, work.novelFileEng)}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-all text-sm flex-1"
                        >
                          <BookOpen size={16} />
                          <span>Read (EN)</span>
                        </button>
                      )}
                      {work.novelFileKor && (
                        <button
                          onClick={() => openReading(work, work.novelFileKor)}
                          className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-all text-sm flex-1"
                        >
                          <BookOpen size={16} />
                          <span>Read (KR)</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Contact 섹션 본문 주석 처리 */}
          {/*
          <section id="contact" className="min-h-screen py-20 px-4 flex items-center bg-slate-100">
            <div className="max-w-2xl mx-auto text-center w-full">
              <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Contact
              </h2>
              
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
                <p className="text-xl text-slate-800 mb-8">
                  Want to collaborate or discuss ideas?
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3 text-slate-700 hover:text-cyan-700 transition-colors">
                    <Mail size={24} />
                    <span className="text-lg">jeannechoi@kaist.ac.kr</span>
                  </div>
                  
                  <div className="flex justify-center space-x-6 mt-8">
                    <a href="https://www.linkedin.com/in/jeanne-choi-965133276/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 text-sm">
                        LinkedIn
                      </div>
                    </a>
                    <a href="https://drive.google.com/file/d/1fEo2SSLPwyoaraezdV0BHuI48tQCMV1G/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 text-sm">
                        CV
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          */}

          <footer className="py-8 text-center text-slate-600 border-t border-slate-200">
            <p>© 2025 Jeanne Choi. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;