/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly CONSUMER_KEY: string;
    readonly CONSUMER_SECRET: string;
    readonly ACCESS_TOKEN_KEY: string;
    readonly ACCESS_TOKEN_SECRET: string;

    readonly PUSHER_APP_ID: string;
    readonly PUSHER_KEY: string;
    readonly PUSHER_SECRET: string;
  }
}
