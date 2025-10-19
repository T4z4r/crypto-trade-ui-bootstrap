// app.js - handles theme toggle, trading functionality, and UI interactions
// Global initialization flag to prevent multiple loading
window.appInitialized = false;

// ========================================
// IMMEDIATE THEME INITIALIZATION
// ========================================

// Apply theme immediately to prevent flash
(function() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const htmlElement = document.documentElement;

  if (savedTheme === 'light') {
    htmlElement.classList.add('light-mode');
    htmlElement.setAttribute('data-theme', 'light');
  } else {
    htmlElement.classList.remove('light-mode');
    htmlElement.setAttribute('data-theme', 'dark');
  }
})();

// ========================================
// PAGE LOADER FUNCTIONALITY
// ========================================

// Page Loader Management
class PageLoader {
  constructor() {
    // Singleton pattern - only one instance allowed
    if (PageLoader.instance) {
      return PageLoader.instance;
    }

    this.loader = document.getElementById('pageLoader');
    this.statusText = document.querySelector('.loader-status');
    this.progressBar = document.querySelector('.loader-progress-bar');
    this.loadSteps = [
      'Initializing Cryptix',
      'Loading assets',
      'Connecting to markets',
      'Preparing interface',
      'Ready to trade'
    ];
    this.currentStep = 0;
    this.progressInterval = null;
    this.isLoading = false; // Flag to prevent concurrent loaders

    PageLoader.instance = this;
  }

  // Static method to get the singleton instance
  static getInstance() {
    if (!PageLoader.instance) {
      PageLoader.instance = new PageLoader();
    }
    return PageLoader.instance;
  }

  show() {
    // Prevent multiple concurrent loaders
    if (this.isLoading || !this.loader) {
      return;
    }

    this.isLoading = true;
    this.loader.classList.remove('hidden');
    this.currentStep = 0;
    this.updateStatus();
    this.startProgress();
  }

  hide() {
    if (this.loader && this.isLoading) {
      this.isLoading = false;
      this.loader.classList.add('hidden');
      this.stopProgress();
    }
  }

  updateStatus() {
    if (this.statusText && this.loadSteps[this.currentStep]) {
      this.statusText.textContent = this.loadSteps[this.currentStep];
    }
  }

  startProgress() {
    this.stopProgress();
    this.progressInterval = setInterval(() => {
      this.currentStep++;
      if (this.currentStep >= this.loadSteps.length) {
        this.currentStep = 0;
      }
      this.updateStatus();
    }, 800);
  }

  stopProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  // Method to force complete loading and hide loader
  completeLoad() {
    if (this.loader && this.isLoading) {
      this.isLoading = false;
      this.loader.classList.add('hidden');
      this.stopProgress();
    }
  }

  // Method to check if loader is currently active
  isActive() {
    return this.isLoading && this.loader && !this.loader.classList.contains('hidden');
  }

  // Simulate loading for demo purposes
  simulateLoad(duration = 2500) {
    // Don't start if already loading
    if (this.isLoading) {
      return;
    }

    this.show();
    setTimeout(() => {
      this.hide();
    }, duration);
  }
}

// Initialize page loader (singleton)
const pageLoader = PageLoader.getInstance();

// Initialize page loader and navigation functionality
function initializePageLoader() {
  // Only initialize if not already done
  if (pageLoader.initialized) {
    return;
  }
  pageLoader.initialized = true;

  // Show loader immediately when page starts loading
  if (pageLoader.loader && !pageLoader.isLoading) {
    pageLoader.show();
  }

  // Handle navigation clicks for demo purposes
  const navLinks = document.querySelectorAll('.nav-item, .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only show loader for internal navigation (demo)
      if (this.getAttribute('href') && this.getAttribute('href').includes('.html')) {
        e.preventDefault();

        // Only trigger loader if not already loading
        if (!pageLoader.isLoading) {
          pageLoader.simulateLoad(1500);

          // Simulate page transition
          setTimeout(() => {
            window.location.href = this.getAttribute('href');
          }, 1500);
        } else {
          // If already loading, just navigate after current load completes
          setTimeout(() => {
            window.location.href = this.getAttribute('href');
          }, 500);
        }
      }
    });
  });
}

