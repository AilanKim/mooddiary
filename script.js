/* ==========================================================================
   WINTER MOOD DIARY - JAVASCRIPT LOGIC
   ========================================================================== */

// 1. Data Store Key & Config
const MOOD_DATA_KEY = 'winter_mood_diary_entries';

const MOODS = {
    cozy: { emoji: '☕', label: 'Cozy' },
    normal: { emoji: '🌿', label: 'Normal' },
    gloomy: { emoji: '🌧️', label: 'Gloomy' },
    joyful: { emoji: '✨', label: 'Joyful' },
    happy: { emoji: '🍀', label: 'Happy' },
    fatigue: { emoji: '🛋️', label: 'Fatigue' },
    tired: { emoji: '💤', label: 'Tired' },
    angry: { emoji: '🔥', label: 'Angry' },
};

const WINTER_QUOTES = [
    { text: "In the depth of winter, I learned that there was within me an invisible summer.", author: "알베르 카뮈 (Albert Camus)" },
    { text: "Kindness is like snow — it beautifies everything it covers.", author: "칼릴 지브란 (Kahlil Gibran)" },
    { text: "겨울은 단순한 계절이 아니라, 조용한 생각들의 축제이다. (Winter is a celebration of quiet thoughts.)", author: "Anamika Mishra" },
    { text: "No winter lasts forever; no spring skips its turn.", author: "할 보랜드 (Hal Borland)" },
    { text: "눈송이의 아름다움을 감상하려면, 추위 속에 잠시 서 있어야 한다.", author: "Aristotle" },
    { text: "Winter is the time for comfort, for good food and warmth.", author: "에디스 시트웰 (Edith Sitwell)" },
    { text: "Silently, like thoughts that come and go, the snowflakes fall.", author: "William Hamilton Gibson" },
    { text: "차가운 공기 끝에 스며드는 따뜻한 온기 (Warmth amidst the winter chill)", author: "Winter Reflection" },
    { text: "What good is the warmth of summer, without the cold of winter to give it sweetness.", author: "존 스타인벡 (John Steinbeck)" },
    { text: "하얗게 쌓인 눈 위에 오늘 하루 나의 온기를 새겨본다.", author: "Silent Moments" },
    { text: "To appreciate the beauty of a snowflake, stand out in the cold.", author: "Winter Whispers" },
    { text: "깊은 밤 털장갑을 끼고 걷던 길, 조용한 고요함이 마음을 채운다.", author: "Winter Walk" },
    { text: "In seed time learn, in harvest teach, in winter enjoy.", author: "윌리엄 블레이크 (William Blake)" },
    { text: "바깥은 차갑지만, 이 순간 나의 문장만큼은 포근하길.", author: "Cozy Thoughts" },
    { text: "Snowflakes are one of nature's most fragile things, but just look what they can do when they stick together.", author: "Vesta M. Kelly" },
    { text: "단단하게 얼어붙은 시간 속에서도 다정한 말 한마디는 온기를 전한다.", author: "Kind Words" },
    { text: "He who marvels at the beauty of the world in summer will find equal cause for wonder and admiration in winter.", author: "John Burroughs" },
    { text: "모든 것이 멈춘 듯한 조용한 계절, 나에게 집중하기 가장 좋은 시간.", author: "Quiet Winter" },
    { text: "Winter forms our character and brings out our best.", author: "Tom Allen" },
    { text: "오늘 하루도 수고 많았어, 차분하고 포근한 밤이 되기를 (Warm wishes for a cozy night).", author: "Winter Evening" }
];

// 2. State Management
let currentDate = new Date();
let selectedDateStr = formatDateKey(new Date());
let selectedMood = null;
let entries = loadEntries();

// 3. DOM Elements
const currentMonthYearEl = document.getElementById('currentMonthYear');
const calendarGridEl = document.getElementById('calendarGrid');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');

const selectedDateTextEl = document.getElementById('selectedDateText');
const detailsPanelEl = document.querySelector('.details-panel');
const diaryNoteEl = document.getElementById('diaryNote');
const saveEntryBtn = document.getElementById('saveEntryBtn');
const deleteEntryBtn = document.getElementById('deleteEntryBtn');
const moodButtons = document.querySelectorAll('.mood-btn');
const statsContainerEl = document.getElementById('statsContainer');
const quoteTextEl = document.getElementById('quoteText');
const quoteAuthorEl = document.getElementById('quoteAuthor');

// 4. Initialization
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    renderCalendar();
    selectDate(selectedDateStr);
    updateRandomQuote();
});

// 5. Event Listeners Setup
function setupEventListeners() {
prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
        updateRandomQuote();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    updateRandomQuote();
});

moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        moodButtons.forEach(b => b.classList.remove('mood-btn--active'));
        btn.classList.add('mood-btn--active');
        selectedMood = btn.dataset.mood;
    });
});

saveEntryBtn.addEventListener('click', saveCurrentEntry);
deleteEntryBtn.addEventListener('click', deleteCurrentEntry);
}

