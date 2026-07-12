// state.js - Gerenciamento central do estado do jogo
class GameState {
    constructor() {
        this.defaultState = {
            completedMissions: {},
            completedChallenges: {},
            totalXP: 0,
            totalEarned: 0,
            totalSpent: 0,
            streakDays: 0,
            maxStreak: 0,
            lastActiveDate: null,
            activeTimer: null,
            surpriseMission: null,
            surpriseMissionCompleted: false,
            streakBonusGiven: {},
            pointBalances: [],
            classXP: { guerreiro: 0, mago: 0, arquiteto: 0, druida: 0 },
            achievements: {},
            achievementStats: {
                readStreak: 0, totalPushups: 0, bedStreak: 0, waterDays: 0,
                mealsCooked: 0, meditations: 0, earlyRiser: 0, wordsLearned: 0,
                maxStreak: 0, maxLevel: 1,
            },
            gachaDiscount: null,
            gachaMultiplier: null,
            gachaMultiplierDate: null,
            currentBoss: null,
            currentBossProgress: 0,
            bossCompleted: false,
            bossWeekStart: null,
            activeBossEffect: null,
            bossEffectExpires: null,
            activeInvestments: [],
            completedInvestments: 0,
            missionHistory: {},
            dailyPointsHistory: {},
        };

        this.state = this.loadState();
        this.points = new PointsManager(this.state);
        this.initDay();
    }

    loadState() {
        const saved = localStorage.getItem('lifeRpgStateV2');
        if (!saved) return { ...this.defaultState, pointBalances: [], achievements: {}, achievementStats: { ...this.defaultState.achievementStats } };

        try {
            const parsed = JSON.parse(saved);
            return {
                ...this.defaultState,
                ...parsed,
                pointBalances: Array.isArray(parsed.pointBalances) ? parsed.pointBalances : [],
                achievements: parsed.achievements || {},
                achievementStats: { ...this.defaultState.achievementStats, ...(parsed.achievementStats || {}) },
                classXP: { guerreiro: 0, mago: 0, arquiteto: 0, druida: 0, ...(parsed.classXP || {}) },
                activeInvestments: Array.isArray(parsed.activeInvestments) ? parsed.activeInvestments : [],
                missionHistory: parsed.missionHistory || {},
                dailyPointsHistory: parsed.dailyPointsHistory || {},
            };
        } catch (e) {
            console.error('Erro ao carregar:', e);
            return { ...this.defaultState, pointBalances: [] };
        }
    }

    save() {
        this.points.clean();
        localStorage.setItem('lifeRpgStateV2', JSON.stringify(this.state));
    }

