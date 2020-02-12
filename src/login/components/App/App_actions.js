export const APP_LOADED = "APP_LOADED";

// this action switches is_loaded from false to true (removes spinner and shows website)
export function appLoaded() {
  return {
    type: APP_LOADED
  };
}


