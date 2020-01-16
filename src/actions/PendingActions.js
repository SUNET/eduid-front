export const SHOW_MODAL = "SHOW_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export function showModal() {
  return {
    type: SHOW_MODAL
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