// 6. Calendar Rendering (Monday Start Logic)
function renderCalendar() {
calendarGridEl.innerHTML = '';

const year = currentDate.getFullYear();
const month = currentDate.getMonth();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
currentMonthYearEl.textContent = `${monthNames[month]} ${year}`;

const firstDayOfMonth = new Date(year, month, 1);
const lastDayOfMonth = new Date(year, month + 1, 0);
const totalDays = lastDayOfMonth.getDate();

  // Convert Sunday (0) -> 6, Monday (1) -> 0 for Monday start
let firstDayIndex = firstDayOfMonth.getDay() - 1;
if (firstDayIndex === -1) firstDayIndex = 6;

  // Empty leading slots
for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('calendar-day', 'calendar-day--empty');
    calendarGridEl.appendChild(emptyCell);
}

const todayStr = formatDateKey(new Date());

for (let day = 1; day <= totalDays; day++) {
    const dayDate = new Date(year, month, day);
    const dateKey = formatDateKey(dayDate);

    const dayCell = document.createElement('div');
    dayCell.classList.add('calendar-day');
    if (dateKey === todayStr) dayCell.classList.add('calendar-day--today');
    if (dateKey === selectedDateStr) dayCell.classList.add('calendar-day--selected');

    const dayNumSpan = document.createElement('span');
    dayNumSpan.textContent = day;
    dayCell.appendChild(dayNumSpan);

    if (entries[dateKey] && entries[dateKey].mood) {
        const emojiSpan = document.createElement('span');
        emojiSpan.classList.add('calendar-day__emoji');
        emojiSpan.textContent = MOODS[entries[dateKey].mood]?.emoji || '';
        dayCell.appendChild(emojiSpan);
    }

    dayCell.addEventListener('click', () => selectDate(dateKey, true));
    calendarGridEl.appendChild(dayCell);
}

renderMonthlyStats();
}

// 7. Date Selection Handler
function selectDate(dateKey, scrollToDetails = false) {
    selectedDateStr = dateKey;

document.querySelectorAll('.calendar-day').forEach(cell => {
    cell.classList.remove('calendar-day--selected');
});

renderCalendar();

const [y, m, d] = dateKey.split('-').map(Number);
const dateObj = new Date(y, m - 1, d);
const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
selectedDateTextEl.textContent = dateObj.toLocaleDateString('en-US', options);

const entry = entries[dateKey];
if (entry) {
    selectedMood = entry.mood;
    diaryNoteEl.value = entry.note || '';

    moodButtons.forEach(btn => {
        btn.classList.toggle('mood-btn--active', btn.dataset.mood === entry.mood);
    });
    deleteEntryBtn.classList.remove('hidden');
} else {
    resetForm();
}

if (scrollToDetails && window.matchMedia('(max-width: 820px)').matches) {
    detailsPanelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
}

// 8. Save & Delete Handlers
function saveCurrentEntry() {
if (!selectedMood) {
    alert('Please select a mood icon before saving.');
    return;
}

entries[selectedDateStr] = {
    mood: selectedMood,
    note: diaryNoteEl.value.trim(),
    updatedAt: new Date().toISOString()
};

saveEntries();
renderCalendar();
deleteEntryBtn.classList.remove('hidden');
}

function deleteCurrentEntry() {
    if (confirm('Do you want to delete this mood log?')) {
        delete entries[selectedDateStr];
        saveEntries();
        resetForm();
        renderCalendar();
    }
}

function resetForm() {
    selectedMood = null;
    diaryNoteEl.value = '';
    moodButtons.forEach(btn => btn.classList.remove('mood-btn--active'));
    deleteEntryBtn.classList.add('hidden');
}

// 9. Monthly Stats
function renderMonthlyStats() {
    statsContainerEl.innerHTML = '';
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const moodCounts = {};

Object.keys(entries).forEach(dateKey => {
    const [y, m] = dateKey.split('-').map(Number);
    if (y === currentYear && m - 1 === currentMonth) {
        const mood = entries[dateKey].mood;
        if (mood) {
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        }
    }
    });

    if (Object.keys(moodCounts).length === 0) {
    statsContainerEl.innerHTML = `<span style="font-size: 0.75rem; color: var(--color-text-dim);">No entries recorded this month.</span>`;
    return;
    }

    Object.entries(moodCounts).forEach(([mood, count]) => {
        const pill = document.createElement('div');
        pill.classList.add('stat-pill');
        pill.innerHTML = `<span>${MOODS[mood]?.emoji}</span> <span>${MOODS[mood]?.label}: ${count}d</span>`;
        statsContainerEl.appendChild(pill);
    });
}

// 10. Helpers
function updateRandomQuote() {
    const randomIndex = Math.floor(Math.random() * WINTER_QUOTES.length);
    const quote = WINTER_QUOTES[randomIndex];
    quoteTextEl.textContent = `"${quote.text}"`;
    quoteAuthorEl.textContent = `— ${quote.author}`;
}

function formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function loadEntries() {
    const saved = localStorage.getItem(MOOD_DATA_KEY);
    return saved ? JSON.parse(saved) : {};
}

function saveEntries() {
    localStorage.setItem(MOOD_DATA_KEY, JSON.stringify(entries));
}