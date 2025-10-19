// transactions.js - handles transaction page functionality

class TransactionManager {
  constructor() {
    this.transactions = [];
    this.filteredTransactions = [];
    this.currentPage = 1;
    this.itemsPerPage = 25;

    this.initializeTransactions();
    this.setupEventListeners();
    this.renderTable();
  }

  initializeTransactions() {
    // Generate realistic transaction data
    const transactionTypes = ['deposit', 'withdrawal', 'trade', 'fee', 'staking', 'airdrop'];
    const currencies = ['USD', 'BTC', 'ETH', 'USDT', 'SOL', 'ADA', 'DOT'];
    const statuses = ['completed', 'pending', 'failed'];

    const baseTransactions = [
      { id: 'TXN-202501150001', type: 'deposit', currency: 'USD', amount: 500, usdValue: 500, status: 'completed', date: '2025-01-15T14:30:25Z' },
      { id: 'TXN-202501140856', type: 'withdrawal', currency: 'BTC', amount: 0.01, usdValue: 583.45, status: 'pending', date: '2025-01-14T08:56:12Z' },
      { id: 'TXN-202501140742', type: 'trade', currency: 'BTC', amount: 0.025, usdValue: 1456.78, status: 'completed', date: '2025-01-14T07:42:33Z' },
      { id: 'TXN-202501130945', type: 'fee', currency: 'ETH', amount: 0.002, usdValue: 6.84, status: 'completed', date: '2025-01-13T09:45:18Z' },
      { id: 'TXN-202501130823', type: 'staking', currency: 'SOL', amount: 15.5, usdValue: 1519.00, status: 'completed', date: '2025-01-13T08:23:47Z' },
   
      { id: 'TXN-202501030612', type: 'deposit', currency: 'USD', amount: 2500, usdValue: 2500, status: 'completed', date: '2025-01-03T06:12:37Z' }
    ];

    this.transactions = baseTransactions.map(tx => ({
      ...tx,
      network: tx.currency === 'BTC' ? 'Bitcoin' : tx.currency === 'ETH' ? 'Ethereum' : tx.currency === 'SOL' ? 'Solana' : tx.currency === 'ADA' ? 'Cardano' : tx.currency === 'DOT' ? 'Polkadot' : 'USD Network',
      confirmations: tx.status === 'completed' ? '6/6' : tx.status === 'pending' ? '3/6' : '0/6',
      processingTime: this.getRandomProcessingTime(),
      notes: this.getTransactionNotes(tx)
    }));

    this.filteredTransactions = [...this.transactions];
  }

  getRandomProcessingTime() {
    const times = ['2 minutes 15 seconds', '1 minute 45 seconds', '3 minutes 30 seconds', '45 seconds', '5 minutes 12 seconds'];
    return times[Math.floor(Math.random() * times.length)];
  }

