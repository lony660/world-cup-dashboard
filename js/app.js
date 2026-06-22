// ===== API 配置 =====
// 使用免费公开 API：worldcup.json.dev
const API_CONFIG = {
    BASE_URL: 'https://worldcup.json.dev/en',
    API_KEY: null, // 无需 Key
};

// 从免费 API 获取数据
async function fetchRealTimeData() {
    try {
        console.log('🔄 从 worldcup.json.dev 获取数据...');
        
        // 获取所有比赛
        const response = await fetch(`${API_CONFIG.BASE_URL}.json`);\n        const data = await response.json();
        
        if (data && data.matches && data.matches.length > 0) {
            updateMatchesFromAPI(data.matches);
            return true;
        }
    } catch (error) {
        console.error('❌ 数据获取失败，继续使用本地数据:', error);
    }
    return false;
}

// 处理 API 返回的数据
function updateMatchesFromAPI(apiMatches) {
    apiMatches.forEach(apiMatch => {
        // 查找对应的本地比赛
        const localMatch = matchesData.find(m => 
            m.team1.code === apiMatch.home_team_country && 
            m.team2.code === apiMatch.away_team_country
        );
        
        if (localMatch && apiMatch.status !== 'future') {
            // 更新比分
            localMatch.team1.score = apiMatch.home_team.goals || 0;
            localMatch.team2.score = apiMatch.away_team.goals || 0;
            
            // 更新比赛状态
            if (apiMatch.status === 'completed') {
                localMatch.status = 'finished';
            } else if (apiMatch.status === 'in_progress') {
                localMatch.status = 'live';
            } else {
                localMatch.status = 'upcoming';
            }
            
            console.log(`✅ 更新: ${localMatch.team1.name} ${localMatch.team1.score}:${localMatch.team2.score} ${localMatch.team2.name}`);\n        }\n    });\n}\n\n// ===== 初始化 =====\nfunction init() {\n    generateDates();\n    renderMatches();\n    renderScoreboard();\n    startRealTimeUpdate();\n}\n\n// 生成日期选择器\nfunction generateDates() {\n    const selector = document.getElementById('dateSelector');\n    const today = new Date('2026-06-22');\n    \n    for (let i = -2; i <= 5; i++) {\n        const date = new Date(today);\n        date.setDate(date.getDate() + i);\n        const dateStr = date.toISOString().split('T')[0];\n        const dayName = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];\n        \n        const btn = document.createElement('button');\n        btn.className = 'date-btn' + (i === 0 ? ' active' : '');\n        btn.textContent = `${dateStr} (${dayName})`;\n        btn.onclick = () => filterMatchesByDate(dateStr, btn);\n        selector.appendChild(btn);\n    }\n}\n\n// 按日期筛选\nfunction filterMatchesByDate(date, btn) {\n    document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));\n    btn.classList.add('active');\n    renderMatches(date);\n}\n\n// 按小组筛选\nfunction filterMatchesByGroup(groupName, btn) {\n    if (btn) {\n        document.querySelectorAll('.group-btn').forEach(b => b.classList.remove('active'));\n        btn.classList.add('active');\n    }\n    renderMatches(null, groupName);\n}\n\n// 渲染比赛卡片\nfunction renderMatches(filterDate = '2026-06-22', filterGroup = null) {\n    const container = document.getElementById('matchesContainer');\n    let filtered = matchesData;\n    \n    // 按日期筛选\n    if (filterDate) {\n        filtered = filtered.filter(m => m.date === filterDate);\n    }\n    \n    // 按小组筛选\n    if (filterGroup) {\n        filtered = filtered.filter(m => m.group === filterGroup);\n    }\n    \n    if (filtered.length === 0) {\n        container.innerHTML = `\n            <div class=\"empty-state\">\n                <div class=\"empty-state-icon\">📅</div>\n                <div class=\"empty-state-text\">暂无比赛数据</div>\n            </div>\n        `;\n        return;\n    }\n\n    // 按日期和小组分组显示\n    const grouped = {};\n    filtered.forEach(match => {\n        const key = `${match.date}_${match.group}`;\n        if (!grouped[key]) {\n            grouped[key] = [];\n        }\n        grouped[key].push(match);\n    });\n    \n    let html = '';\n    Object.keys(grouped).sort().forEach(key => {\n        const matches = grouped[key];\n        const firstMatch = matches[0];\n        \n        // 添加日期和小组标题\n        html += `\n            <div style=\"margin-top: 20px; margin-bottom: 10px;\">\n                <h3 style=\"color: white; font-size: 16px;\">\n                    📅 ${firstMatch.date} | 🏆 ${firstMatch.group}组\n                </h3>\n            </div>\n        `;\n        \n        // 添加该日期小组的所有比赛\n        html += matches.map(match => createMatchCard(match)).join('');\n    });\n    \n    container.innerHTML = html;\n}\n\n// 创建比赛卡片HTML\nfunction createMatchCard(match) {\n    const statusMap = {\n        'live': { class: 'status-live', text: '🔴 直播中' },\n        'finished': { class: 'status-finished', text: '✅ 已结束' },\n        'upcoming': { class: 'status-upcoming', text: '⏰ 即将开始' }\n    };\n\n    const status = statusMap[match.status];\n\n    return `\n        <div class=\"match-card ${match.status}\">\n            <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;\">\n                <span class=\"match-status ${status.class}\">${status.text}</span>\n                <span style=\"font-size: 12px; color: #999;\">🏆 ${match.group}组 小组赛</span>\n            </div>\n            \n            <div class=\"match-time\">${match.time}</div>\n            \n            <div class=\"match-body\">\n                <div class=\"team\">\n                    <div class=\"team-flag\">${match.team1.flag}</div>\n                    <div class=\"team-name\">${match.team1.name}</div>\n                    <div class=\"team-code\">${match.team1.code}</div>\n                </div>\n                \n                <div class=\"score-section\">\n                    <div class=\"score\">\n                        ${match.team1.score !== null ? match.team1.score : '-'}\n                        <span style=\"margin: 0 10px; font-size: 36px;\">:</span>\n                        ${match.team2.score !== null ? match.team2.score : '-'}\n                    </div>\n                    <div class=\"competition\">${match.group}组 小组赛</div>\n                </div>\n                \n                <div class=\"team\">\n                    <div class=\"team-flag\">${match.team2.flag}</div>\n                    <div class=\"team-name\">${match.team2.name}</div>\n                    <div class=\"team-code\">${match.team2.code}</div>\n                </div>\n            </div>\n            \n            <div class=\"match-info\">\n                <div class=\"info-item\">\n                    <div class=\"info-label\">场地</div>\n                    <div class=\"info-value\">${match.stadium}</div>\n                </div>\n                <div class=\"info-item\">\n                    <div class=\"info-label\">观众</div>\n                    <div class=\"info-value\">${match.attendance || '-'}</div>\n                </div>\n                <div class=\"info-item\">\n                    <div class=\"info-label\">轮次</div>\n                    <div class=\"info-value\">第1轮</div>\n                </div>\n            </div>\n        </div>\n    `;\n}\n\n// 渲染排行榜\nfunction renderScoreboard() {\n    const container = document.getElementById('scoreboard');\n    // 按积分排序\n    const sorted = [...scoreboard].sort((a, b) => b.points - a.points);\n    \n    container.innerHTML = sorted.map((item, index) => `\n        <div class=\"scoreboard-item\">\n            <div class=\"scoreboard-rank\">#${index + 1}</div>\n            <div class=\"scoreboard-team-info\">\n                <div class=\"scoreboard-team-flag\">${item.flag}</div>\n                <div style=\"flex: 1;\">${item.team}</div>\n            </div>\n            <div class=\"scoreboard-stats\">\n                <div class=\"stat\">\n                    <div style=\"font-size: 11px; color: #999;\">场</div>\n                    <div>${item.played}</div>\n                </div>\n                <div class=\"stat\">\n                    <div style=\"font-size: 11px; color: #999;\">胜</div>\n                    <div>${item.won}</div>\n                </div>\n                <div class=\"stat\">\n                    <div style=\"font-size: 11px; color: #999;\">进</div>\n                    <div>${item.gf}</div>\n                </div>\n                <div class=\"stat\">\n                    <div style=\"font-size: 11px; color: #999;\">失</div>\n                    <div>${item.ga}</div>\n                </div>\n                <div class=\"stat\" style=\"background: #2a5298; color: white; padding: 4px 8px; border-radius: 5px; font-weight: bold;\">\n                    ${item.points}分\n                </div>\n            </div>\n        </div>\n    `).join('');\n}\n\n// 实时数据更新\nfunction startRealTimeUpdate() {\n    // 页面加载时立即获取一次\n    fetchRealTimeData().then(() => {\n        renderMatches();\n        renderScoreboard();\n    });\n    \n    // 然后每60秒更新一次\n    setInterval(() => {\n        console.log('🔄 更新实时数据...');\n        fetchRealTimeData().then(() => {\n            renderMatches();\n            renderScoreboard();\n        });\n    }, 60000); // 每60秒更新一次\n}\n\n// 页面加载时初始化\nwindow.addEventListener('DOMContentLoaded', init);