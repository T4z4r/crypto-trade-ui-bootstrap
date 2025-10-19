// app.js - handles theme toggle, trading functionality, and UI interactions
document.addEventListener('DOMContentLoaded', function () {
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

  // Dashboard-specific elements (only exist on dashboard page)
  const recentTrades = document.getElementById('recentTrades');
  const goTrading = document.getElementById('goTrading');

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

  // initial setup
  initializeTheme();
  if (priceInput && amountInput && estimatedTotal) updateEstimated();
});
