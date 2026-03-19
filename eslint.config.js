// eslint.config.js（Flat Config 格式）
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
// 1. 导入 unused-imports 插件（核心）
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, ignore } from "eslint/config";

export default defineConfig([
  // 修正：globalIgnores → ignore（Flat Config 正确API）
  ignore(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser, // 显式指定 TS 解析器（Flat Config 需手动加）
      parserOptions: {
        project: "./tsconfig.json", // 关联 TS 配置（可选，增强类型检测）
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // 2. 正确注册插件（Flat Config 需用对象格式）
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint.plugin,
      "unused-imports": unusedImports, // 注册 unused-imports 插件
    },
    rules: {
      // ========== 核心：无用 import/变量 检测规则 ==========
      // 关闭原生未使用变量检查
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // 启用无用 import 检测（error 级别触发自动修复）
      "unused-imports/no-unused-imports": "error",

      // 细化未使用变量检测规则
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // ========== 辅助：React 相关优化 ==========
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]);
