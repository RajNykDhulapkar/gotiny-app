/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    SHORT_URL_SERVICE_URL: string;
    NODE_ENV: "development" | "production" | "test";
    SESSION_SECRET: string;
  }
}

export {};
