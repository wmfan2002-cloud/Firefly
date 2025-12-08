# Firefly 博客个性化修改指南

> 本文档帮助你快速定位需要修改的文件，将这个 fork 的博客变成你自己的个人网站。

---

## 📋 修改优先级清单

### 🔴 必须修改（核心个人信息）

| 修改内容 | 文件路径 | 说明 |
|---------|---------|------|
| 站点标题/描述/URL | `src/config/siteConfig.ts` | 网站名称、副标题、域名、SEO关键词 |
| 个人头像/昵称/简介 | `src/config/profileConfig.ts` | 侧边栏显示的个人信息和社交链接 |
| 关于页面 | `src/content/spec/about.md` | "关于我"页面的详细介绍 |
| 网站图标 | `public/assets/images/favicon.ico` | 浏览器标签页图标 |
| 头像图片 | `public/assets/images/avatar.webp` | 替换为你自己的头像 |

---

## 📁 配置文件详解

### 1. 站点基础配置 `src/config/siteConfig.ts`

```typescript
// 需要修改的关键字段：
title: "你的博客名称",           // 网站标题
subtitle: "你的副标题",          // 网站副标题
site_url: "https://你的域名",    // 部署后的网站地址
description: "网站描述...",      // SEO描述
keywords: ["关键词1", "关键词2"], // SEO关键词

lang: "zh_CN",                   // 语言：zh_CN/zh_TW/en/ja/ru

// 主题色配置
themeColor: {
  hue: 165,                      // 色相 0-360，可自定义主题色
  fixed: false,                  // true=隐藏主题色选择器
  defaultMode: "system",         // light/dark/system
},

// 导航栏Logo
navbarLogo: {
  type: "image",
  value: "/assets/images/你的logo.svg",  // 替换为你的logo
  alt: "Logo描述",
},
navbarTitle: "导航栏标题",

// 站点开始日期（用于计算运行天数）
siteStartDate: "2025-01-01",

// 横幅配置
backgroundWallpaper: {
  src: {
    desktop: "/assets/images/你的桌面背景.png",
    mobile: "/assets/images/你的移动端背景.webp",
  },
  banner: {
    homeText: {
      title: "你的主页标题",
      subtitle: ["副标题1", "副标题2", "..."],
    },
  },
},
```

### 2. 个人资料配置 `src/config/profileConfig.ts`

```typescript
export const profileConfig: ProfileConfig = {
  avatar: "/assets/images/avatar.webp",  // 头像路径
  name: "你的名字",                       // 显示名称
  bio: "你的个人简介",                    // 一句话介绍
  links: [                               // 社交链接
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/你的用户名",
    },
    {
      name: "Bilibili",
      icon: "fa6-brands:bilibili",
      url: "https://space.bilibili.com/你的UID",
    },
    // 可添加更多...
  ],
};
```

### 3. 导航栏配置 `src/config/navBarConfig.ts`

修改导航栏链接、下拉菜单等。

### 4. 友情链接 `src/config/friendsConfig.ts`

```typescript
export const friendsConfig: FriendLink[] = [
  {
    title: "友链名称",
    imgurl: "头像URL",
    desc: "描述",
    siteurl: "网站地址",
    tags: ["标签"],
    weight: 10,      // 权重越大越靠前
    enabled: true,   // 是否显示
  },
];
```

### 5. 评论系统 `src/config/commentConfig.ts`

支持：Twikoo、Waline、Giscus、Disqus、Artalk

```typescript
export const commentConfig: CommentConfig = {
  type: "twikoo",  // 选择评论系统类型，"none"=关闭
  twikoo: {
    envId: "你的Twikoo服务地址",
  },
  // 或配置其他评论系统...
};
```

### 6. 其他可选配置

| 文件 | 功能 |
|-----|------|
| `src/config/announcementConfig.ts` | 顶部公告栏 |
| `src/config/musicConfig.ts` | 音乐播放器（支持网易云歌单） |
| `src/config/pioConfig.ts` | 看板娘（Spine/Live2D） |
| `src/config/sakuraConfig.ts` | 樱花飘落特效 |
| `src/config/sponsorConfig.ts` | 赞助页面配置 |
| `src/config/footerConfig.ts` | 页脚自定义HTML |
| `src/config/adConfig.ts` | 侧边栏广告 |
| `src/config/fontConfig.ts` | 自定义字体 |

---

## 📝 内容文件

### 文章目录 `src/content/posts/`

- 删除示例文章，添加你自己的文章
- 文章格式为 Markdown (`.md`) 或 MDX (`.mdx`)
- 创建新文章：`pnpm new-post 文章名`

**文章 Frontmatter 模板：**
```yaml
---
title: 文章标题
published: 2025-01-01
description: 文章描述
image: ./cover.jpg    # 封面图，或用 "api" 随机获取
tags: [标签1, 标签2]
category: 分类名
draft: false          # true=草稿不发布
---
```

### 特殊页面 `src/content/spec/`

| 文件 | 用途 |
|-----|------|
| `about.md` | 关于我页面 |
| `friends.md` | 友链页面底部自定义内容 |
| `guestbook.md` | 留言板页面内容 |

---

## 🖼️ 静态资源 `public/`

需要替换的图片资源：

```
public/
├── assets/
│   └── images/
│       ├── favicon.ico          # 网站图标
│       ├── avatar.webp          # 个人头像
│       ├── logo.svg             # 导航栏Logo
│       ├── 桌面背景.png          # 横幅背景图
│       └── sponsor/             # 赞助收款码
│           ├── alipay.png
│           └── wechat.png
```

---

## 🚀 快速开始步骤

1. **安装依赖**
   ```bash
   pnpm install
   ```

2. **修改核心配置**（按优先级）
   - `src/config/siteConfig.ts` - 站点信息
   - `src/config/profileConfig.ts` - 个人资料
   - `src/content/spec/about.md` - 关于页面

3. **替换图片资源**
   - 头像、Logo、背景图、favicon

4. **删除示例文章，添加自己的内容**
   - 删除 `src/content/posts/` 下的示例文章
   - 使用 `pnpm new-post 文章名` 创建新文章

5. **本地预览**
   ```bash
   pnpm dev
   ```
   访问 http://localhost:4321

6. **构建部署**
   ```bash
   pnpm build
   pnpm preview  # 本地预览构建结果
   ```

---

## 📚 常用命令

| 命令 | 说明 |
|-----|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm preview` | 预览构建结果 |
| `pnpm new-post <名称>` | 创建新文章 |
| `pnpm check` | Astro 诊断检查 |
| `pnpm lint` | 代码规范检查 |
| `pnpm format` | 代码格式化 |

---

## 🔧 功能开关

在 `src/config/siteConfig.ts` 中控制页面显示：

```typescript
pages: {
  sponsor: false,    // 赞助页面
  guestbook: true,   // 留言板（需配置评论系统）
  bangumi: true,     // 番组计划页面
},
```

---

## 📖 更多文档

- [Firefly 官方文档](https://docs-firefly.cuteleaf.cn/)
- [Astro 官方文档](https://docs.astro.build/zh-cn/)
