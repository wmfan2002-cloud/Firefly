# Repository Guidelines

## Project Structure & Module Organization
- `src/`: 核心代码；`components/` 与 `layouts/` 存放可复用 Astro/Svelte 组件，`pages/` 作为路由入口，`content/` 管理 MD/MDX 文章（受 `content.config.ts` 校验），`styles/` 存放全局样式，`utils/` 与 `plugins/` 放置工具与 Astro/Markdown 插件。
- `public/`: 静态资源原样输出；`docs/` 为多语言说明；`scripts/new-post.js` 用于创建新文章模板；根目录配置包含 `astro.config.mjs`、`tailwind.config.cjs`、`biome.json` 等。
- 站点基础信息、导航与多语言文案位于 `src/config`、`src/constants`、`src/i18n`；调整配置时请同时检查对应的翻译和常量是否匹配。

## Build, Test, and Development Commands
- `pnpm install`: 唯一支持的包管理器（`preinstall` 阻止其他工具）。
- `pnpm dev` / `pnpm start`: 启动本地开发；`pnpm build` 产出静态站点；`pnpm preview` 预览构建结果。
- `pnpm check`: Astro 诊断；`pnpm type-check`: TypeScript 声明检查；`pnpm lint`: Biome 代码规范并自动修复；`pnpm format`: Biome 格式化 `src/`。
- 内容相关：`pnpm new-post` 生成新文章骨架；`pnpm index:meili` 将内容推送至 Meilisearch（需要配置凭据）。
- 如需对齐部署环境，使用 Node 18+，并参考 `vercel.json` 的输出设置；本地调试可在构建后运行 `pnpm preview` 检查缓存与路由行为。

## Coding Style & Naming Conventions
- 以 TypeScript/ESM 为主，2 空格缩进；组件文件使用 `PascalCase`（`.astro`/`.svelte`），工具函数 `camelCase`，常量 `SCREAMING_SNAKE_CASE`（存放于 `src/constants`）。
- 文章文件与页面 slug 建议 kebab-case；Markdown/MDX frontmatter 至少包含 `title`、`description`、`publishDate`，并维护封面与标签字段。
- 保持导入有序与单引号/双引号规则由 Biome 决定，提交前运行 `pnpm format && pnpm lint`。

## Architecture & Configuration Notes
- 基于 Astro 5 + Svelte 岛屿架构，布局与 SEO 由 Astro 负责，交互组件通过 `client:*` 控制水合范围，避免全局脚本干扰。
- 路由采用文件系统驱动（`src/pages`），内容数据通过 `src/content` 管道生成类型安全的集合，便于在组件中直接导入元数据。
- 环境变量建议放入 `.env.local`，如搜索所需的 `MEILISEARCH_HOST`、`MEILISEARCH_API_KEY` 等；勿将密钥提交到版本库，脚本使用 `process.env` 读取。
- 页面过渡依赖 Swup（`@swup/astro`），新增自定义脚本或第三方库时需确认不会破坏路由切换与滚动位置恢复。

## Testing Guidelines
- 当前无专门单元测试套件；提交前应至少运行 `pnpm check`、`pnpm type-check`，并通过 `pnpm preview` 进行页面冒烟验证。
- 若新增测试，置于相关功能目录，命名为原文件名加 `.test.ts`/`.spec.ts`，并保持可在 CI 中通过。
- 发布前建议执行 `pnpm build`，确认 Markdown 链接与资源路径无误，再运行 `pnpm preview` 以检查页面交互和动画。

## Commit & Pull Request Guidelines
- 遵循 Conventional Commits（如 `feat:`、`fix:`、`refactor:`、`perf:`），与现有提交记录保持一致。
- PR 应包含变更摘要、关联 Issue 链接、UI 变更截图/录屏（如适用），并注明已执行的验证命令。
- 在请求评审前确保新内容元数据完整、链接有效、构建/预览无错误。
- 分支命名建议使用 `feature/<topic>` 或 `fix/<issue-id>`，保持与 PR 标题与内容一致，便于回溯。
