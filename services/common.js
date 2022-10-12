import { Message } from '~~/lang/message.js';

export function useCurrentsRole(rolesCurrent, rolesAccepted) {
  if (rolesCurrent && rolesAccepted) {
    for (let i = 0; i < rolesAccepted.length; i++) {
      if (rolesCurrent.includes(rolesAccepted[i])) return true;
    }
    return false;
  }
}

export function validateRequired(value) {
  if (value) {
    if (isNaN(value)) {
      if (value.trim().length < 3) return Message.minLength;
      else return true;
    }
    else {
      if (value > 0) return true;
      else return Message.greaterZero;
    }
  }
  else 
    return Message.required;
  
}

export function validateSelect(value) {
  if (!value) return Message.required;
  return true;
}

