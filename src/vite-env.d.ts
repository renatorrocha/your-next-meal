/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IA_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
