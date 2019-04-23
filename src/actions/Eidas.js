
export const SHOW_EIDAS_MODAL = 'SHOW_EIDAS_MODAL';
export const HIDE_EIDAS_MODAL = 'HIDE_EIDAS_MODAL';


export function showEidasModal () {
    return {
      type: SHOW_EIDAS_MODAL,
  };
}

export function hideEidasModal () {
    return {
      type: HIDE_EIDAS_MODAL
  };
}
