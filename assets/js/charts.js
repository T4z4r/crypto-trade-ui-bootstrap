// @ts-nocheck
// Chart configurations and data for Cryptix dashboard
class CryptoChartManager {
    constructor() {
        this.charts = {};
        this.cryptoData = this.generateSampleData();
    }

    // Generate sample cryptocurrency price data
    generateSampleData() {
        const data = [];
        const basePrice = 43250; // BTC starting price
        let currentPrice = basePrice;

        for (let i = 0; i < 100; i++) {
            const timestamp = new Date(Date.now() - (99 - i) * 60000).getTime();
            const change = (Math.random() - 0.5) * 200;
            currentPrice += change;
            currentPrice = Math.max(currentPrice, basePrice * 0.8);

            // Generate OHLC data for candlestick
            const open = Math.round((currentPrice + (Math.random() - 0.5) * 50) * 100) / 100;
            const high = Math.round((open + Math.random() * 50) * 100) / 100;
            const low = Math.round((open - Math.random() * 50) * 100) / 100;
            const close = Math.round((currentPrice + (Math.random() - 0.5) * 50) * 100) / 100;

            data.push({
                x: timestamp,
                open: open,
                high: high,
                low: low,
                close: close,
                y: close // For line chart
            });
        }

        return data;
    }

    // Create dashboard chart configuration (line chart)
    createDashboardChartConfig() {
        return {
            chart: {
                type: 'line',
                backgroundColor: 'transparent',
                height: 380,
                style: {
                    fontFamily: 'inherit'
                }
            },
            title: { text: null },
            xAxis: {
                type: 'datetime',
                labels: {
                    style: { color: '#9ca3af' }
                },
                lineColor: '#374151',
                tickColor: '#374151'
            },
            yAxis: {
                title: { text: null },
                labels: {
                    style: { color: '#9ca3af' }
                },
                gridLineColor: '#374151'
            },
            legend: { enabled: false },
            credits: { enabled: false },
            tooltip: {
                backgroundColor: '#1f2937',
                borderColor: '#374151',
                style: { color: '#f9fafb' },
                formatter: function() {
                    return `<b>${Highcharts.dateFormat('%Y-%m-%d %H:%M', this.x)}</b><br/>Price: $${this.y.toFixed(2)}`;
                }
            },
            series: [{
                name: 'BTC/USD',
                data: this.cryptoData.map(d => [d.x, d.y]),
                color: '#10b981',
                lineWidth: 2,
                marker: { enabled: false },
                states: {
                    hover: { lineWidth: 3 }
                }
            }],
            plotOptions: {
                series: {
                    animation: { duration: 1000 }
                }
            }
        };
    }

    // Create trading chart configuration (candlestick)
    createTradingChartConfig() {
        return {
            chart: {
                type: 'candlestick',
                backgroundColor: 'transparent',
                height: 500,
                style: {
                    fontFamily: 'inherit'
                }
            },
            title: { text: null },
            xAxis: {
                type: 'datetime',
                labels: {
                    style: { color: '#9ca3af' }
                },
                lineColor: '#374151',
                tickColor: '#374151'
            },
            yAxis: [{
                title: { text: null },
                labels: {
                    style: { color: '#9ca3af' }
                },
                gridLineColor: '#374151',
                height: '80%'
            }, {
                title: { text: null },
                labels: {
                    style: { color: '#9ca3af' }
                },
                gridLineColor: '#374151',
                top: '85%',
                height: '15%',
                offset: 0
            }],
            legend: { enabled: false },
            credits: { enabled: false },
            tooltip: {
                backgroundColor: '#1f2937',
                borderColor: '#374151',
                style: { color: '#f9fafb' },
                formatter: function() {
                    return `<b>${Highcharts.dateFormat('%Y-%m-%d %H:%M', this.x)}</b><br/>
                            Open: $${this.point.open.toFixed(2)}<br/>
                            High: $${this.point.high.toFixed(2)}<br/>
                            Low: $${this.point.low.toFixed(2)}<br/>
                            Close: $${this.point.close.toFixed(2)}`;
                }
            },
            series: [{
                type: 'candlestick',
                name: 'BTC/USD',
                data: this.cryptoData,
                color: '#ef4444',
                upColor: '#10b981',
                lineColor: '#ef4444',
                upLineColor: '#10b981'
            }],
            plotOptions: {
                candlestick: {
                    animation: { duration: 1000 }
                }
            }
        };
    }

