export function useCurrentsRole(rolesCurrent, rolesAccepted) {
  if (rolesCurrent && rolesAccepted) {
    for (let i = 0; i < rolesAccepted.length; i++) {
      if (rolesCurrent.includes(rolesAccepted[i])) return true;
    }
    return false;
  }
}

export function displayTextTooLong(length, fieldValue) {
  if (fieldValue.length > length) {
    return fieldValue.slice(0, length).concat("...");
  }
  return fieldValue;
}
