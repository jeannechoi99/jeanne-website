# 🎨 포트폴리오 웹사이트

컴퓨터공학 연구와 창작물을 담은 컬러풀한 포트폴리오 사이트입니다.

## 📋 목차
- [설치 방법](#설치-방법)
- [실행 방법](#실행-방법)
- [커스터마이징](#커스터마이징)
- [배포 방법](#배포-방법)

---

## 🚀 설치 방법

### 1. Node.js 설치 확인
먼저 터미널을 열고 Node.js가 설치되어 있는지 확인하세요:
```bash
node --version
npm --version
```

Node.js가 없다면 [nodejs.org](https://nodejs.org/)에서 다운로드하세요.

### 2. 프로젝트 폴더로 이동
VS Code에서 터미널을 열고 (Ctrl + ` 또는 상단 메뉴 Terminal > New Terminal):
```bash
cd portfolio-site
```

### 3. 패키지 설치
```bash
npm install
```

이 명령어가 모든 필요한 라이브러리를 자동으로 설치합니다.

---

## 💻 실행 방법

### 개발 서버 실행
```bash
npm run dev
```

성공하면 터미널에 다음과 같은 메시지가 나타납니다:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

브라우저에서 `http://localhost:5173/`을 열면 사이트를 볼 수 있습니다!

### 개발 서버 중지
터미널에서 `Ctrl + C`를 누르세요.

---

## 🎨 커스터마이징

### 1. 개인 정보 수정
`App.jsx` 파일을 열고 다음 부분들을 수정하세요:

```jsx
// 이름 변경 (2곳)
<div className="text-2xl font-bold...">Your Name</div>
<h1 className="text-6xl...">Your Name</h1>

// 이메일 변경
<span className="text-lg">your.email@example.com</span>
```

### 2. 논문 데이터 추가/수정
`App.jsx` 파일에서 `papers` 배열을 찾아 수정하세요:

```jsx
const papers = [
  {
    title: "실제 논문 제목",
    year: "2024",
    venue: "학회명 (예: ICML, NeurIPS 등)",
    description: "논문에 대한 간단한 설명을 여기에 작성",
    color: "from-purple-400 to-pink-400" // 색상 조합
  },
  // 더 많은 논문 추가...
];
```

**색상 조합 옵션:**
- `from-purple-400 to-pink-400` (보라-핑크)
- `from-blue-400 to-cyan-400` (파랑-청록)
- `from-green-400 to-emerald-400` (초록-에메랄드)
- `from-orange-400 to-red-400` (주황-빨강)
- `from-indigo-400 to-purple-400` (남색-보라)

### 3. 창작물 데이터 추가/수정
`App.jsx` 파일에서 `creativeWorks` 배열을 찾아 수정하세요:

```jsx
const creativeWorks = [
  {
    title: "소설 제목",
    genre: "장르 (SF, 판타지, 미스터리 등)",
    year: "2024",
    description: "작품 소개",
    color: "from-orange-400 to-red-400"
  },
  // 더 많은 작품 추가...
];
```

### 4. About 섹션 수정
자기소개 부분을 자유롭게 수정하세요. About Section 부분을 찾아서 텍스트를 변경하면 됩니다.

---

## 🌐 배포 방법

### 방법 1: Vercel (추천! 가장 쉬움)

1. [vercel.com](https://vercel.com)에 가입 (GitHub 계정으로 가능)

2. 프로젝트를 GitHub에 업로드:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [당신의-github-repo-url]
git push -u origin main
```

3. Vercel 대시보드에서:
   - "New Project" 클릭
   - GitHub 저장소 선택
   - "Deploy" 클릭
   - 완료! 자동으로 URL이 생성됩니다 (예: your-portfolio.vercel.app)

### 방법 2: Netlify

1. [netlify.com](https://www.netlify.com)에 가입

2. 사이트 빌드:
```bash
npm run build
```

3. Netlify에서:
   - "Add new site" > "Deploy manually" 클릭
   - `dist` 폴더를 드래그 앤 드롭
   - 완료!

### 방법 3: GitHub Pages

1. `vite.config.js` 수정:
```js
export default defineConfig({
  plugins: [react()],
  base: '/저장소이름/', // GitHub 저장소 이름으로 변경
})
```

2. 배포 스크립트 실행:
```bash
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

3. GitHub 저장소 Settings > Pages에서 gh-pages 브랜치 선택

---

## 📁 프로젝트 구조

```
portfolio-site/
├── index.html          # 메인 HTML 파일
├── main.jsx           # React 진입점
├── App.jsx            # 메인 컴포넌트 (여기서 대부분 수정!)
├── index.css          # 스타일 파일
├── package.json       # 프로젝트 설정
├── vite.config.js     # Vite 설정
├── tailwind.config.js # Tailwind CSS 설정
└── README.md          # 이 파일
```

---

## 🛠️ 문제 해결

### 포트가 이미 사용 중이라는 오류
다른 포트로 실행:
```bash
npm run dev -- --port 3000
```

### npm install 오류
캐시 삭제 후 재설치:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 화면이 안 보여요
1. 브라우저 콘솔 확인 (F12)
2. 터미널에 에러 메시지가 있는지 확인
3. 모든 파일이 올바른 위치에 있는지 확인

---

## 💡 추가 팁

- **실시간 미리보기**: 코드를 수정하고 저장하면 브라우저가 자동으로 새로고침됩니다!
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원됩니다
- **색상 변경**: Tailwind CSS 색상을 자유롭게 변경할 수 있습니다
- **아이콘 추가**: [lucide.dev](https://lucide.dev)에서 더 많은 아이콘을 찾을 수 있습니다

---

## 📞 도움이 필요하신가요?

궁금한 점이 있으시면 언제든 물어보세요! 🚀

즐거운 포트폴리오 제작 되세요! ✨
