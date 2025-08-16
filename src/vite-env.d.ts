/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_PRODUCTION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.wav' {
  const src: string
  export default src
}