// Export for use in other scripts if needed
window.PageLoader = pageLoader;

document.addEventListener('DOMContentLoaded', function () {
  // Prevent multiple initialization
  if (window.appInitialized) {
    return;
  }
  window.appInitialized = true;
  // Theme toggle functionality (works on all pages)
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  // Trading-specific elements (only exist on trading page)
  const pairSelect = document.getElementById('pairSelect');
  const tradingTitle = document.getElementById('tradingTitle');
  const buyBtn = document.getElementById('buyBtn');
  const sellBtn = document.getElementById('sellBtn');
  const submitOrder = document.getElementById('submitOrder');
  const priceInput = document.getElementById('priceInput');
  const amountInput = document.getElementById('amountInput');
  const estimatedTotal = document.getElementById('estimatedTotal');
  const orderBook = document.getElementById('orderBook');
  const priceChart = document.getElementById('priceChart');

  // Dashboard-specific elements (only exist on dashboard page)
  const recentTrades = document.getElementById('recentTrades');
  const goTrading = document.getElementById('goTrading');

  // Theme toggle functionality (works on all pages)
  function initializeTheme() {
    // Theme class is already applied immediately above, just update icons and data attribute
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const htmlElement = document.documentElement;

    if (savedTheme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    } else {
      htmlElement.setAttribute('data-theme', 'dark');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const htmlElement = document.documentElement;
      const isLight = htmlElement.classList.contains('light-mode');

      if (isLight) {
        // Switch to dark mode
        htmlElement.classList.remove('light-mode');
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (sunIcon && moonIcon) {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        }
      } else {
        // Switch to light mode
        htmlElement.classList.add('light-mode');
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (sunIcon && moonIcon) {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    });
  }

  // Trading-specific functionality (only runs if elements exist)
  if (pairSelect && tradingTitle) {
    pairSelect.addEventListener('change', () => {
      const pair = pairSelect.value;
      if (tradingTitle) tradingTitle.textContent = pair + ' — Chart';
      // update submit button label
      if (submitOrder) {
        const base = pair.split(' ')[0];
        submitOrder.textContent = (buyBtn && buyBtn.classList.contains('active') ? 'Buy ' : 'Sell ') + base;
      }
    });
  }

  // buy/sell toggle (only runs if elements exist)
  if (buyBtn && sellBtn && submitOrder && pairSelect) {
    buyBtn.addEventListener('click', () => {
      buyBtn.classList.add('active');
      sellBtn.classList.remove('active');
      if (submitOrder) {
        submitOrder.classList.remove('btn-danger');
        submitOrder.classList.add('btn-success');
        submitOrder.textContent = 'Buy ' + pairSelect.value.split(' ')[0];
      }
    });

    sellBtn.addEventListener('click', () => {
      sellBtn.classList.add('active');
      buyBtn.classList.remove('active');
      if (submitOrder) {
        submitOrder.classList.remove('btn-success');
        submitOrder.classList.add('btn-danger');
        submitOrder.textContent = 'Sell ' + pairSelect.value.split(' ')[0];
      }
    });
  }

  // Trading-specific functions (only run if elements exist)
  if (priceInput && amountInput && estimatedTotal) {
    function updateEstimated() {
      const price = Number(priceInput.value || 0);
      const amount = Number(amountInput.value || 0);
      if (estimatedTotal) estimatedTotal.textContent = '$' + (price * amount).toFixed(2);
    }

    priceInput.addEventListener('input', updateEstimated);
    amountInput.addEventListener('input', updateEstimated);
  }

  // mock orderbook data (only runs if orderBook exists)
  if (orderBook) {
    function renderOrderBook() {
      const bids = [
        {price: 58230, amount: 0.25},
        {price: 58200, amount: 0.3},
        {price: 58100, amount: 0.12},
      ];
      const asks = [
        {price: 58400, amount: 0.15},
        {price: 58420, amount: 0.1},
        {price: 58500, amount: 0.02},
      ];
      orderBook.innerHTML = '';
      const bidsDiv = document.createElement('div');
      bidsDiv.innerHTML = '<div class="small text-muted">Bids</div>';
      bids.forEach(b => {
        const el = document.createElement('div'); el.className='d-flex justify-content-between text-success'; el.innerHTML = '<span>'+b.price+'</span><span>'+b.amount+'</span>'; bidsDiv.appendChild(el);
      });
      const asksDiv = document.createElement('div'); asksDiv.className='mt-2'; asksDiv.innerHTML = '<div class="small text-muted">Asks</div>';
      asks.forEach(a => {
        const el = document.createElement('div'); el.className='d-flex justify-content-between text-danger'; el.innerHTML = '<span>'+a.price+'</span><span>'+a.amount+'</span>'; asksDiv.appendChild(el);
      });
      orderBook.appendChild(bidsDiv); orderBook.appendChild(asksDiv);
    }
    renderOrderBook();
  }

  // mock recent trades (only runs if recentTrades exists)
  if (recentTrades) {
    function renderRecentTrades() {
      if (recentTrades) {
        recentTrades.innerHTML = '<div class="small text-muted">Loading mock trades...</div>';
        setTimeout(() => {
          if (recentTrades) {
            recentTrades.innerHTML = '<ul class="list-unstyled small mb-0"><li>12:03 — BTC/USD — <span class="text-success">Buy</span> 0.02 @ $58,240</li><li>11:50 — ETH/USD — <span class="text-danger">Sell</span> 0.5 @ $3,420</li></ul>';
          }
        }, 600);
      }
    }
    renderRecentTrades();
  }

  // submit order (mock) - only runs if submitOrder exists
  if (submitOrder && buyBtn && priceInput && amountInput && pairSelect) {
    submitOrder.addEventListener('click', () => {
      const side = buyBtn.classList.contains('active') ? 'Buy' : 'Sell';
      const price = Number(priceInput.value || 0).toFixed(2);
      const amount = Number(amountInput.value || 0);
      const base = pairSelect.value.split(' ')[0];
      // show a temporary toast-like feedback
      const msg = document.createElement('div');
      msg.className = 'toast-exec';
      msg.textContent = side + ' order submitted: ' + amount + ' ' + base + ' @ $' + price;
      document.body.appendChild(msg);
      setTimeout(()=> msg.classList.add('show'), 20);
      setTimeout(()=> { msg.classList.remove('show'); setTimeout(()=> msg.remove(),200); }, 3000);
    });
  }

  // Chart functionality (only runs if priceChart exists)
  let priceChartInstance = null;
  let chartUpdateInterval = null;

  if (priceChart) {
    // Generate dummy price data
    function generatePriceData(points = 50) {
      const basePrice = pairSelect ? getBasePrice(pairSelect.value) : 58240;
      const data = [];
      let currentPrice = basePrice;

      for (let i = 0; i < points; i++) {
        // Generate realistic price movements
        const change = (Math.random() - 0.5) * 200; // Random change between -100 and +100
        currentPrice = Math.max(currentPrice + change, basePrice * 0.8); // Don't go below 80% of base

        data.push([
          Date.now() - (points - i) * 60000, // timestamp in milliseconds
          Math.round(currentPrice * 100) / 100
        ]);
      }

      return data;
    }

    // Get base price for different trading pairs
    function getBasePrice(pair) {
      const prices = {
        'BTC / USD': 58240,
        'ETH / USD': 3420,
        'SOL / USD': 98,
        'ADA / USD': 0.45
      };
      return prices[pair] || 58240;
    }

    // Initialize chart
    function initializeChart() {
      const initialData = generatePriceData();

      priceChartInstance = Highcharts.chart('priceChart', {
        chart: {
          type: 'area',
          backgroundColor: 'transparent',
          height: 400,
          animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
          }
        },
        title: {
          text: null
        },
        xAxis: {
          type: 'datetime',
          gridLineColor: 'rgba(255, 255, 255, 0.02)',
          lineColor: 'rgba(255, 255, 255, 0.05)',
          tickColor: 'rgba(255, 255, 255, 0.05)',
          labels: {
            style: {
              color: 'rgba(255, 255, 255, 0.6)'
            }
          }
        },
        yAxis: {
          opposite: true,
          gridLineColor: 'rgba(255, 255, 255, 0.02)',
          lineColor: 'rgba(255, 255, 255, 0.05)',
          tickColor: 'rgba(255, 255, 255, 0.05)',
          labels: {
            style: {
              color: 'rgba(255, 255, 255, 0.6)'
            },
            formatter: function() {
              return '$' + this.value.toLocaleString();
            }
          }
        },
        legend: {
          enabled: false
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 32, 0.9)',
          borderColor: 'rgba(16, 185, 129, 0.5)',
          borderRadius: 8,
          style: {
            color: '#e6eef6'
          },
          formatter: function() {
            return '<b>' + new Date(this.x).toLocaleTimeString() + '</b><br/>Price: $' + this.y.toLocaleString();
          }
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, 'rgba(16, 185, 129, 0.3)'],
                [1, 'rgba(16, 185, 129, 0.0)']
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 2
              }
            },
            threshold: null
          }
        },
        series: [{
          type: 'area',
          name: 'Price',
          data: initialData,
          color: '#10b981',
          lineColor: '#10b981'
        }]
      });
    }

    // Update chart with new data point
    function updateChart() {
      if (!priceChartInstance) return;

      const currentData = priceChartInstance.series[0].data;
      const lastPoint = currentData[currentData.length - 1];
      const lastPrice = lastPoint.y;
      const change = (Math.random() - 0.5) * 150; // Smaller changes for realism
      const newPrice = Math.max(lastPrice + change, getBasePrice(pairSelect.value) * 0.85);

      // Add new data point
      currentData.addPoint([
        Date.now(),
        Math.round(newPrice * 100) / 100
      ], true, false);

      // Keep only last 50 points for performance
      if (currentData.length > 50) {
        currentData.removePoint(0, false);
      }

      // Update current price display in price input
      if (priceInput) {
        priceInput.value = Math.round(newPrice * 100) / 100;
        if (estimatedTotal) updateEstimated();
      }
    }

    // Start real-time updates
    function startRealTimeUpdates() {
      // Prevent multiple intervals
      if (chartUpdateInterval) clearInterval(chartUpdateInterval);
      chartUpdateInterval = setInterval(updateChart, 2000); // Update every 2 seconds
    }

    // Stop real-time updates
    function stopRealTimeUpdates() {
      if (chartUpdateInterval) {
        clearInterval(chartUpdateInterval);
        chartUpdateInterval = null;
      }
    }

    // Initialize chart and start updates
    initializeChart();
    startRealTimeUpdates();

    // Update chart when trading pair changes
    if (pairSelect) {
      pairSelect.addEventListener('change', () => {
        // Update chart title
        if (tradingTitle) tradingTitle.textContent = pairSelect.value + ' — Chart';

        // Regenerate chart data for new pair
        if (priceChartInstance) {
          const newData = generatePriceData();
          priceChartInstance.series[0].setData(newData, true);

          // Update price input with new base price
          if (priceInput) {
            priceInput.value = getBasePrice(pairSelect.value);
            if (estimatedTotal) updateEstimated();
          }
        }

        // Update submit button label
        if (submitOrder) {
          const base = pairSelect.value.split(' ')[0];
          submitOrder.textContent = (buyBtn && buyBtn.classList.contains('active') ? 'Buy ' : 'Sell ') + base;
        }
      });
    }
  }

  // initial setup
  initializeTheme();
  if (priceInput && amountInput && estimatedTotal) updateEstimated();

  // Initialize page loader functionality
  initializePageLoader();

  // Complete loading when page is fully loaded
  window.addEventListener('load', function() {
    // Give a small delay to ensure all resources are loaded
    setTimeout(() => {
      if (pageLoader && pageLoader.isActive()) {
        // Only complete the load if we're still in the initial loading phase
        // This prevents conflicts with simulated loading
        pageLoader.completeLoad();
      }
    }, 100);
  });
});

