export const CODE_FOR_CONFIG = "CODE_FOR_CONFIG";


export function configCode(code) {
  return {
    type: CODE_FOR_CONFIG,
    payload: {
      code: code
    }
  };
}

