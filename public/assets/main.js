document.documentElement.classList.add('js');

const states = {
  dry:  { c: ['#1fa57c', '#74d6b6', '#d0f3e6'], temp: '따뜻하게', name: '온숨 세럼', img: '#serum',
          text: '세안 직후, 세 방울을 손바닥에서 데운 뒤 당기는 부위부터 눌러 주세요.' },
  dull: { c: ['#2bb58c', '#7fdcbf', '#d3f5ea'], temp: '포근하게', name: '온밤 크림', img: '#cream',
          text: '자기 전 손바닥에서 살짝 녹인 뒤, 얼굴을 감싸듯 지그시 눌러 주세요.' },
  hot:  { c: ['#1d9fa6', '#7dd3d6', '#d2f1f2'], temp: '서늘하게', name: '온결 토너', img: '#toner',
          text: '오늘은 덜어 내는 날. 토너만 가볍게 두드리고 손의 힘을 빼 주세요.' },
  oily: { c: ['#4fae6e', '#a3dbae', '#def3e1'], temp: '산뜻하게', name: '온풀 클렌징 밤', img: '#balm',
          text: '저녁에 체온으로 충분히 녹여 롤링한 뒤, 미온수로 개운하게 헹궈 주세요.' }
};

const root = document.documentElement.style;
const $ = id => document.getElementById(id);

document.querySelectorAll('input[name=skin]').forEach(input => {
  input.addEventListener('change', () => {
    const s = states[input.value];
    s.c.forEach((color, i) => root.setProperty('--warm' + (i + 1), color));
    $('r-temp').textContent = '오늘의 온도 · ' + s.temp;
    $('r-name').textContent = s.name;
    $('r-text').textContent = s.text;
    $('r-img').setAttribute('href', s.img);
  });
});

// 시안 단계라 입력한 주소는 어디에도 전송·저장하지 않습니다.
$('news-form').addEventListener('submit', e => {
  e.preventDefault();
  $('news-msg').textContent = '시안 페이지라 실제로 등록되지는 않습니다.';
  e.target.reset();
});

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
