/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ALGOLIA_APP_ID: string;
  readonly PUBLIC_ALGOLIA_API_KEY: string;

  readonly PUBLIC_MEILISEARCH_HOST: string;
  readonly PUBLIC_MEILISEARCH_INDEX_BLOG: string;
  readonly PUBLIC_MEILISEARCH_INDEX_DOCS: string;
  readonly PUBLIC_MEILISEARCH_INDEX_GUIDES: string;
  readonly PUBLIC_MEILISEARCH_INDEX_REFERENCES: string;
  readonly PRIVATE_MEILISEARCH_MASTER_KEY: string;
  readonly PRIVATE_MEILISEARCH_DOCUMENTS_ADMIN_API_KEY: string;
  readonly PUBLIC_MEILISEARCH_DOCUMENTS_CLIENT_API_KEY: string;

  readonly NODE_ENV: string;

  readonly PUBLIC_SUPPORT_API_HOST: string;

  readonly SUPPORT_ALLOW_ORIGIN_ADDR: string;
  readonly SUPPORT_RATE_LIMIT_WINDOW_MINUTES: number;
  readonly SUPPORT_RATE_LIMIT_MAX_REQ: number;
  readonly SUPPORT_RATE_LIMIT_PATHS: string;

  readonly PUBLIC_GRAPHQL_ENDPOINT: string;
  readonly PUBLIC_APP_HOSTING_URL: string;
  readonly PUBLIC_APP_AGENTS_URL: string;

  readonly PUBLIC_DYNAMIC_ENVIRONMENT_ID: string;

  readonly PUBLIC_POSTHOG_HOST: string;
  readonly PUBLIC_POSTHOG_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