  getTransactionNotes(transaction) {
    const notes = {
      deposit: 'Bank transfer processed successfully',
      withdrawal: 'Withdrawal request submitted to network',
      trade: 'Market order executed at best available price',
      fee: 'Trading fee deducted from account balance',
      staking: 'Staking rewards distributed to wallet',
      airdrop: 'Token airdrop received from project'
    };
    return notes[transaction.type] || 'Standard transaction';
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('transactionSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterTransactions();
      });
    }

    // Filter functionality
    const typeFilter = document.getElementById('typeFilter');
    const currencyFilter = document.getElementById('currencyFilter');
    const statusFilter = document.getElementById('statusFilter');

    [typeFilter, currencyFilter, statusFilter].forEach(filter => {
      if (filter) {
        filter.addEventListener('change', () => {
          this.filterTransactions();
        });
      }
    });

    // Apply filters button
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener('click', () => {
        this.filterTransactions();
      });
    }

    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        this.clearFilters();
      });
    }
  }

  clearFilters() {
    document.getElementById('transactionSearch').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('currencyFilter').value = '';
    document.getElementById('statusFilter').value = '';
    this.filteredTransactions = [...this.transactions];
    this.currentPage = 1;
    this.renderTable();
  }

  filterTransactions() {
    const searchTerm = document.getElementById('transactionSearch').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const currencyFilter = document.getElementById('currencyFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    this.filteredTransactions = this.transactions.filter(tx => {
      const matchesSearch = tx.id.toLowerCase().includes(searchTerm) ||
                           tx.type.toLowerCase().includes(searchTerm) ||
                           tx.currency.toLowerCase().includes(searchTerm);

      const matchesType = !typeFilter || tx.type === typeFilter;
      const matchesCurrency = !currencyFilter || tx.currency === currencyFilter;
      const matchesStatus = !statusFilter || tx.status === statusFilter;

      return matchesSearch && matchesType && matchesCurrency && matchesStatus;
    });

    this.currentPage = 1;
    this.renderTable();
  }

  renderTable() {
    const tableBody = document.getElementById('transactionsTableBody');
    if (!tableBody) return;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const transactionsToShow = this.filteredTransactions.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    if (transactionsToShow.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center text-muted py-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-3 opacity-50">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div>No transactions found</div>
            <small class="text-muted">Try adjusting your filters or search terms</small>
          </td>
        </tr>
      `;
      this.updatePagination();
      return;
    }

    transactionsToShow.forEach(tx => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="fw-monospace small">${tx.id}</td>
        <td>${this.formatDate(tx.date)}</td>
        <td>
          <span class="badge bg-${this.getTypeColor(tx.type)}">${this.formatType(tx.type)}</span>
        </td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <span class="fw-semibold">${tx.currency}</span>
          </div>
        </td>
        <td class="fw-semibold">
          ${tx.amount.toLocaleString()} ${tx.currency}
        </td>
        <td class="fw-semibold text-success">
          $${tx.usdValue.toLocaleString()}
        </td>
        <td>
          <span class="badge bg-${this.getStatusColor(tx.status)}">${this.formatStatus(tx.status)}</span>
        </td>
        <td class="text-center">
          <button class="btn btn-sm btn-outline-primary" onclick="transactionManager.showTransactionDetails('${tx.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    this.updatePagination();
  }

  updatePagination() {
    const startRecord = document.getElementById('startRecord');
    const endRecord = document.getElementById('endRecord');
    const totalRecords = document.getElementById('totalRecords');

    if (startRecord && endRecord && totalRecords) {
      const start = this.filteredTransactions.length > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
      const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredTransactions.length);

      startRecord.textContent = start.toLocaleString();
      endRecord.textContent = end.toLocaleString();
      totalRecords.textContent = this.filteredTransactions.length.toLocaleString();
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  formatStatus(status) {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  getTypeColor(type) {
    const colors = {
      deposit: 'success',
      withdrawal: 'warning',
      trade: 'primary',
      fee: 'info',
      staking: 'secondary',
      airdrop: 'success'
    };
    return colors[type] || 'secondary';
  }

  getStatusColor(status) {
    const colors = {
      completed: 'success',
      pending: 'warning',
      failed: 'danger',
      cancelled: 'secondary'
    };
    return colors[status] || 'secondary';
  }

  showTransactionDetails(transactionId) {
    const transaction = this.transactions.find(tx => tx.id === transactionId);
    if (!transaction) return;

    // Populate modal
    document.getElementById('modalTxId').textContent = transaction.id;
    document.getElementById('modalDateTime').textContent = this.formatDate(transaction.date) + ' UTC';
    document.getElementById('modalType').textContent = this.formatType(transaction.type);
    document.getElementById('modalCurrency').textContent = transaction.currency;
    document.getElementById('modalAmount').textContent = `${transaction.amount.toLocaleString()} ${transaction.currency}`;
    document.getElementById('modalUsdValue').textContent = `$${transaction.usdValue.toLocaleString()}`;
    document.getElementById('modalFee').textContent = `$${(transaction.usdValue * 0.002).toFixed(2)}`;
    document.getElementById('modalStatus').textContent = this.formatStatus(transaction.status);
    document.getElementById('modalStatus').className = `badge bg-${this.getStatusColor(transaction.status)}`;
    document.getElementById('modalNetwork').textContent = transaction.network;
    document.getElementById('modalConfirmations').textContent = transaction.confirmations;
    document.getElementById('modalProcessingTime').textContent = transaction.processingTime;
    document.getElementById('modalNotes').textContent = transaction.notes;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('transactionModal'));
    modal.show();
  }
}

// Initialize transaction manager when page loads
document.addEventListener('DOMContentLoaded', function() {
  window.transactionManager = new TransactionManager();
});