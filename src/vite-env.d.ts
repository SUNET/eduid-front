/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
