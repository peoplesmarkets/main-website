/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_OAUTH_URL: string;
  readonly VITE_AUTH_OAUTH_CLIENT_ID: string;
  readonly VITE_AUTH_OAUTH_ORG_ID: string;
  readonly VITE_AUTH_OAUTH_REDIRECT_URL: string;
  readonly VITE_AUTH_OAUTH_LOGOUT_REDIRECT_URL: string;
  readonly VITE_OPEN_SOURCE_REPOSITORIES_URL: string;
  readonly VITE_MAIN_WEBSITE_URL: string;
  readonly VITE_SERIVCE_APIS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "markdown-it-image-figures";
