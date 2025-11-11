// declaration
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID: string; // ← 公開可能な変数（接頭辞 PUBLIC_ が必要）
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
