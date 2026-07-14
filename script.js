/* ===== Mock Data ===== */
const MOCK_LISTINGS = [
  {
    id: 1,
    title: '2026 AI 영상 광고 숏폼 공모전',
    category: '공모전',
    prize: '5,000만원',
    region: '서울',
    dday: 3,
    docs: '사업계획서, 포트폴리오, 팀 소개서',
    interests: ['ai', 'content'],
    stages: ['idea', 'pre', 'early'],
    regions: ['seoul', 'nationwide'],
    baseMatch: 94
  },
  {
    id: 2,
    title: '예비창업패키지 2차 모집',
    category: '지원사업',
    prize: '최대 1억원',
    region: '전국',
    dday: 12,
    docs: '사업계획서, 재직증명서, 학력증명서',
    interests: ['ai', 'fintech', 'green'],
    stages: ['idea', 'pre'],
    regions: ['nationwide', 'seoul', 'gyeonggi'],
    baseMatch: 88
  },
  {
    id: 3,
    title: 'K-스타트업 IR 데모데이 2026',
    category: '데모데이',
    prize: '투자 연결',
    region: '경기 (판교)',
    dday: 7,
    docs: 'IR 덱, 재무제표, 팀 프로필',
    interests: ['ai', 'fintech', 'bio'],
    stages: ['early', 'growth'],
    regions: ['gyeonggi', 'seoul', 'nationwide'],
    baseMatch: 82
  },
  {
    id: 4,
    title: '그린 ESG 스타트업 챌린지',
    category: '공모전',
    prize: '3,000만원',
    region: '부산',
    dday: 18,
    docs: 'ESG 사업계획서, 임팩트 리포트',
    interests: ['green'],
    stages: ['pre', 'early'],
    regions: ['busan', 'nationwide'],
    baseMatch: 71
  },
  {
    id: 5,
    title: '핀테크 이노베이션 해커톤',
    category: '공모전',
    prize: '2,000만원',
    region: '서울',
    dday: 5,
    docs: '아이디어 요약서, 프로토타입 URL',
    interests: ['fintech', 'ai'],
    stages: ['idea', 'pre'],
    regions: ['seoul'],
    baseMatch: 76
  },
  {
    id: 6,
    title: '헬스케어 AI 스케일업 프로그램',
    category: '지원사업',
    prize: '최대 5억원',
    region: '전국',
    dday: 21,
    docs: '사업계획서, 임상/기술 자료, 재무계획',
    interests: ['health', 'ai', 'bio'],
    stages: ['early', 'growth'],
    regions: ['nationwide'],
    baseMatch: 79
  },
  {
    id: 7,
    title: '콘텐츠 크리에이터 창업 지원',
    category: '지원사업',
    prize: '1,500만원',
    region: '서울',
    dday: 9,
    docs: '채널 분석 리포트, 콘텐츠 기획안',
    interests: ['content'],
    stages: ['idea', 'pre', 'early'],
    regions: ['seoul', 'nationwide'],
    baseMatch: 91
  },
  {
    id: 8,
    title: '바이오 스타트업 액셀러레이팅',
    category: '투자유치',
    prize: '시드 3억원',
    region: '대전/충남',
    dday: 14,
    docs: '기술 설명서, 특허 현황, IR 자료',
    interests: ['bio', 'health'],
    stages: ['early', 'growth'],
    regions: ['nationwide'],
    baseMatch: 65
  }
];

const AI_RESPONSES = [
  '프로필 기반으로 3건의 신규 매칭을 찾았어요. AI 영상 광고 공모전이 가장 높은 적합도를 보입니다.',
  '해당 공모전의 제출 서류는 사업계획서, 포트폴리오, 팀 소개서입니다. 초안 작성을 도와드릴까요?',
  '마감이 D-3으로 임박했습니다. 알림을 켜두시면 하루 전에 리마인더를 보내드릴게요.',
  '예비창업 단계에 맞는 지원사업이 2건 더 있습니다. 필터를 "지원사업" 탭으로 좁혀보세요.',
  'Upstage Solar가 공고문 PDF를 분석해 핵심 일정과 자격 요건을 자동 추출할 수 있어요. 하단 업로드 영역을 이용해보세요!'
];

/* ===== DOM Elements ===== */
const themeToggle = document.getElementById('themeToggle');
const profileForm = document.getElementById('profileForm');
const profileToast = document.getElementById('profileToast');
const recommendGrid = document.getElementById('recommendGrid');
const matchCount = document.getElementById('matchCount');
const hotBannerTrack = document.getElementById('hotBannerTrack');
const hotDots = document.getElementById('hotDots');
const uploadCard = document.getElementById('uploadCard');
const fileInput = document.getElementById('fileInput');
const aiToggle = document.getElementById('aiToggle');
const aiChat = document.getElementById('aiChat');
const aiClose = document.getElementById('aiClose');
const aiChatBody = document.getElementById('aiChatBody');
const aiInput = document.getElementById('aiInput');
const aiSend = document.getElementById('aiSend');
const navTabs = document.querySelectorAll('.nav-tab');

