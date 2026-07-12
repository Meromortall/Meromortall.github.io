// points.js - Gerenciamento de pontos com validade
class PointsManager {
    constructor(state) {
        this.state = state;
    }

    add(amount, type = 'daily') {
        const validityDays = CONFIG.POINT_VALIDITY[type] || 7;
        const balance = {
            amount,
            expiresAt: Date.now() + (validityDays * 24 * 60 * 60 * 1000),
            type,
            addedAt: Date.now(),
        };
        this.state.pointBalances.push(balance);
        this.state.totalEarned += amount;
        this.state.totalXP += amount;
        this.clean();
    }

    remove(amount) {
        let remaining = amount;
        for (let i = this.state.pointBalances.length - 1; i >= 0 && remaining > 0; i--) {
            if (this.state.pointBalances[i].amount <= remaining) {
                remaining -= this.state.pointBalances[i].amount;
                this.state.pointBalances.splice(i, 1);
            } else {
                this.state.pointBalances[i].amount -= remaining;
                remaining = 0;
            }
        }
        this.state.totalEarned -= amount;
        this.state.totalXP = Math.max(0, this.state.totalXP - amount);
    }

    spend(amount) {
        this.clean();
        if (this.getAvailable() < amount) return false;

        let remaining = amount;
        this.state.pointBalances.sort((a, b) => a.expiresAt - b.expiresAt);

        while (remaining > 0 && this.state.pointBalances.length > 0) {
            const balance = this.state.pointBalances[0];
            if (balance.amount <= remaining) {
                remaining -= balance.amount;
                this.state.pointBalances.shift();
            } else {
                balance.amount -= remaining;
                remaining = 0;
            }
        }
        this.state.totalSpent += amount;
        return true;
    }

    getAvailable() {
        this.clean();
        return this.state.pointBalances.reduce((sum, b) => sum + b.amount, 0);
    }

    getExpiring() {
        this.clean();
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        return {
            today: this.state.pointBalances.filter(b => b.expiresAt <= todayEnd.getTime()).reduce((s, b) => s + b.amount, 0),
            in3Days: this.state.pointBalances.filter(b => b.expiresAt <= now + 3 * oneDay && b.expiresAt > todayEnd.getTime()).reduce((s, b) => s + b.amount, 0),
            in7Days: this.state.pointBalances.filter(b => b.expiresAt <= now + 7 * oneDay && b.expiresAt > now + 3 * oneDay).reduce((s, b) => s + b.amount, 0),
        };
    }

    clean() {
        const now = Date.now();
        const expired = this.state.pointBalances.filter(b => b.expiresAt <= now);
        this.state.pointBalances = this.state.pointBalances.filter(b => b.expiresAt > now);
        return expired.reduce((s, b) => s + b.amount, 0);
    }
}