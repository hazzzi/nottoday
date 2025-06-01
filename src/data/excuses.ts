export interface Excuse {
  id: number;
  text: string;
  theme: ExcuseTheme;
  emoji: string;
}

export type ExcuseTheme = '직장' | '연인' | '친구' | '부모님' | '만능';

export const excuses: Excuse[] = [
  // 직장용 핑계
  {
    id: 1,
    text: "지하철에서 햄스터가 풀려서 열차 운행이 중단됐어요",
    theme: '직장',
    emoji: '🐹'
  },
  {
    id: 2,
    text: "엘리베이터가 우주정거장이라고 착각해서 계속 위로만 가고 있어요",
    theme: '직장',
    emoji: '🚀'
  },
  {
    id: 3,
    text: "집 앞 길고양이가 저를 출근시키지 않겠다고 선언했어요",
    theme: '직장',
    emoji: '🐱'
  },
  {
    id: 4,
    text: "컴퓨터가 월요일 증후군에 걸려서 부팅을 거부하고 있어요",
    theme: '직장',
    emoji: '💻'
  },

  // 연인용 핑계
  {
    id: 5,
    text: "사랑이 너무 무거워서 침대에서 못 일어나겠어...",
    theme: '연인',
    emoji: '💕'
  },
  {
    id: 6,
    text: "오늘 꿈에서 당신과 너무 행복해서 현실로 돌아오기 싫어요",
    theme: '연인',
    emoji: '💭'
  },
  {
    id: 7,
    text: "마음이 이미 당신한테 가 있어서 몸이 따라가질 못해요",
    theme: '연인',
    emoji: '💖'
  },
  {
    id: 8,
    text: "당신 생각에 너무 잠겨서 길을 잃었어요... 마음의 길을요",
    theme: '연인',
    emoji: '💌'
  },

  // 친구용 핑계
  {
    id: 9,
    text: "유튜브 알고리즘이 너무 완벽해서 하루가 순식간에 지나갔어",
    theme: '친구',
    emoji: '📱'
  },
  {
    id: 10,
    text: "넷플릭스가 저를 인질로 잡고 있어요. 구해주세요",
    theme: '친구',
    emoji: '📺'
  },
  {
    id: 11,
    text: "침대가 저를 너무 사랑해서 놓아주질 않아요",
    theme: '친구',
    emoji: '🛏️'
  },
  {
    id: 12,
    text: "치킨을 시켰는데 배달원이 우주인이었어요. 지구로 돌아오는 중",
    theme: '친구',
    emoji: '🍗'
  },

  // 부모님용 핑계
  {
    id: 13,
    text: "컴퓨터 업데이트가 78%에서 3시간째 멈춰있어요",
    theme: '부모님',
    emoji: '⏳'
  },
  {
    id: 14,
    text: "와이파이가 갑자기 외국어를 배우기 시작했어요",
    theme: '부모님',
    emoji: '📶'
  },
  {
    id: 15,
    text: "핸드폰이 자동차보다 느린 거북이 모드로 설정되어 있었어요",
    theme: '부모님',
    emoji: '🐢'
  },
  {
    id: 16,
    text: "택시 기사님이 네비게이션 대신 별자리를 보고 운전하시네요",
    theme: '부모님',
    emoji: '⭐'
  },

  // 만능 핑계
  {
    id: 17,
    text: "시간이 상대성이론을 적용해서 저에게만 느리게 흘러가고 있어요",
    theme: '만능',
    emoji: '⏰'
  },
  {
    id: 18,
    text: "중력이 오늘따라 2배로 강해져서 움직이기 힘들어요",
    theme: '만능',
    emoji: '🌍'
  },
  {
    id: 19,
    text: "평행우주의 저와 몸이 바뀌었는데 그 저는 집순이였어요",
    theme: '만능',
    emoji: '🌌'
  },
  {
    id: 20,
    text: "오늘은 제 행운 지수가 -127이라서 나가면 안 된다고 했어요",
    theme: '만능',
    emoji: '🎲'
  },
  {
    id: 21,
    text: "갑자기 투명인간이 되었는데 아직 컨트롤이 안 돼요",
    theme: '만능',
    emoji: '👻'
  },
  {
    id: 22,
    text: "고양이가 키보드를 점령해서 일을 할 수 없어요",
    theme: '만능',
    emoji: '🐈'
  },
  {
    id: 23,
    text: "오늘 운세에 '집에 있는 것이 길하다'고 나왔어요",
    theme: '만능',
    emoji: '🔮'
  },
  {
    id: 24,
    text: "배터리가 1%인데 충전기가 숨바꼭질 중이에요",
    theme: '만능',
    emoji: '🔋'
  }
];

export const getRandomExcuse = (theme?: ExcuseTheme): Excuse => {
  const filteredExcuses = theme ? excuses.filter(excuse => excuse.theme === theme) : excuses;
  const randomIndex = Math.floor(Math.random() * filteredExcuses.length);
  return filteredExcuses[randomIndex];
};

export const themes: ExcuseTheme[] = ['직장', '연인', '친구', '부모님', '만능']; 