/* ===== Theme ===== */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  localStorage.setItem('sw-theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('sw-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ===== Hot Banner Carousel ===== */
let currentSlide = 0;
let slideInterval;

function initHotBanner() {
  const slides = hotBannerTrack.querySelectorAll('.hot-slide');
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hot-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `슬라이드 ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    hotDots.appendChild(dot);
  });
  startSlideInterval();
}

function goToSlide(index) {
  const slides = hotBannerTrack.querySelectorAll('.hot-slide');
  const dots = hotDots.querySelectorAll('.hot-dot');
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    const slides = hotBannerTrack.querySelectorAll('.hot-slide');
    goToSlide((currentSlide + 1) % slides.length);
  }, 4000);
}

/* ===== Profile & Filtering ===== */
function getSelectedInterests() {
  const select = document.getElementById('userInterests');
  return Array.from(select.selectedOptions).map((o) => o.value);
}

function getProfile() {
  return {
    age: document.getElementById('userAge').value,
    education: document.getElementById('userEducation').value,
    stage: document.getElementById('startupStage').value,
    region: document.getElementById('userRegion').value,
    interests: getSelectedInterests()
  };
}

function calcMatch(listing, profile) {
  let score = listing.baseMatch;
  const interestOverlap = listing.interests.filter((i) => profile.interests.includes(i)).length;
  score += interestOverlap * 3;
  if (listing.stages.includes(profile.stage)) score += 5;
  if (listing.regions.includes(profile.region)) score += 4;
  return Math.min(score, 99);
}

function filterListings(profile) {
  return MOCK_LISTINGS.map((item) => {
    const match = calcMatch(item, profile);
    const interestMatch = item.interests.some((i) => profile.interests.includes(i));
    const stageMatch = item.stages.includes(profile.stage);
    const regionMatch = item.regions.includes(profile.region);
    const visible = interestMatch && (stageMatch || regionMatch);
    return { ...item, match, visible };
  })
    .filter((item) => item.visible)
    .sort((a, b) => b.match - a.match);
}

function renderDday(dday) {
  const urgent = dday <= 5 ? ' urgent' : '';
  return `<span class="dday-badge${urgent}">D-${dday}</span>`;
}

function renderCard(item) {
  return `
    <article class="recommend-card filtered-in" data-id="${item.id}">
      <div class="card-top">
        <span class="card-category">${item.category}</span>
        ${renderDday(item.dday)}
      </div>
      <h4>${item.title}</h4>
      <div class="card-meta">
        <span><i class="fa-solid fa-trophy"></i> ${item.prize}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${item.region}</span>
      </div>
      <div class="card-docs">
        <i class="fa-solid fa-file-lines"></i>
        ${item.docs}
      </div>
      <div class="match-rate">
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        AI 매칭률 ${item.match}%
        <div class="match-bar">
          <div class="match-bar-fill" style="width: ${item.match}%"></div>
        </div>
      </div>
    </article>
  `;
}

function renderRecommendations(profile, animate = false) {
  const filtered = filterListings(profile);
  matchCount.textContent = `${filtered.length}건 매칭`;

  if (animate) {
    recommendGrid.style.opacity = '0.4';
    setTimeout(() => {
      recommendGrid.innerHTML = filtered.map(renderCard).join('');
      recommendGrid.style.opacity = '1';
    }, 350);
  } else {
    recommendGrid.innerHTML = filtered.map(renderCard).join('');
  }
}

profileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const profile = getProfile();
  localStorage.setItem('sw-profile', JSON.stringify(profile));
  renderRecommendations(profile, true);

  profileToast.hidden = false;
  setTimeout(() => {
    profileToast.hidden = true;
  }, 3000);
});

function loadSavedProfile() {
  const saved = localStorage.getItem('sw-profile');
  if (!saved) return getProfile();
  try {
    const profile = JSON.parse(saved);
    document.getElementById('userAge').value = profile.age || '25-29';
    document.getElementById('userEducation').value = profile.education || 'bachelor';
    document.getElementById('startupStage').value = profile.stage || 'pre';
    document.getElementById('userRegion').value = profile.region || 'seoul';
    const select = document.getElementById('userInterests');
    Array.from(select.options).forEach((opt) => {
      opt.selected = (profile.interests || []).includes(opt.value);
    });
    return profile;
  } catch {
    return getProfile();
  }
}

/* ===== Nav Tabs (UI only) ===== */
navTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    navTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ===== PDF Upload (Design only) ===== */
uploadCard.addEventListener('click', () => fileInput.click());

uploadCard.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadCard.classList.add('dragover');
});

uploadCard.addEventListener('dragleave', () => {
  uploadCard.classList.remove('dragover');
});

uploadCard.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadCard.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) showUploadFeedback(file.name);
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) showUploadFeedback(file.name);
});

function showUploadFeedback(filename) {
  const hint = uploadCard.querySelector('.upload-hint');
  const original = hint.textContent;
  hint.textContent = `"${filename}" 업로드 완료! AI가 공고 항목을 분석 중입니다...`;
  hint.style.color = 'var(--primary)';
  setTimeout(() => {
    hint.textContent = original;
    hint.style.color = '';
  }, 3000);
}

/* ===== AI Chat (Upstage Solar API 연동 - 로컬 키 다이렉트 방식) ===== */

// ⚠️ [중요] 여기에 내 업스테이지 키("up_...")를 넣으세요! 
// 로컬 파일로 열었을 때 입력창 없이 바로 작동합니다.
const LOCAL_UPSTAGE_API_KEY = ""; 

const SYSTEM_PROMPT = `너는 창업 정보 큐레이션 플랫폼 'Startup Weave'의 AI 비서야. 방문자에게 밝고 정중하게, 스타트업 및 공모전 전문가처럼 답해줘. 답은 2~4문장으로, 마크다운 기호 없이 평문으로만 작성해줘. 지식에 없는 질문이나 구체적인 지원 자격 검증 요청이 오면 아는 선에서 자연스럽게 답하고 "자세한 조건은 공고문 본문을 확인하시거나, 왼쪽 필터를 설정해 나에게 맞는 매칭 결과를 확인해 보세요!"로 부드럽게 연결해줘. 과장하거나 없는 정보를 지어내지 마.`;

let chatMessages = [
  { role: "system", content: SYSTEM_PROMPT }
];

function openChat() {
  aiChat.hidden = false;
  requestAnimationFrame(() => {
    aiChat.classList.add('open');
    aiToggle.classList.add('hidden');
  });
  aiInput.focus();
}

function closeChat() {
  aiChat.classList.remove('open');
  aiToggle.classList.remove('hidden');
  setTimeout(() => {
    aiChat.hidden = true;
  }, 350);
}

aiToggle.addEventListener('click', openChat);
aiClose.addEventListener('click', closeChat);

function addMessage(text, type) {
  const div = document.createElement('div');
  div.className = `ai-message ${type}`;
  div.innerHTML = `<p>${text}</p>`;
  aiChatBody.appendChild(div);
  aiChatBody.scrollTop = aiChatBody.scrollHeight;
}

// Upstage API 호출 함수
async function callUpstageAPI(messages) {
  // 1. location.protocol이 "file:"인 경우 (내 컴퓨터 로컬 테스트)
  if (location.protocol === "file:") {
    
    // 코드 상단에 설정한 키를 먼저 가져옵니다.
    let apiKey = LOCAL_UPSTAGE_API_KEY;
    
    // 만약 상단 변수를 안 채웠다면 로컬스토리지에서 백업으로 가져옵니다.
    if (!apiKey || apiKey.startsWith("여기에_")) {
      apiKey = localStorage.getItem("UPSTAGE_API_KEY");
    }

    // 둘 다 없다면 그때만 경고를 띄웁니다.
    if (!apiKey) {
      alert("script.js 맨 위 LOCAL_UPSTAGE_API_KEY 변수에 키를 넣어주세요!");
      return null;
    }

    try {
      const response = await fetch("https://api.upstage.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "solar-pro3",
          messages: messages
        })
      });

      if (response.status === 401) {
        return "API 키가 올바르지 않거나 만료되었습니다. script.js 파일 상단을 확인해 주세요.";
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error(error);
      return "잠시 후 다시 시도해 주세요.";
    }
  } else {
    // 2. 그 외의 경우 (Vercel 배포 완료 후 환경) -> 서버 프록시 사용으로 키 완벽 보호
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: messages })
      });
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error(error);
      return "잠시 후 다시 시도해 주세요.";
    }
  }
}

async function sendAiMessage() {
  const text = aiInput.value.trim();
  if (!text) return;

  aiSend.disabled = true;
  aiInput.disabled = true;

  addMessage(text, 'user');
  aiInput.value = '';
  
  chatMessages.push({ role: "user", content: text });

  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'ai-message bot loading';
  loadingDiv.innerHTML = '<p><i class="fa-solid fa-ellipsis fa-bounce"></i> 답변을 생각하고 있어요...</p>';
  aiChatBody.appendChild(loadingDiv);
  aiChatBody.scrollTop = aiChatBody.scrollHeight;

  const reply = await callUpstageAPI(chatMessages);
  
  loadingDiv.remove();

  if (reply) {
    addMessage(reply, 'bot');
    chatMessages.push({ role: "assistant", content: reply });
  }

  aiSend.disabled = false;
  aiInput.disabled = false;
  aiInput.focus();
}

aiSend.addEventListener('click', sendAiMessage);
aiInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendAiMessage();
});

/* ===== Init ===== */
initTheme();
initHotBanner();
const profile = loadSavedProfile();
renderRecommendations(profile);
