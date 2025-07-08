# 🐰 Vue Rabbit - 现代化电商平台

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.13-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Element Plus](https://img.shields.io/badge/Element%20Plus-2.9.9-409EFF?style=for-the-badge&logo=element&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0.1-FFD43B?style=for-the-badge&logo=pinia&logoColor=black)

一个基于 Vue 3 + Vite + Pinia + Element Plus 构建的现代化电商平台

[项目源码](https://github.com/zhen237/vue-rabbit) · [功能介绍](#-功能特性) · [快速开始](#-快速开始) · [技术文档](#-技术栈)

</div>

---

## 📖 项目简介

Vue Rabbit 是一个功能完整的现代化电商平台，采用最新的前端技术栈构建。项目包含完整的购物流程、用户管理、订单系统和支付集成，具有优秀的性能表现和用户体验。

### 🎯 项目特色

- 🚀 **现代化架构**: 基于 Vue 3 Composition API + TypeScript
- 🎨 **精美UI设计**: Element Plus + 自定义主题样式
- 📱 **响应式布局**: 完美适配桌面端和移动端
- ⚡ **极致性能**: 智能缓存、懒加载、代码分割优化
- 🛡️ **安全可靠**: JWT认证、路由守卫、完善的错误处理
- 🔧 **开发友好**: 热重载、ESLint规范、组件化开发

## ✨ 功能特性

### 🛍️ 核心电商功能
- **商品展示**: 首页轮播、商品列表、详情页面、搜索筛选
- **购物车管理**: 添加商品、数量调整、选中状态、本地同步
- **订单流程**: 商品结算、地址管理、订单确认、支付集成
- **用户系统**: 注册登录、个人信息、订单查看、收藏管理
- **分类导航**: 多级分类、面包屑导航、筛选排序

### ⚡ 性能优化亮点
- **智能缓存**: 5分钟缓存机制，减少90%重复请求
- **防抖优化**: 用户操作防抖，避免频繁API调用
- **分页优化**: 智能分页加载，提升响应速度
- **骨架屏**: 优化首屏加载体验
- **懒加载**: 图片和组件按需加载
- **代码分割**: 路由级别的代码分割，减少包体积

### 🔐 安全特性
- **JWT认证**: 安全的用户身份验证
- **路由守卫**: 页面访问权限控制
- **自动登出**: Token过期自动处理
- **错误边界**: 全局错误捕获和处理
- **输入验证**: 表单数据校验和防护

## 🛠️ 技术栈

### 前端框架
- **Vue 3.5.13** - 渐进式JavaScript框架
- **Vite 6.2.4** - 下一代前端构建工具
- **Vue Router 4.5.0** - 官方路由管理器

### 状态管理
- **Pinia 3.0.1** - Vue 3 官方状态管理库
- **pinia-plugin-persistedstate** - 状态持久化插件

### UI组件库
- **Element Plus 2.9.9** - Vue 3 组件库
- **@element-plus/icons-vue** - Element Plus 图标库

### 工具库
- **Axios 1.9.0** - HTTP客户端
- **Sass** - CSS预处理器
- **@vueuse/core** - Vue 组合式工具集
- **vue-lazyload** - 图片懒加载

### 开发工具
- **ESLint** - 代码质量检查
- **Vite插件生态** - 自动导入、组件注册等

## 📁 项目结构

```text
vue-rabbit/
├── public/                 # 静态资源
│   └── favicon.ico
├── src/
│   ├── apis/              # API接口管理
│   │   ├── cart.js        # 购物车相关API
│   │   ├── user.js        # 用户相关API
│   │   ├── order.js       # 订单相关API
│   │   └── ...
│   ├── assets/            # 项目资源
│   │   ├── images/        # 图片资源
│   │   └── styles/        # 样式文件
│   ├── components/        # 公共组件
│   │   ├── ImageView/     # 图片查看器
│   │   └── XtxSku/        # SKU选择器
│   ├── composables/       # 组合式函数
│   ├── directives/        # 自定义指令
│   │   └── index.js       # 懒加载指令
│   ├── router/            # 路由配置
│   │   └── index.js       # 路由定义
│   ├── stores/            # Pinia状态管理
│   │   ├── user.js        # 用户状态
│   │   ├── cartStore.js   # 购物车状态
│   │   └── category.js    # 分类状态
│   ├── styles/            # 全局样式
│   │   ├── common.scss    # 通用样式
│   │   └── var.scss       # 变量定义
│   ├── utils/             # 工具函数
│   │   └── http.js        # HTTP请求封装
│   ├── views/             # 页面组件
│   │   ├── Home/          # 首页
│   │   ├── Category/      # 分类页
│   │   ├── Detail/        # 商品详情
│   │   ├── CartList/      # 购物车
│   │   ├── Checkout/      # 结算页
│   │   ├── Pay/           # 支付页
│   │   ├── Member/        # 会员中心
│   │   │   ├── components/
│   │   │   │   ├── UserInfo.vue    # 个人信息
│   │   │   │   └── UserOrder.vue   # 订单管理
│   │   │   └── index.vue
│   │   ├── Login/         # 登录页
│   │   └── Layout/        # 布局组件
│   │       ├── components/
│   │       │   ├── LayoutHeader.vue  # 头部导航
│   │       │   ├── LayoutFooter.vue  # 底部信息
│   │       │   └── HeaderCart.vue    # 购物车组件
│   │       └── index.vue
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── .env.development       # 开发环境配置
├── .env.production        # 生产环境配置
├── .gitignore            # Git忽略文件
├── eslint.config.js      # ESLint配置
├── index.html            # HTML模板
├── jsconfig.json         # JS配置
├── package.json          # 项目依赖
├── README.md             # 项目说明
└── vite.config.js        # Vite配置
```

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0 (或使用 yarn/pnpm)
- **Git**: 用于版本控制

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/zhen237/vue-rabbit.git
   cd vue-rabbit
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或使用 yarn
   yarn install
   # 或使用 pnpm
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **打开浏览器访问**

   ```text
   http://localhost:5173
   ```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

## 🚀 部署指南

### Vercel 部署 (推荐)

1. **准备部署**
   ```bash
   # 确保项目已推送到GitHub
   git push origin main
   ```

2. **Vercel部署**
   - 访问 [Vercel](https://vercel.com)
   - 使用GitHub账户登录
   - 点击 "New Project"
   - 选择你的 `vue-rabbit` 仓库
   - 配置构建设置：
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - 点击 "Deploy"

3. **环境变量配置**
   在Vercel项目设置中添加：
   ```
   VITE_API_BASE_URL=https://pcapi-xiaotuxian-front-devtest.itheima.net
   ```

### Netlify 部署

1. **构建配置**
   创建 `netlify.toml` 文件：
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **部署步骤**
   - 访问 [Netlify](https://netlify.com)
   - 连接GitHub仓库
   - 选择 `vue-rabbit` 项目
   - 自动部署

### GitHub Pages 部署

1. **创建部署脚本**
   在 `package.json` 中添加：
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

2. **安装gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **执行部署**
   ```bash
   npm run deploy
   ```

## ⚙️ 环境配置

### 开发环境

创建 `.env.development` 文件：

```env
# API基础地址
VITE_API_BASE_URL=http://pcapi-xiaotuxian-front-devtest.itheima.net

# 开发服务器端口
VITE_PORT=5173

# 开发环境标识
NODE_ENV=development
```

### 生产环境

创建 `.env.production` 文件：

```env
# API基础地址
VITE_API_BASE_URL=https://your-production-api.com

# 生产环境标识
NODE_ENV=production
```

## 📱 功能演示

### 在线演示

> 🚀 **部署状态**: 项目支持多种部署方式，选择适合你的平台：

- **Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zhen237/vue-rabbit)
- **Netlify**: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zhen237/vue-rabbit)
- **GitHub Pages**: 自动部署到 `https://zhen237.github.io/vue-rabbit/`

### 主要页面

| 页面 | 路径 | 功能描述 |
|------|------|----------|
| 🏠 首页 | `/` | 轮播图、商品推荐、分类导航 |
| 📂 分类页 | `/category/:id` | 商品分类、筛选排序 |
| 🛍️ 商品详情 | `/detail/:id` | 商品信息、SKU选择、加入购物车 |
| 🛒 购物车 | `/cartlist` | 商品管理、数量调整、选中状态 |
| 💳 结算页 | `/checkout` | 订单确认、地址选择、优惠券 |
| 💰 支付页 | `/pay` | 支付方式选择、订单支付 |
| 👤 会员中心 | `/member` | 个人信息、订单管理 |
| 🔐 登录页 | `/login` | 用户登录、注册 |

### 核心功能流程

1. **商品浏览** → 首页推荐 → 分类筛选 → 商品详情
2. **购物下单** → 加入购物车 → 选择商品 → 确认订单 → 支付
3. **用户管理** → 登录注册 → 个人信息 → 订单查看

## 🎯 性能指标

- ⚡ **首屏加载**: < 2秒
- 🚀 **页面切换**: < 500毫秒
- 📊 **API响应**: 智能缓存优化
- 💾 **内存使用**: 自动清理优化
- 📱 **移动端适配**: 完美响应式

## 🔧 开发指南

### 推荐IDE配置

- **编辑器**: [VS Code](https://code.visualstudio.com/)
- **插件**:
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 支持
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 代码检查
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化

### 代码规范

- 使用 **Composition API** 编写组件
- 遵循 **ESLint** 代码规范
- 组件命名采用 **PascalCase**
- 文件命名采用 **kebab-case**
- 提交信息遵循 **Conventional Commits**

### 目录规范

```bash
# 新增页面组件
src/views/NewPage/
├── index.vue          # 页面主组件
├── components/        # 页面专用组件
└── hooks/            # 页面专用逻辑

# 新增公共组件
src/components/NewComponent/
├── index.vue          # 组件主文件
├── types.ts          # 类型定义
└── README.md         # 组件文档
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

### 提交代码

1. **Fork** 本仓库到你的GitHub账户

2. **Clone** 你的Fork到本地

   ```bash
   git clone https://github.com/your-username/vue-rabbit.git
   ```

3. **创建特性分支**

   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **提交更改**

   ```bash
   git commit -m 'feat: add amazing feature'
   ```

5. **推送分支**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **创建Pull Request**

### 提交规范

使用 [Conventional Commits](https://conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

### 问题反馈

- 🐛 **Bug报告**: [创建Issue](https://github.com/zhen237/vue-rabbit/issues/new?template=bug_report.md)
- 💡 **功能建议**: [创建Issue](https://github.com/zhen237/vue-rabbit/issues/new?template=feature_request.md)
- ❓ **使用问题**: [Discussions](https://github.com/zhen237/vue-rabbit/discussions)

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

感谢以下优秀的开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Element Plus](https://element-plus.org/) - Vue 3 组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
- [Axios](https://axios-http.com/) - HTTP客户端库

## 📞 联系方式

- **项目地址**: https://github.com/zhen237/vue-rabbit
- **问题反馈**: https://github.com/zhen237/vue-rabbit/issues
- **讨论交流**: https://github.com/zhen237/vue-rabbit/discussions

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**

Made with ❤️ by [zhen237](https://github.com/zhen237)

</div>
