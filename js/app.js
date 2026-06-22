// ===== 初始化 =====
function init() {
    generateDates();
    renderMatches();
    renderScoreboard();
    startRealTimeUpdate();
}

// 生成日期选择器
function generateDates() {
    const selector = document.getElementById('dateSelector');
    const today = new Date('2026-06-22');
    
    for (let i = -2; i <= 5; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const dayName = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
        
        const btn = document.createElement('button');
        btn.className = 'date-btn' + (i === 0 ? ' active' : '');
        btn.textContent = `${dateStr} (${dayName})`;
        btn.onclick = () => filterMatchesByDate(dateStr, btn);
        selector.appendChild(btn);
    }
}

// 按日期筛选
function filterMatchesByDate(date, btn) {
    document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMatches(date);
}

// 渲染比赛卡片
function renderMatches(filterDate = '2026-06-22') {
    const container = document.getElementById('matchesContainer');
    const filtered = matchesData.filter(m => m.date === filterDate);
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <div class="empty-state-text">该日期暂无比赛</div>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(match => createMatchCard(match)).join('');
}

// 创建比赛卡片HTML
function createMatchCard(match) {
    const statusMap = {
        'live': { class: 'status-live', text: '🔴 直播中' },
        'finished': { class: 'status-finished', text: '✅ 已结束' },
        'upcoming': { class: 'status-upcoming', text: '⏰ 即将开始' }
    };

    const status = statusMap[match.status];

    return `
        <div class="match-card ${match.status}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span class="match-status ${status.class}">${status.text}</span>
                <span style="font-size: 12px; color: #999;">小组赛 ${match.group}组</span>
            </div>
            
            <div class="match-time">${match.time}</div>
            
            <div class="match-body">
                <div class="team">
                    <div class="team-flag">${match.team1.flag}</div>
                    <div class="team-name">${match.team1.name}</div>
                    <div class="team-code">${match.team1.code}</div>
                </div>
                
                <div class="score-section">
                    <div class="score">
                        ${match.team1.score !== null ? match.team1.score : '-'}
                        <span style="margin: 0 10px; font-size: 36px;">:</span>
                        ${match.team2.score !== null ? match.team2.score : '-'}
                    </div>
                    <div class="competition">${match.group}组 小组赛</div>
                </div>
                
                <div class="team">
                    <div class="team-flag">${match.team2.flag}</div>
                    <div class="team-name">${match.team2.name}</div>
                    <div class="team-code">${match.team2.code}</div>
                </div>
            </div>
            
            <div class="match-info">
                <div class="info-item">
                    <div class="info-label">场地</div>
                    <div class="info-value">${match.stadium}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">观众</div>
                    <div class="info-value">${match.attendance || '-'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">轮次</div>
                    <div class="info-value">第1轮</div>
                </div>
            </div>
        </div>
    `;
}

// 渲染排行榜
function renderScoreboard() {
    const container = document.getElementById('scoreboard');
    container.innerHTML = scoreboard.map(item => `
        <div class="scoreboard-item">
            <div class="scoreboard-rank">#${item.rank}</div>
            <div class="scoreboard-team-info">
                <div class="scoreboard-team-flag">${item.flag}</div>
                <div style="flex: 1;">${item.team}</div>
            </div>
            <div class="scoreboard-stats">
                <div class="stat">
                    <div style="font-size: 11px; color: #999;">场</div>
                    <div>${item.played}</div>
                </div>
                <div class="stat">
                    <div style="font-size: 11px; color: #999;">胜</div>
                    <div>${item.won}</div>
                </div>
                <div class="stat">
                    <div style="font-size: 11px; color: #999;">进</div>
                    <div>${item.gf}</div>
                </div>
                <div class="stat">
                    <div style="font-size: 11px; color: #999;">失</div>
                    <div>${item.ga}</div>
                </div>
                <div class="stat" style="background: #2a5298; color: white; padding: 4px 8px; border-radius: 5px; font-weight: bold;">
                    ${item.points}分
                </div>
            </div>
        </div>
    `).join('');
}

// 实时数据更新（模拟WebSocket）
function startRealTimeUpdate() {
    setInterval(() => {
        // 模拟随机更新比分
        const liveMatches = matchesData.filter(m => m.status === 'live');
        liveMatches.forEach(match => {
            if (Math.random() > 0.7) {
                match.team1.score = Math.floor(Math.random() * 5);
                match.team2.score = Math.floor(Math.random() * 5);
                renderMatches();
            }
        });

        // 模拟滚动排行
        if (Math.random() > 0.8) {
            const container = document.getElementById('scoreboard');
            if (container && container.parentElement) {
                container.parentElement.scrollTop += Math.random() > 0.5 ? 50 : -50;
            }
        }
    }, 3000);
}

// 页面加载时初始化
window.addEventListener('DOMContentLoaded', init);