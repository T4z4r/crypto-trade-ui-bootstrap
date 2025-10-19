// icons.js - handles icons page functionality

class IconManager {
  constructor() {
    this.allIcons = [];
    this.filteredIcons = [];
    this.currentView = 'grid';

    this.initializeIcons();
    this.setupEventListeners();
  }

  initializeIcons() {
    this.allIcons = [
      // Navigation Icons
      { name: 'Dashboard', category: 'navigation', iconClass: 'dashboard-icon', svg: this.getDashboardSVG() },
      { name: 'Trading', category: 'navigation', iconClass: 'trading-icon', svg: this.getTradingSVG() },
      { name: 'Wallet', category: 'navigation', iconClass: 'wallet-icon', svg: this.getWalletSVG() },
      { name: 'Transactions', category: 'navigation', iconClass: 'transactions-icon', svg: this.getTransactionsSVG() },
      { name: 'Profile', category: 'navigation', iconClass: 'profile-icon', svg: this.getProfileSVG() },
      { name: 'Tables', category: 'navigation', iconClass: 'tables-icon', svg: this.getTablesSVG() },

      // Trading Icons
      { name: 'Sell', category: 'trading', iconClass: 'sell-icon', svg: this.getSellSVG() },
      { name: 'Buy', category: 'trading', iconClass: 'buy-icon', svg: this.getBuySVG() },
      { name: 'Limit Order', category: 'trading', iconClass: 'limit-order-icon', svg: this.getLimitOrderSVG() },
      { name: 'Market Order', category: 'trading', iconClass: 'market-order-icon', svg: this.getMarketOrderSVG() },
      { name: 'Stop Loss', category: 'trading', iconClass: 'stop-loss-icon', svg: this.getStopLossSVG() },
      { name: 'Order Book', category: 'trading', iconClass: 'order-book-icon', svg: this.getOrderBookSVG() },

      // Financial Icons
      { name: 'Crypto', category: 'financial', iconClass: 'crypto-icon', svg: this.getCryptoSVG() },
      { name: 'Dollar', category: 'financial', iconClass: 'dollar-icon', svg: this.getDollarSVG() },
      { name: 'Deposit', category: 'financial', iconClass: 'deposit-icon', svg: this.getDepositSVG() },
      { name: 'Withdraw', category: 'financial', iconClass: 'withdraw-icon', svg: this.getWithdrawSVG() },
      { name: 'Fee', category: 'financial', iconClass: 'fee-icon', svg: this.getFeeSVG() },
      { name: 'Staking', category: 'financial', iconClass: 'staking-icon', svg: this.getStakingSVG() },

      // Status Icons
      { name: 'Success', category: 'status', iconClass: 'success-icon', svg: this.getSuccessSVG() },
      { name: 'Error', category: 'status', iconClass: 'error-icon', svg: this.getErrorSVG() },
      { name: 'Warning', category: 'status', iconClass: 'warning-icon', svg: this.getWarningSVG() },
      { name: 'Pending', category: 'status', iconClass: 'pending-icon', svg: this.getPendingSVG() },
      { name: 'Info', category: 'status', iconClass: 'info-icon', svg: this.getInfoSVG() },
      { name: 'Alert', category: 'status', iconClass: 'alert-icon', svg: this.getAlertSVG() },

      // Chart Icons
      { name: 'Line Chart', category: 'chart', iconClass: 'line-chart-icon', svg: this.getLineChartSVG() },
      { name: 'Bar Chart', category: 'chart', iconClass: 'bar-chart-icon', svg: this.getBarChartSVG() },
      { name: 'Area Chart', category: 'chart', iconClass: 'area-chart-icon', svg: this.getAreaChartSVG() },
      { name: 'Candlestick', category: 'chart', iconClass: 'candlestick-icon', svg: this.getCandlestickSVG() },
      { name: 'Pie Chart', category: 'chart', iconClass: 'pie-chart-icon', svg: this.getPieChartSVG() },
      { name: 'Refresh', category: 'chart', iconClass: 'refresh-icon', svg: this.getRefreshSVG() },

      // Action Icons
      { name: 'Edit', category: 'action', iconClass: 'edit-icon', svg: this.getEditSVG() },
      { name: 'Delete', category: 'action', iconClass: 'delete-icon', svg: this.getDeleteSVG() },
      { name: 'Copy', category: 'action', iconClass: 'copy-icon', svg: this.getCopySVG() },
      { name: 'File', category: 'action', iconClass: 'file-icon', svg: this.getFileSVG() },
      { name: 'Search', category: 'action', iconClass: 'search-icon', svg: this.getSearchSVG() },
      { name: 'Download', category: 'action', iconClass: 'download-icon', svg: this.getDownloadSVG() },

      // Security Icons
      { name: 'Lock', category: 'security', iconClass: 'lock-icon', svg: this.getLockSVG() },
      { name: 'Unlock', category: 'security', iconClass: 'unlock-icon', svg: this.getUnlockSVG() },
      { name: 'Shield', category: 'security', iconClass: 'shield-icon', svg: this.getShieldSVG() },
      { name: 'Verified', category: 'security', iconClass: 'verified-icon', svg: this.getVerifiedSVG() },
      { name: 'Lightning', category: 'security', iconClass: 'lightning-icon', svg: this.getLightningSVG() },
      { name: 'Key', category: 'security', iconClass: 'key-icon', svg: this.getKeySVG() },

      // Time Icons
      { name: 'Clock', category: 'time', iconClass: 'clock-icon', svg: this.getClockSVG() },
      { name: 'Calendar', category: 'time', iconClass: 'calendar-icon', svg: this.getCalendarSVG() },
      { name: 'History', category: 'time', iconClass: 'history-icon', svg: this.getHistorySVG() },
      { name: 'Timer', category: 'time', iconClass: 'timer-icon', svg: this.getTimerSVG() },
      { name: 'Schedule', category: 'time', iconClass: 'schedule-icon', svg: this.getScheduleSVG() },
      { name: 'Plus', category: 'time', iconClass: 'plus-icon', svg: this.getPlusSVG() }
    ];

    this.filteredIcons = [...this.allIcons];
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('iconSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterIcons();
      });
    }

    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => {
        this.filterIcons();
      });
    }

    // Copy all button
    const copyAllBtn = document.getElementById('copyAllBtn');
    if (copyAllBtn) {
      copyAllBtn.addEventListener('click', () => {
        this.copyAllIcons();
      });
    }
  }

  filterIcons() {
    const searchTerm = document.getElementById('iconSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    this.filteredIcons = this.allIcons.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(searchTerm) ||
                           icon.iconClass.toLowerCase().includes(searchTerm);
      const matchesCategory = !categoryFilter || icon.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    this.renderIcons();
  }

  renderIcons() {
    const container = document.getElementById('iconCategories');
    if (!container) return;

    // Group icons by category
    const categories = {};
    this.filteredIcons.forEach(icon => {
      if (!categories[icon.category]) {
        categories[icon.category] = [];
      }
      categories[icon.category].push(icon);
    });

    container.innerHTML = '';

    Object.entries(categories).forEach(([category, icons]) => {
      const categoryCard = this.createCategoryCard(category, icons);
      container.appendChild(categoryCard);
    });
  }

  createCategoryCard(category, icons) {
    const categoryNames = {
      navigation: '🧭 Navigation Icons',
      trading: '📈 Trading Icons',
      financial: '💰 Financial Icons',
      status: '📊 Status Icons',
      chart: '📈 Chart Icons',
      action: '⚡ Action Icons',
      security: '🔐 Security Icons',
      time: '⏰ Time Icons'
    };

    const categoryColors = {
      navigation: 'primary',
      trading: 'success',
      financial: 'warning',
      status: 'info',
      chart: 'success',
      action: 'secondary',
      security: 'danger',
      time: 'secondary'
    };

    const div = document.createElement('div');
    div.className = 'col-lg-6';
    div.setAttribute('data-category', category);

    div.innerHTML = `
      <div class="card card-dark p-4 h-100 icon-category-card">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h6 class="mb-0">${categoryNames[category]}</h6>
          <span class="badge bg-${categoryColors[category]}">${icons.length}</span>
        </div>
        <div class="row g-3">
          ${icons.map(icon => `
            <div class="col-6">
              <div class="icon-item text-center" onclick="iconManager.copyIconCode('${icon.iconClass}')">
                <div class="icon-container">
                  ${icon.svg}
                </div>
                <span class="small">${icon.name}</span>
                <small class="text-muted">${icon.iconClass}</small>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    return div;
  }

  copyIconCode(iconClass) {
    const icon = this.allIcons.find(i => i.iconClass === iconClass);
    if (!icon) return;

    // Create a temporary textarea to copy the SVG code
    const textarea = document.createElement('textarea');
    textarea.value = icon.svg;
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      this.showToast(`Copied ${icon.name} icon!`);
    } catch (err) {
      console.error('Failed to copy icon:', err);
    }

    document.body.removeChild(textarea);
  }

  copyAllIcons() {
    const allSvgCode = this.filteredIcons.map(icon => icon.svg).join('\n\n');

    const textarea = document.createElement('textarea');
    textarea.value = allSvgCode;
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      this.showToast(`Copied ${this.filteredIcons.length} icons!`);
    } catch (err) {
      console.error('Failed to copy icons:', err);
    }

    document.body.removeChild(textarea);
  }

  showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;

    // Add styles
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(16, 185, 129, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  toggleIconView(view) {
    this.currentView = view;
    // Implementation for different views can be added here
  }

  // SVG Icon Getters
  getDashboardSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 21h14a1 1 0 0 0 1-1V11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 21V13h6v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  getTradingSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 14l4-6 4 8 4-10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  getWalletSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M16 10h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M2 10h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }

  getTransactionsSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6h13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 12h13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 18h13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M3 6h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M3 12h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M3 18h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }

  getProfileSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="8" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  getTablesSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 14h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  getSellSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 16l-4-4m0 0l4-4m-4 4h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  getBuySVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  getLimitOrderSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getMarketOrderSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="2"/>
      <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getStopLossSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  getOrderBookSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
      <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getCryptoSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" stroke-width="2"/>
      <path d="M12 2L20 9L12 16L4 9L12 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
    </svg>`;
  }

  getDollarSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getDepositSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="2"/>
      <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getWithdrawSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
      <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
      <path d="M20 8v6M23 11l-3 3-3-3" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getFeeSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getStakingSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" stroke-width="2"/>
      <path d="M12 2L20 9L12 16L4 9L12 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
    </svg>`;
  }

  getSuccessSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  getErrorSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getWarningSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getPendingSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getInfoSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getAlertSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getLineChartSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3v18h18" stroke="currentColor" stroke-width="2"/>
      <path d="M18.7 8l-5.1 5.2-3.8-3.8L6 14.3" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getBarChartSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3v18h18" stroke="currentColor" stroke-width="2"/>
      <rect x="7" y="10" width="3" height="7" stroke="currentColor" stroke-width="2"/>
      <rect x="12" y="6" width="3" height="11" stroke="currentColor" stroke-width="2"/>
      <rect x="17" y="8" width="3" height="9" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getAreaChartSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3v18h18" stroke="currentColor" stroke-width="2"/>
      <path d="M8.5 8.5l7 7L20 10l-7-7-7 7z" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getCandlestickSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3v18h18" stroke="currentColor" stroke-width="2"/>
      <rect x="6" y="12" width="2" height="2" stroke="currentColor" stroke-width="2"/>
      <rect x="10" y="8" width="2" height="6" stroke="currentColor" stroke-width="2"/>
      <rect x="14" y="10" width="2" height="4" stroke="currentColor" stroke-width="2"/>
      <rect x="18" y="6" width="2" height="8" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getPieChartSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getRefreshSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getEditSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getDeleteSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getCopySVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getFileSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
      <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getSearchSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
      <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getDownloadSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2"/>
      <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getLockSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="16" r="1" stroke="currentColor" stroke-width="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getUnlockSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="16" r="1" stroke="currentColor" stroke-width="2"/>
      <path d="M7 11V7a5 5 0 0 1 9 0v4" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getShieldSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getVerifiedSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2"/>
      <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getLightningSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getKeySVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getClockSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getCalendarSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getHistorySVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <polyline points="12,6 12,12 8,8" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getTimerSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getScheduleSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" stroke-width="2"/>
      <path d="M8 3v6h6" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  getPlusSVG() {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v20M2 12h20" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }
}

// Make functions globally available
window.copyIconCode = function(iconClass) {
  if (window.iconManager) {
    window.iconManager.copyIconCode(iconClass);
  }
};

window.toggleIconView = function(view) {
  if (window.iconManager) {
    window.iconManager.toggleIconView(view);
  }
};

// Initialize icon manager when page loads
document.addEventListener('DOMContentLoaded', function() {
  window.iconManager = new IconManager();
});