// app.js - handles navigation, pair updates, and simple UI simulations
document.addEventListener('DOMContentLoaded', function () {
  const navButtons = document.querySelectorAll('#sidebarNav .nav-link');
  const sections = document.querySelectorAll('.section');
  const pageTitle = document.getElementById('pageTitle');
  const pairSelect = document.getElementById('pairSelect');
  const tradingTitle = document.getElementById('tradingTitle');
  const buyBtn = document.getElementById('buyBtn');
  const sellBtn = document.getElementById('sellBtn');
  const submitOrder = document.getElementById('submitOrder');
  const priceInput = document.getElementById('priceInput');
  const amountInput = document.getElementById('amountInput');
  const estimatedTotal = document.getElementById('estimatedTotal');
  const orderBook = document.getElementById('orderBook');
  const recentTrades = document.getElementById('recentTrades');
  const goTrading = document.getElementById('goTrading');

  function showSection(id) {
    sections.forEach(sec => {
      if (sec.id === id) {
        sec.classList.remove('d-none');
        sec.classList.add('active-section');
      } else {
        sec.classList.add('d-none');
        sec.classList.remove('active-section');
      }
    });
    pageTitle.textContent = id.charAt(0).toUpperCase() + id.slice(1);
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const section = btn.getAttribute('data-section');
      showSection(section);
    });
  });

  // go to trading from dashboard
  if (goTrading) {
    goTrading.addEventListener('click', () => {
      document.querySelector('#sidebarNav button[data-section="trading"]').click();
    });
  }

  // update trading title when pair changes
  pairSelect.addEventListener('change', () => {
    const pair = pairSelect.value;
    tradingTitle.textContent = pair + ' — Chart';
    // update submit button label
    const base = pair.split(' ')[0];
    submitOrder.textContent = (buyBtn.classList.contains('active') ? 'Buy ' : 'Sell ') + base;
  });

  // buy/sell toggle
  buyBtn.addEventListener('click', () => {
    buyBtn.classList.add('active');
    sellBtn.classList.remove('active');
    submitOrder.classList.remove('btn-danger');
    submitOrder.classList.add('btn-success');
    submitOrder.textContent = 'Buy ' + pairSelect.value.split(' ')[0];
  });
  sellBtn.addEventListener('click', () => {
    sellBtn.classList.add('active');
    buyBtn.classList.remove('active');
    submitOrder.classList.remove('btn-success');
    submitOrder.classList.add('btn-danger');
    submitOrder.textContent = 'Sell ' + pairSelect.value.split(' ')[0];
  });

  function updateEstimated() {
    const price = Number(priceInput.value || 0);
    const amount = Number(amountInput.value || 0);
    estimatedTotal.textContent = '$' + (price * amount).toFixed(2);
  }

  priceInput.addEventListener('input', updateEstimated);
  amountInput.addEventListener('input', updateEstimated);

  // mock orderbook data
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

  // mock recent trades
  function renderRecentTrades() {
    recentTrades.innerHTML = '<div class="small text-muted">Loading mock trades...</div>';
    setTimeout(() => {
      recentTrades.innerHTML = '<ul class="list-unstyled small mb-0"><li>12:03 — BTC/USD — <span class="text-success">Buy</span> 0.02 @ $58,240</li><li>11:50 — ETH/USD — <span class="text-danger">Sell</span> 0.5 @ $3,420</li></ul>';
    }, 600);
  }
  renderRecentTrades();

  // submit order (mock)
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

  // keyboard shortcuts: Numbers 1-5 to switch sections
  document.addEventListener('keydown', (e) => {
    if (!e.altKey && !e.ctrlKey && !e.metaKey) {
      if (e.key === '1') document.querySelector('#sidebarNav button[data-section="dashboard"]').click();
      if (e.key === '2') document.querySelector('#sidebarNav button[data-section="trading"]').click();
      if (e.key === '3') document.querySelector('#sidebarNav button[data-section="wallet"]').click();
      if (e.key === '4') document.querySelector('#sidebarNav button[data-section="transactions"]').click();
      if (e.key === '5') document.querySelector('#sidebarNav button[data-section="profile"]').click();
    }
  });

  // authentication modal toggle
  const showSignup = document.getElementById('showSignup');
  const showSignin = document.getElementById('showSignin');
  const signinForm = document.getElementById('signinForm');
  const signupForm = document.getElementById('signupForm');
  const signinText = document.getElementById('signinText');
  const signupText = document.getElementById('signupText');

  if (showSignup) {
    showSignup.addEventListener('click', (e) => {
      e.preventDefault();
      signinForm.classList.add('d-none');
      signupForm.classList.remove('d-none');
      signinText.classList.add('d-none');
      signupText.classList.remove('d-none');
    });
  }

  if (showSignin) {
    showSignin.addEventListener('click', (e) => {
      e.preventDefault();
      signupForm.classList.add('d-none');
      signinForm.classList.remove('d-none');
      signupText.classList.add('d-none');
      signinText.classList.remove('d-none');
    });
  }

  // initial setup
  showSection('dashboard');
  updateEstimated();
});
