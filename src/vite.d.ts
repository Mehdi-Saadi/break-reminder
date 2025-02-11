interface ImportMetaEnv {
  readonly VITE_PRODUCTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.wav' {
  const src: string;
  export default src;
}
