declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    DEV_ROOT_ELEM_SELECTOR: string;
  }
}
