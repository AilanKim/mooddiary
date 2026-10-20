# ❄️ Winter Mood Diary

> **"Whispers of the season, recorded in quiet moments."**  
> 겨울의 감성을 담아 하루의 기분과 소소한 기억을 기록하는 웹 기분일기 애플리케이션입니다.

---

## ✨ 주요 기능 (Key Features)

* **📅 감성 달력 (Interactive Calendar)**
  * 달력의 날짜를 클릭하면 해당 날짜의 기분 기록 패널이 활성화됩니다.
  * 기록된 기분 이모지가 달력 위에 표시됩니다.

* **☕ 감정 선택 & 기록 (Mood & Thoughts)**
  * 다양하고 섬세한 감정 아이콘(Cozy, Normal, Gloomy, HAppy, Joyful 등) 제공
  * 글을 저장하면 입력란 아래에 표시되며, 날짜별로 여러 글을 기록하고 각각 수정 가능

* **📊 월별 분위기 통계 (Monthly Atmosphere)**
  * 이번 달 동안 기록한 기분들의 통계를 한눈에 확인 가능

* **❄️ 오늘의 겨울 명언 (Winter Quotes)**
  * 접속 및 달력 이동 시 마음을 따뜻하게 해주는 한/영 겨울 감성 명언 제공

* **💾 데이터 저장 (Local Storage)**
  * 브라우저의 `localStorage`를 활용해 별도의 로그인 없이 일기 데이터 유지

---

## 🛠 기술 스택 (Tech Stack)

* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Styling**: Glassmorphism 디자인 패러다임, CSS Grid & Flexbox, Custom Variables
* **Version Control**: Git & GitHub

---

## 📁 프로젝트 구조 (Project Structure)

```text
mooddiary/
├── index.html        # 메인 레이아웃 및 구조
├── style.css         # Glassmorphism 테마 및 스티일링
├── script.js        # 달력 로직, 감정 선택, LocalStorage 연동
└── images/           # 앱 아이콘 및 캡처 이미지