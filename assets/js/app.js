// app.js - handles theme toggle, trading functionality, and UI interactions
document.addEventListener('DOMContentLoaded', function () {
  // Sidebar toggle functionality (works on all pages)
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.createElement('div');
  sidebarOverlay.className = 'sidebar-overlay';

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

  // Sidebar toggle functionality
  function initializeSidebar() {
    // Add overlay to body for mobile
    document.body.appendChild(sidebarOverlay);

    // Load saved sidebar state
    const savedSidebarState = localStorage.getItem('sidebarCollapsed') === 'true';
    if (savedSidebarState && window.innerWidth >= 768) {
      sidebar.classList.add('collapsed');
    }

    // Sidebar toggle event
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          // Mobile: show/hide overlay sidebar
          sidebar.classList.toggle('show');
          sidebarOverlay.classList.toggle('show');
        } else {
          // Desktop: collapse/expand sidebar
          sidebar.classList.toggle('collapsed');
          const isCollapsed = sidebar.classList.contains('collapsed');
          localStorage.setItem('sidebarCollapsed', isCollapsed);
        }
      });
    }

    // Close sidebar when clicking overlay on mobile
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('show');
      sidebarOverlay.classList.remove('show');
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        sidebar.classList.remove('show');
        sidebarOverlay.classList.remove('show');
      }
    });
  }

  // Theme toggle functionality (works on all pages)
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    } else {
      document.body.classList.remove('light-mode');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-mode');
      if (isLight) {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        if (sunIcon && moonIcon) {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        }
      } else {
        document.body.classList.add('light-mode');
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
  initializeSidebar();
  initializeTheme();
  if (priceInput && amountInput && estimatedTotal) updateEstimated();
});
