// 比赛数据
const matchesData = [
    {
        id: 1,
        date: '2026-06-22',
        time: '10:00',
        group: 'A',
        status: 'upcoming',
        team1: { name: '阿根廷', code: 'ARG', flag: '🇦🇷', score: null },
        team2: { name: '奥地利', code: 'AUT', flag: '🇦🇹', score: null },
        stadium: '大都会体育场',
        attendance: null
    },
    {
        id: 2,
        date: '2026-06-22',
        time: '14:00',
        group: 'B',
        status: 'upcoming',
        team1: { name: '法国', code: 'FRA', flag: '🇫🇷', score: null },
        team2: { name: '伊拉克', code: 'IRQ', flag: '🇮🇶', score: null },
        stadium: '阿美利亚体育场',
        attendance: null
    },
    {
        id: 3,
        date: '2026-06-22',
        time: '17:00',
        group: 'C',
        status: 'upcoming',
        team1: { name: '挪威', code: 'NOR', flag: '🇳🇴', score: null },
        team2: { name: '塞内加尔', code: 'SEN', flag: '🇸🇳', score: null },
        stadium: '美洲航空中心',
        attendance: null
    },
    {
        id: 4,
        date: '2026-06-22',
        time: '20:00',
        group: 'A',
        status: 'upcoming',
        team1: { name: '约旦', code: 'JOR', flag: '🇯🇴', score: null },
        team2: { name: '阿尔及利亚', code: 'ALG', flag: '🇩🇿', score: null },
        stadium: '足球场',
        attendance: null
    },
    {
        id: 5,
        date: '2026-06-21',
        time: '16:00',
        group: 'D',
        status: 'finished',
        team1: { name: '西班牙', code: 'ESP', flag: '🇪🇸', score: 4 },
        team2: { name: '沙特阿拉伯', code: 'KSA', flag: '🇸🇦', score: 0 },
        stadium: '墨西哥城体育场',
        attendance: '87500'
    },
    {
        id: 6,
        date: '2026-06-21',
        time: '19:00',
        group: 'E',
        status: 'finished',
        team1: { name: '日本', code: 'JPN', flag: '🇯🇵', score: 4 },
        team2: { name: '突尼斯', code: 'TUN', flag: '🇹🇳', score: 0 },
        stadium: '体育场',
        attendance: '62000'
    },
    {
        id: 7,
        date: '2026-06-21',
        time: '22:00',
        group: 'F',
        status: 'finished',
        team1: { name: '美国', code: 'USA', flag: '🇺🇸', score: 2 },
        team2: { name: '澳大利亚', code: 'AUS', flag: '🇦🇺', score: 0 },
        stadium: '亚利桑那州体育场',
        attendance: '60700'
    },
    {
        id: 8,
        date: '2026-06-23',
        time: '10:00',
        group: 'D',
        status: 'upcoming',
        team1: { name: '葡萄牙', code: 'POR', flag: '🇵🇹', score: null },
        team2: { name: '乌兹别克斯坦', code: 'UZB', flag: '🇺🇿', score: null },
        stadium: '休斯顿体育场',
        attendance: null
    },
    {
        id: 9,
        date: '2026-06-23',
        time: '13:00',
        group: 'E',
        status: 'upcoming',
        team1: { name: '英格兰', code: 'ENG', flag: '🇬🇧', score: null },
        team2: { name: '加纳', code: 'GHA', flag: '🇬🇭', score: null },
        stadium: '足球场',
        attendance: null
    }
];

// 排行榜数据
const scoreboard = [
    { rank: 1, team: '阿根廷', flag: '🇦🇷', played: 2, won: 2, drawn: 0, lost: 0, gf: 7, ga: 1, points: 6 },
    { rank: 2, team: '法国', flag: '🇫🇷', played: 2, won: 2, drawn: 0, lost: 0, gf: 9, ga: 1, points: 6 },
    { rank: 3, team: '西班牙', flag: '🇪🇸', played: 1, won: 1, drawn: 0, lost: 0, gf: 4, ga: 0, points: 3 },
    { rank: 4, team: '日本', flag: '🇯🇵', played: 1, won: 1, drawn: 0, lost: 0, gf: 4, ga: 0, points: 3 },
    { rank: 5, team: '美国', flag: '🇺🇸', played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 0, points: 3 },
    { rank: 6, team: '巴西', flag: '🇧🇷', played: 1, won: 1, drawn: 0, lost: 0, gf: 3, ga: 0, points: 3 }
];