    getToday() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    getWeekStart() {
        const d = new Date();
        d.setDate(d.getDate() - d.getDay());
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    initDay() {
        const today = this.getToday();
        if (this.state.lastActiveDate === today) return;

        // Atualizar streak
        if (this.state.lastActiveDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
            const hadMissions = this.state.completedMissions[yStr]?.length > 0;

            if (hadMissions) {
                this.state.streakDays++;
                if (this.state.streakDays > this.state.maxStreak) this.state.maxStreak = this.state.streakDays;
            } else if (this.state.lastActiveDate !== yStr) {
                this.state.streakDays = 0;
            }
        }

        this.state.completedMissions[today] = [];
        this.state.surpriseMission = null;
        this.state.surpriseMissionCompleted = false;
        this.state.gachaMultiplier = null;
        this.state.gachaMultiplierDate = null;
        this.state.lastActiveDate = today;

        // Boss semanal
        const weekStart = this.getWeekStart();
        if (this.state.bossWeekStart !== weekStart) {
            this.state.bossWeekStart = weekStart;
            this.state.bossCompleted = false;
            this.state.currentBossProgress = 0;
            this.state.activeBossEffect = null;
            this.state.bossEffectExpires = null;
            this.state.currentBoss = WEEKLY_BOSSES[Math.floor(Math.random() * WEEKLY_BOSSES.length)];
        }

        this.updateChallenges();
        this.checkStreakBonuses();
        this.checkInvestments();
        this.save();
    }

    toggleMission(missionId) {
        const today = this.getToday();
        this.state.completedMissions[today] = this.state.completedMissions[today] || [];

        const mission = ALL_MISSIONS.find(m => m.id === missionId);
        if (!mission) return { added: false, points: 0 };

        const index = this.state.completedMissions[today].indexOf(missionId);

        if (index === -1) {
            // Completar missão
            this.state.completedMissions[today].push(missionId);

            let points = mission.points;
            const multiplier = this.getMissionMultiplier();
            if (multiplier > 1) points *= multiplier;

            const className = MISSION_CLASS_MAP[missionId];
            if (className) {
                const classLevel = this.getClassLevel(className);
                const bonus = CLASSES[className].bonus[classLevel];
                if (bonus?.apply) points = bonus.apply(points);
                this.state.classXP[className] = (this.state.classXP[className] || 0) + mission.points;
            }

            this.points.add(points, 'daily');
            this.updateAchievementStats(missionId);
            this.updateBossProgress();
            this.updateAnalytics();
            this.updateChallenges();
            this.checkAchievements();
            return { added: true, points };
        } else {
            // Desmarcar missão
            this.state.completedMissions[today].splice(index, 1);
            this.points.remove(mission.points);
            return { added: false, points: mission.points };
        }
    }

    buyItem(itemId) {
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        if (!item) return null;

        const discount = this.getDiscount();
        const finalCost = Math.floor(item.cost * discount);

        if (!this.points.spend(finalCost)) return null;
        if (this.state.gachaDiscount) this.state.gachaDiscount = null;
        this.save();
        return { ...item, finalCost };
    }

    rollGacha() {
        if (this.points.getAvailable() < 5 || !this.points.spend(5)) return null;

        const roll = Math.random() * 100;
        let cumulative = 0;
        let reward = GACHA_REWARDS[0];

        for (const r of GACHA_REWARDS) {
            cumulative += r.chance;
            if (roll <= cumulative) { reward = r; break; }
        }

        if (reward.points > 0) this.points.add(reward.points, 'gacha');
        if (reward.discount) this.state.gachaDiscount = true;
        if (reward.multiplier) {
            this.state.gachaMultiplier = true;
            this.state.gachaMultiplierDate = this.getToday();
        }
        if (reward.freeItem) {
            const items = SHOP_ITEMS.filter(i => i.tier <= 3);
            reward.freeItemData = items[Math.floor(Math.random() * items.length)];
        }
        this.save();
        return reward;
    }

    createInvestment(amount, tierIndex) {
        const tier = INVESTMENT_TIERS[tierIndex];
        if (!tier || this.points.getAvailable() < amount || amount < tier.min || !this.points.spend(amount)) return null;

        const investment = {
            id: Date.now(),
            amount,
            tierIndex,
            startDate: Date.now(),
            endDate: Date.now() + (tier.days * 24 * 60 * 60 * 1000),
            returnAmount: Math.floor(amount * (1 + tier.interest / 100)),
        };
        this.state.activeInvestments.push(investment);
        this.save();
        return investment;
    }

    checkInvestments() {
        const now = Date.now();
        let hasUpdate = false;

        this.state.activeInvestments = this.state.activeInvestments.filter(inv => {
            if (inv.endDate <= now) {
                this.points.add(inv.returnAmount, 'investment');
                this.state.completedInvestments++;
                hasUpdate = true;
                return false;
            }
            return true;
        });

        if (hasUpdate) this.save();
    }

    getMissionMultiplier() {
        if (this.state.gachaMultiplier && this.state.gachaMultiplierDate === this.getToday()) return 2;
        if (this.state.activeBossEffect && this.state.bossEffectExpires > Date.now()) {
            if (this.state.currentBoss?.type === 'screentime') return 2;
        }
        return 1;
    }

    getDiscount() {
        const dominant = this.getDominantClass();
        const level = this.getClassLevel(dominant);
        if (dominant === 'arquiteto' && level >= 3) return 0.8;
        if (dominant === 'druida' && level >= 2) return 0.7;
        if (this.state.gachaDiscount) return 0.5;
        return 1.0;
    }

    getDominantClass() {
        const entries = Object.entries(this.state.classXP || {});
        if (entries.length === 0) return 'guerreiro';
        entries.sort((a, b) => b[1] - a[1]);
        return entries[0][0];
    }

    getClassLevel(className) {
        const xp = this.state.classXP?.[className] || 0;
        const config = CLASSES[className];
        return Math.min(Math.floor(xp / config.xpPerLevel) + 1, config.niveis.length);
    }

    getClassName(className) {
        return CLASSES[className].niveis[this.getClassLevel(className) - 1];
    }

    getLevel() {
        return Math.floor(this.state.totalXP / CONFIG.XP_PER_LEVEL) + 1;
    }

    getActiveInvestments() {
        return this.state.activeInvestments || [];
    }

    updateBossProgress() {
        if (!this.state.currentBoss || this.state.bossCompleted) return;

        const today = this.getToday();
        const completed = this.state.completedMissions[today] || [];
        const boss = this.state.currentBoss;
        let progress = this.state.currentBossProgress;

        if (boss.type === 'exercise' && completed.some(m => ['m1', 'm2', 'm8', 'm9', 'm10'].includes(m))) progress++;
        else if (boss.type === 'study' && completed.includes('m7')) progress++;
        else if (boss.type === 'sleep' && completed.includes('m9')) progress++;
        else if (boss.type === 'nofastfood' && (completed.includes('m5') || completed.includes('m15'))) progress++;

        this.state.currentBossProgress = Math.min(progress, boss.target);

        if (this.state.currentBossProgress >= boss.target && !this.state.bossCompleted) {
            this.state.bossCompleted = true;
            this.state.activeBossEffect = boss.dropEffect;
            this.state.bossEffectExpires = Date.now() + (3 * 24 * 60 * 60 * 1000);
            this.points.add(boss.points, 'boss');
            this.save();
            Toast.show(`🐉 Boss derrotado! ${boss.emoji} ${boss.name} +${boss.points}pts!`);
        }
        this.save();
    }

    updateChallenges() {
        this.state.completedChallenges = this.state.completedChallenges || {};
        CHALLENGES.forEach(c => {
            if (!this.state.completedChallenges[c.id]) this.state.completedChallenges[c.id] = { progress: 0, completed: false };
        });

        const last7Days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            last7Days.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
        }

        let exerciseDays = 0, studyDays = 0;
        last7Days.forEach(dateStr => {
            const missions = this.state.completedMissions[dateStr] || [];
            if (missions.some(m => ['m1', 'm2', 'm8', 'm9', 'm10'].includes(m))) exerciseDays++;
            if (missions.includes('m7')) studyDays++;
        });

        this.state.completedChallenges['c1'].progress = Math.min(exerciseDays, 7);
        this.state.completedChallenges['c2'].progress = Math.min(studyDays, 5);

        CHALLENGES.forEach(c => {
            const data = this.state.completedChallenges[c.id];
            if (data.progress >= c.target && !data.completed) {
                data.completed = true;
                this.points.add(c.points, 'challenge');
                Toast.show(`🏆 Desafio completo! +${c.points} pontos!`);
            }
        });
        this.save();
    }

