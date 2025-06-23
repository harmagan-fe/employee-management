export const utils = {
  formatDateToDotFormat(isoDateStr) {
    if (!isoDateStr || typeof isoDateStr !== "string") return "";

    const parts = isoDateStr.split("-");
    if (parts.length !== 3) return "";

    const [year, month, day] = parts;

    return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
  },
};
