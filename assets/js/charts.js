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
            const timestamp = new Date(Date.now() - (99 - i) * 60000).getTime(); // 1 minute intervals

            // Simulate price movement
            const change = (Math.random() - 0.5) * 200; // Random change between -100 and +100
            currentPrice += change;

            // Ensure price doesn't go negative
            currentPrice = Math.max(currentPrice, basePrice * 0.8);

            data.push([
                timestamp,
                Math.round(currentPrice * 100) / 100, // Round to 2 decimal places
                Math.round((currentPrice + Math.random() * 50) * 100) / 100, // Open
                Math.round((currentPrice + Math.random() * 50) * 100) / 100, // High
                Math.round((currentPrice - Math.random() * 50) * 100) / 100, // Low
                Math.round((currentPrice + (Math.random() - 0.5) * 100) * 100) / 100 // Close
            ]);
        }

        return data;
    }

    // Create dashboard chart configuration
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
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    style: {
                        color: '#9ca3af'
                    }
                },
                lineColor: '#374151',
                tickColor: '#374151'
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    style: {
                        color: '#9ca3af'
                    }
                },
                gridLineColor: '#374151',
                lineColor: '#374151'
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                backgroundColor: '#1f2937',
                borderColor: '#374151',
                style: {
                    color: '#f9fafb'
                },
                formatter: function() {
                    return `<b>${Highcharts.dateFormat('%Y-%m-%d %H:%M', this.x)}</b><br/>Price: $${this.y.toFixed(2)}`;
                }
            },
            series: [{
                name: 'BTC/USD',
                data: this.cryptoData,
                color: '#10b981',
                lineWidth: 2,
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        lineWidth: 3
                    }
                }
            }],
            plotOptions: {
                series: {
                    animation: {
                        duration: 1000
                    }
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
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    style: {
                        color: '#9ca3af'
                    }
                },
                lineColor: '#374151',
                tickColor: '#374151'
            },
            yAxis: [{
                title: {
                    text: null
                },
                labels: {
                    style: {
                        color: '#9ca3af'
                    }
                },
                gridLineColor: '#374151',
                lineColor: '#374151',
                height: '80%'
            }, {
                title: {
                    text: null
                },
                labels: {
                    style: {
                        color: '#9ca3af'
                    }
                },
                gridLineColor: '#374151',
                lineColor: '#374151',
                top: '85%',
                height: '15%',
                offset: 0
            }],
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                backgroundColor: '#1f2937',
                borderColor: '#374151',
                style: {
                    color: '#f9fafb'
                },
                formatter: function() {
                    return `<b>${Highcharts.dateFormat('%Y-%m-%d %H:%M', this.x)}</b><br/>
                            Open: $${this.point.open}<br/>
                            High: $${this.point.high}<br/>
                            Low: $${this.point.low}<br/>
                            Close: $${this.point.close}`;
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
                    animation: {
                        duration: 1000
                    }
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
            this.charts[containerId] = Highcharts.stockChart(containerId, this.createTradingChartConfig());
        }
    }

    // Update chart data (for real-time updates)
    updateChartData() {
        const newTimestamp = new Date().getTime();
        const lastPrice = this.cryptoData[this.cryptoData.length - 1][1];
        const newPrice = Math.max(lastPrice + (Math.random() - 0.5) * 100, lastPrice * 0.95);

        const newPoint = [
            newTimestamp,
            Math.round(newPrice * 100) / 100,
            Math.round((newPrice + Math.random() * 50) * 100) / 100,
            Math.round((newPrice + Math.random() * 50) * 100) / 100,
            Math.round((newPrice - Math.random() * 50) * 100) / 100,
            Math.round(newPrice * 100) / 100
        ];

        this.cryptoData.push(newPoint);

        // Keep only last 100 points
        if (this.cryptoData.length > 100) {
            this.cryptoData.shift();
        }

        // Update all charts
        Object.values(this.charts).forEach(chart => {
            if (chart.series && chart.series[0]) {
                chart.series[0].addPoint(newPoint, true, true);
            }
        });
    }
}

// Global chart manager instance
const chartManager = new CryptoChartManager();

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard chart if chartArea exists
    if (document.getElementById('chartArea')) {
        chartManager.initDashboardChart('chartArea');
    }

    // Initialize trading chart if chart exists
    if (document.getElementById('chart')) {
        chartManager.initTradingChart('chart');
    }

    // Update chart data every 5 seconds for demo purposes
    setInterval(() => {
        chartManager.updateChartData();
    }, 5000);
});