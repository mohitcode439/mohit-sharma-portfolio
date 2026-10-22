/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the Spring Boot API, e.g. https://portfolio-api.onrender.com */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
