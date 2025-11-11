/**
 * Fisher-Yates 셔플 함수
 * @param {Array} array - 섞고 싶은 배열
 * @param {Function} rng - 랜덤 함수 (기본값: Math.random)
 * @returns {Array} - 섞인 배열 (얕은 복사본)
 */
const shuffle = (array, rng = Math.random) => {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * 레벨별 덱을 만들어주는 함수
 * @param {number} level - 보드 크기를 결정 (1, 2, 3 중 하나)
 * @returns {Array} - 섞인 카드 배열 { id: string, value: number }[]
 * 
 * 규칙:
 * 1) level에 따라 rows x cols 크기의 보드 생성
 * 2) 각 숫자 값이 2장씩 존재
 * 3) 카드마다 고유 id 부여 ex. "3-a", "3-b"
 */

export const buildDeck = (level = 1) => {
  const LEVEL_TO_GRID = { 1: [4, 4], 2: [4, 6], 3: [6, 6] };
  
  const [rows, cols] = LEVEL_TO_GRID[level] ?? [4, 4];
  const total = rows * cols;

  // 카드 총 개수는 짝수여야 함
  if (total % 2 !== 0) throw new Error('카드 개수는 짝수여야 해요.');

  const pairs = total / 2;
  const base = Array.from({ length: pairs }, (_, i) => i + 1);

  // 각 숫자 값을 2장씩 생성하고, 고유 id를 부여
  const duplicated = [];
  for (let i = 0; i < base.length; i += 1) {
    const v = base[i];
    duplicated.push({ id: `${v}-a`, value: v });
    duplicated.push({ id: `${v}-b`, value: v });
  }

  // 매 게임마다 다른 배치를 위해 마지막에 셔플
  return shuffle(duplicated);
};