    checkStreakBonuses() {
        this.state.streakBonusGiven = this.state.streakBonusGiven || {};
        Object.entries(CONFIG.STREAK_BONUSES).forEach(([days, bonus]) => {
            if (this.state.streakDays >= parseInt(days) && !this.state.streakBonusGiven[days]) {
                this.state.streakBonusGiven[days] = true;
                this.points.add(bonus, 'streak');
                Toast.show(`🔥 Streak de ${days} dias! +${bonus} pontos!`);
            }
        });
        this.save();
    }

    updateAchievementStats(missionId) {
        const stats = this.state.achievementStats;
        const map = { 'm6': 'readStreak', 'm2': 'totalPushups', 'm3': 'bedStreak', 'm4': 'waterDays', 'm15': 'mealsCooked', 'm11': 'meditations', 'm12': 'wordsLearned' };
        if (map[missionId]) stats[map[missionId]] = (stats[map[missionId]] || 0) + (missionId === 'm2' ? 100 : missionId === 'm12' ? 5 : 1);
        if (this.state.streakDays > stats.maxStreak) stats.maxStreak = this.state.streakDays;
        stats.maxLevel = Math.max(stats.maxLevel, this.getLevel());
        this.save();
    }

    checkAchievements() {
        const stats = this.state.achievementStats;
        ACHIEVEMENTS.forEach(ach => {
            if (this.state.achievements[ach.id]) return;
            if ((stats[ach.track] || 0) >= ach.target) {
                this.state.achievements[ach.id] = { unlockedAt: Date.now() };
                this.points.add(ach.points, 'challenge');
                Toast.show(`🏆 Conquista: ${ach.emoji} ${ach.name}! +${ach.points}pts`);
            }
        });
        this.save();
    }

    updateAnalytics() {
        const today = this.getToday();
        const completed = this.state.completedMissions[today] || [];
        if (!this.state.missionHistory[today]) this.state.missionHistory[today] = {};
        completed.forEach(id => {
            this.state.missionHistory[today][id] = (this.state.missionHistory[today][id] || 0) + 1;
        });
        this.state.dailyPointsHistory[today] = completed.reduce((sum, id) => {
            const m = ALL_MISSIONS.find(ms => ms.id === id);
            return sum + (m ? m.points : 0);
        }, 0);
        this.save();
    }

    reset() {
        this.state = { ...this.defaultState, pointBalances: [], lastActiveDate: this.getToday() };
        localStorage.removeItem('lifeRpgStateV2');
        this.points = new PointsManager(this.state);
        this.save();
    }
}

const State = new GameState();