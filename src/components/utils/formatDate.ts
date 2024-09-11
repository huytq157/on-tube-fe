export const calculateCreatedTime = (timeCreated: string | Date): string => {
  const periods: { [key: string]: number } = {
    "năm trước": 365 * 30 * 24 * 60 * 60 * 1000,
    "tháng trước": 30 * 24 * 60 * 60 * 1000,
    "tuần trước": 7 * 24 * 60 * 60 * 1000,
    "ngày trước": 24 * 60 * 60 * 1000,
    "giờ trước": 60 * 60 * 1000,
    "phút trước": 60 * 1000,
  };

  const diff: number = Date.now() - new Date(timeCreated).getTime();

  for (const key in periods) {
    if (diff >= periods[key]) {
      const result = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key}`;
    }
  }

  return "Bây giờ";
};
