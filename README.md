# ⚽ 2026 FIFA 世界杯实时战报

一个精美的世界杯战报实时更新UI界面，提供每日比赛信息和实时排行榜。

## 🌟 功能特性

- 📅 **日期选择** - 快速查看不同日期的比赛
- 🏆 **实时排行榜** - 显示各国积分排名
- ⚽ **比赛卡片** - 详细的比赛信息和比分
- 🔴 **实时更新** - 模拟实时数据更新
- 📱 **响应式设计** - 支持各种设备屏幕
- 🎨 **精美界面** - 现代化的视觉设计

## 🚀 快速开始

### 1. 克隆仓库
```bash
git clone https://github.com/lony660/world-cup-dashboard.git
cd world-cup-dashboard
```

### 2. 用浏览器打开
直接在浏览器中打开 `index.html` 文件，或使用 VSCode 的 Live Server 插件：

```bash
# 如果安装了 Live Server 插件
# 在 VSCode 中右键点击 index.html
# 选择 "Open with Live Server"
```

### 3. 或使用 Python 简单服务器
```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 📁 项目结构

```
world-cup-dashboard/
├── index.html          # 主HTML文件
├── css/
│   └── style.css       # 样式表
├── js/
│   ├── data.js         # 比赛数据
│   └── app.js          # 应用逻辑
└── README.md           # 说明文档
```

## 🖥️ 使用说明

1. **选择日期** - 点击顶部日期按钮查看该日期的比赛
2. **查看排行** - 在排行榜中查看各国积分排名
3. **实时更新** - 页面会自动更新比赛数据

## 🔌 接入真实API

如要接入真实的世界杯数据，可以修改 `js/app.js` 中的数据获取方式：

```javascript
// 使用真实API
async function fetchRealMatches() {
    const response = await fetch('https://api.api-football.com/v3/fixtures?league=1&season=2026');
    const data = await response.json();
    // 处理数据并更新UI
}
```

## 🛠️ 技术栈

- HTML5
- CSS3（含动画和响应式布局）
- Vanilla JavaScript（无框架依赖）

## 📄 许可证

MIT

## 👨‍💻 作者

lony660

## 💬 反馈

如有问题或建议，欢迎提交 Issue！