

export const PROFILE_FILLED = 'PROFILE_FILLED';

export function profileFilled (max, cur, pending, pending_confirm) {
  return {
    type: PROFILE_FILLED,
    payload: {
        max: max,
        cur: cur,
        pending: pending,
        pending_confirm: pending_confirm
    }
  };
}
