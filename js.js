// 버튼 클릭 게임

// 버튼 요소 가져오기
const button = document.getElementById('button');

// 점수와 시간 변수 초기화
let score = 0;
let timeLeft = 30;

// 점수와 시간 요소 가져오기
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// 타이머 카운트다운 함수
function countdown() {
  // 남은 시간 표시
  timerDisplay.innerHTML = timeLeft;

  // 시간이 0이면 게임 종료
  if (timeLeft === 0) {
    // 버튼 비활성화
    button.disabled = true;
    // 최종 점수 표시
    scoreDisplay.innerHTML = `최종 점수: ${score}`;
  } else {
    // 시간 감소
    timeLeft--;
    // 1초마다 countdown() 함수 실행
    setTimeout(countdown, 1000);
  }
}

// 버튼 클릭 시 실행할 함수
function handleClick() {
  // 점수 증가
  score++;
  // 점수 표시
  scoreDisplay.innerHTML = `점수: ${score}`;
}

// 버튼에 클릭 이벤트 추가
button.addEventListener('click', handleClick);

// 게임 시작 함수
function startGame() {
  // 버튼 활성화
  button.disabled = false;
  // 점수 초기화
  score = 0;
  scoreDisplay.innerHTML = `점수: ${score}`;
  // 타이머 시작
  countdown();
}

// 게임 시작 버튼 요소 가져오기
const startButton = document.getElementById('start-button');

// 게임 시작 버튼에 클릭 이벤트 추가
startButton.addEventListener('click', startGame);
