export const displayBrief = (brief) => {
    let maxLength = 125;
      if (brief.length > maxLength) {
        return brief.slice(0, maxLength).concat("...");
      }
    return brief;
}

export default {
    displayBrief
};
