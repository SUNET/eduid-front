import {createAction} from "@reduxjs/toolkit";

// this action switches is_loaded from false to true (removes spinner and shows website)
export const appLoaded = createAction("APP_LOADED");