    // Create portfolio pie chart configuration
    createPortfolioChartConfig() {
        return {
            chart: {
                type: 'pie',
                backgroundColor: 'transparent',
                height: 250,
                style: {
                    fontFamily: 'inherit'
                }
            },
            title: { text: null },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br/>{point.percentage:.1f}%',
                        style: {
                            color: '#f9fafb',
                            fontSize: '11px'
                        }
                    },
                    showInLegend: true,
                    borderWidth: 0,
                    colors: ['#10b981', '#f59e0b', '#8b5cf6']
                }
            },
            legend: {
                itemStyle: { color: '#f9fafb' }
            },
            series: [{
                name: 'Allocation',
                data: [{
                    name: 'USD',
                    y: 68.2
                }, {
                    name: 'Bitcoin',
                    y: 24.1
                }, {
                    name: 'Ethereum',
                    y: 7.7
                }]
            }],
            credits: { enabled: false },
            tooltip: {
                backgroundColor: '#1f2937',
                borderColor: '#374151',
                style: { color: '#f9fafb' },
                formatter: function() {
                    return `<b>${this.point.name}</b><br/>
                            ${this.point.percentage.toFixed(1)}% of Portfolio`;
                }
            }
        };
    }

    // Initialize dashboard chart
    initDashboardChart(containerId) {
        if (document.getElementById(containerId)) {
            this.charts[containerId] = Highcharts.chart(containerId, this.createDashboardChartConfig());
        }
    }

    // Initialize trading chart
    initTradingChart(containerId) {
        if (document.getElementById(containerId)) {
            const config = this.createTradingChartConfig();
            config.chart.height = containerId === 'priceChart' ? 500 : 480;
            this.charts[containerId] = Highcharts.stockChart(containerId, config);
        }
    }

    // Initialize portfolio pie chart
    initPortfolioChart(containerId) {
        if (document.getElementById(containerId)) {
            this.charts[containerId] = Highcharts.chart(containerId, this.createPortfolioChartConfig());
        }
    }

    // Update chart data (for real-time updates)
    updateChartData() {
        const newTimestamp = new Date().getTime();
        const lastData = this.cryptoData[this.cryptoData.length - 1];
        const lastPrice = lastData.close;
        const newPrice = Math.max(lastPrice + (Math.random() - 0.5) * 100, lastPrice * 0.95);

        const newPoint = {
            x: newTimestamp,
            open: Math.round((newPrice + (Math.random() - 0.5) * 50) * 100) / 100,
            high: Math.round((newPrice + Math.random() * 50) * 100) / 100,
            low: Math.round((newPrice - Math.random() * 50) * 100) / 100,
            close: Math.round(newPrice * 100) / 100,
            y: Math.round(newPrice * 100) / 100
        };

        this.cryptoData.push(newPoint);
        if (this.cryptoData.length > 100) {
            this.cryptoData.shift();
        }

        // Update charts based on their type
        Object.entries(this.charts).forEach(([containerId, chart]) => {
            if (chart.series && chart.series[0]) {
                if (chart.series[0].type === 'line') {
                    chart.series[0].addPoint([newPoint.x, newPoint.y], true, true);
                } else if (chart.series[0].type === 'candlestick') {
                    chart.series[0].addPoint(newPoint, true, true);
                }
            }
        });
    }
}

// Global chart manager instance
const chartManager = new CryptoChartManager();

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('chartArea')) {
        chartManager.initDashboardChart('chartArea');
    }
    if (document.getElementById('chart')) {
        chartManager.initTradingChart('chart');
    }
    if (document.getElementById('priceChart')) {
        chartManager.initTradingChart('priceChart');
    }
    if (document.getElementById('portfolioChart')) {
        chartManager.initPortfolioChart('portfolioChart');
    }

    // Update chart data every 5 seconds
    setInterval(() => {
        chartManager.updateChartData();
    }, 5000);
});