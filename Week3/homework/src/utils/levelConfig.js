// 레벨에 따른 게임 설정 반환
export const getLevelConfig = (level) => {
  const configs = {
    1: { rows: 4, cols: 4, timeLimit: 45 },
    2: { rows: 4, cols: 6, timeLimit: 60 },
    3: { rows: 6, cols: 6, timeLimit: 100 }
  };
  return configs[level] || configs[1];
};

export default getLevelConfig;