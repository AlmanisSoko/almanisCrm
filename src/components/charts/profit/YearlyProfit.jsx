import React, { useEffect, useRef, useState } from 'react';
import { fetchYearlyData } from '../../../actions/auth';
import { connect } from 'react-redux';
import Chart from 'chart.js/auto';  // Import Chart.js

const YearlyProfit = ({ fetchYearlyData }) => {
  const chartRef = useRef(null);
  const [chartData, setYearChart] = useState(null);

  useEffect(() => {
    fetchYearlyData().then((response) => {
      setYearChart(response.year_profit);
    });
  }, [fetchYearlyData]);

  useEffect(() => {
    renderChart(chartData);
  }, [chartData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const renderChart = (data) => {
    if (!chartRef.current || !data) {
      return;
    }

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    const formattedData = data.map((entry) => ({
      x: new Date(entry.date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(entry.date).getFullYear(),
      y: entry.amt,
    }));

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: formattedData.map((entry) => entry.x),
        datasets: [
          {
            label: 'Profit',
            data: formattedData.map((entry) => entry.y),
            backgroundColor: 'rgba(75, 192, 192, 0.4', // Adjust opacity for a more appealing style
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return formatCurrency(value);
              },
            },
          },
        },
      },
    });

    chartRef.current.chart = newChart;
  };

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchYearlyData: () => dispatch(fetchYearlyData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YearlyProfit);
