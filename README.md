# 戴兜的小屋



这是戴兜的个人介绍页面，主要使用 Vue3 + Vite + Windicss 搭建，在此之前，有一个<a href="https://github.com/daidr/homepage" target="_blank">原生的版本</a>，但是年久失修，已经没法正常维护了，所以决定重构一下。

## 在线预览

<a href="https://im.daidr.me" target="_blank">https://im.daidr.me</a>

## 开发

```bash
# 安装依赖
pnpm i
```

```bash
# 启动开发环境
pnpm dev
```

```bash
# 构建
pnpm build
```

## 我能使用么？

当然可以，但是可能修改起来不太方便，下面是一些注意事项。( `@/` 表示 `/src/` 目录)

* `@/config` 下存放着一些配置文件，比如 `base.js` 存放了基础配置，`friends.js` 存放了朋友列表。
* `@/pages` 下存放着所有页面，每个页面都是一个单独的文件夹，文件夹下必须有一个 `routes.js` 文件，用于配置路由。你可以为路由设置元数据 `meta.pageTitle` 来配置页面标题。
* `@/routes/router.js` 会自动载入 `@/pages` 下的所有路由，一般情况下**不需要**修改。
* `@/components` 下存放着一些公共组件，比如 `@/components/LazyImage.vue` 就是图片懒加载组件，仅在图片元素可见时才会加载图片。
* **[关键]** 路由动效会在路由切换时生效，对于需要应用翻转效果的容器，你可以为其赋予 class `transition-page-wrapper`，路由过渡效果会自动应用到该容器上。对于同级别的其他容器，可能会因为没有动效而导致突兀，所以你可以为其赋予 class `transition-extra-wrapper`，那么该容器将会在路由切换完成时进行淡入淡出动效。（具体的使用方法可以参考[404页面](./src/pages/404/NotFoundPage.vue)）
