// declaration
// import.meta.env.MODEやPRODが使えるようになる
// export const IS_PROD = import.meta.env.PROD; //import.meta.env.MODE
// export const GA_ID = import.meta.env.PUBLIC_GA_ID;

/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID: string; // ← 公開可能な変数（接頭辞 PUBLIC_ が必要）
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
