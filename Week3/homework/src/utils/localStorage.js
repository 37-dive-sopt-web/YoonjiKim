// 게임 기록(레벨, 타임스탬프)을 localStorage에 저장
export const saveGameRecord = (record) => {
  const records = getGameRecords();
  records.push({
    level: record.level,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem("gameRecords", JSON.stringify(records));
};

// localStorage에서 게임 기록 불러오기
export const getGameRecords = () => {
  const records = localStorage.getItem("gameRecords");
  return records ? JSON.parse(records) : [];
};

//localStorage의 게임 기록 초기화
export const clearGameRecords = () => {
  localStorage.removeItem("gameRecords");
};

export default { saveGameRecord, getGameRecords, clearGameRecords };
