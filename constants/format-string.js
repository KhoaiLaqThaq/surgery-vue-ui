export const displayBrief = (brief) => {
    let maxLength = 125;
      if (brief.length > maxLength) {
        return brief.slice(0, maxLength).concat("...");
      }
    return brief;
}

export const displayAmountCharacters = (maxLength, data) => {
  if (data.length > maxLength) {
    return data.slice(0, maxLength).concat("...");
  }
  return data;
}

export const displayTextTooLong = (maxLength, fieldValue) =>  {
  if (fieldValue && fieldValue.length > maxLength) {
    return fieldValue.slice(0, maxLength).concat("...");
  }
  return fieldValue;
}

export default {
    displayBrief,
    displayAmountCharacters,
    displayTextTooLong
};
