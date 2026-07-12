// sidebar.js - Navegação lateral
class SidebarManager {
    constructor() {
        this.currentTab = 'missions';
    }

    render() {
        const nav = document.getElementById('sidebarNav');
        if (!nav) return;

        nav.innerHTML = CONFIG.NAV_ITEMS.map(item => `
            <div class="nav-item ${this.currentTab === item.id ? 'active' : ''}" 
                 onclick="Sidebar.navigate('${item.id}')" 
                 data-tab="${item.id}">
                <span class="nav-icon">${item.icon}</span>
                <span class="nav-label">${item.label}</span>
                ${this.getBadge(item.id)}
            </div>
        `).join('');
    }

    getBadge(tabId) {
        if (tabId === 'missions') {
            const today = State.getToday();
            const completed = State.state.completedMissions[today]?.length || 0;
            const total = ALL_MISSIONS.length;
            if (completed < total) {
                return `<span class="nav-badge">${total - completed}</span>`;
            }
        }
        if (tabId === 'shop') {
            const expiring = State.points.getExpiring();
            if (expiring.today > 0) {
                return `<span class="nav-badge badge-danger">!</span>`;
            }
        }
        return '';
    }

    navigate(tabId) {
        this.currentTab = tabId;
        this.render();
        
        const contentArea = document.getElementById('contentArea');
        if (!contentArea) return;

        switch (tabId) {
            case 'missions': MissionsUI.render(contentArea); break;
            case 'shop': ShopUI.render(contentArea); break;
            case 'challenges': ChallengesUI.render(contentArea); break;
            case 'analytics': AnalyticsUI.render(contentArea); break;
            case 'diary': DiaryUI.render(contentArea); break;
            case 'character': CharacterUI.render(contentArea); break;
            case 'config': ConfigUI.render(contentArea); break;
        }
        
        Header.render();
    }
}

const Sidebar = new SidebarManager();