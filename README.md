# Ubuntu Terminal Simulator

这是一个基于 Vue 3 和 Vite 构建的 Ubuntu 终端模拟器项目，旨在快速模拟桌面环境以及终端界面，方便苦逼大学生快速完成自己的相关实验报告

---

## 功能特点

- **终端模拟**：完全拟真的Ubuntu22.04界面
- **动态日志生成**：实时模拟日志输出，包括时间戳、指纹等信息。
- **SSH 连接模拟**：打印本机指纹，模拟真实的 SSH 连接过程。
- **高度还原**：支持 ANSI 转义序列，提供真实的终端输出效果。
- **自定义设置**：支持用户名、主机名等个性化配置。
- **实验模式**：内置实验选项卡，可以切换不同实验。

---

## 技术栈

- **前端框架**：Vue 3
- **构建工具**：Vite
- **终端模拟**：Xterm.js
- **依赖管理**：pnpm

---

## 项目结构

```plaintext
├── public/                # 静态资源目录
├── src/                   # 源代码目录
│   ├── assets/            # 静态资源（如图片、配置文件）
│   ├── components/        # Vue 组件
│   ├── views/             # 页面视图
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── [package.json](http://_vscodecontentref_/1)           # 项目依赖和脚本
└── [README.md](http://_vscodecontentref_/2)              # 项目说明文档