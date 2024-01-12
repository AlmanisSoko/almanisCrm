import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { fetchYearlyData } from '../../actions/auth';
import { connect } from 'react-redux';

const YearlySalesChart = ({ fetchYearlyData }) => {
  const chartRef = useRef(null);
  const [chartData, setYearlyChartData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetchYearlyData().then((response) => {
      const { year_total, year_farmer, year_profit, year_discount } = response;
      setYearlyChartData({ year_total, year_farmer, year_profit, year_discount });
      setDataFetched(true);
    });
  }, [fetchYearlyData]); 

  useEffect(() => {
    if (dataFetched) {
      renderChart(chartData);
    }
  }, [chartData, dataFetched]);

  const formatCurrency = (trays) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(trays);
  };

  const renderChart = (data) => {
    if (!chartRef.current || !data || !dataFetched) {
      return;
    }
  
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
  
    const ctx = chartRef.current.getContext('2d');

    // Define predefined colors for each dataset
    const colors = [
      'rgba(75, 192, 192, 0.8)',
      'rgba(0, 230, 64, 0.8)',
      'rgba(180, 132, 55, 0.8)',
      'rgba(0, 132, 105, 0.8)',
    ];
  
    const formattedData = Object.keys(data).map((key, index) => ({
      label: key,
      data: data[key]?.map((entry) => ({
        x: new Date(entry.date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(entry.date).getFullYear(),
        y: entry.amt,
      })) || [], // Add a check for data[key] to avoid 'Cannot read properties of undefined'
      backgroundColor: colors[index], // Use predefined colors
      borderColor: colors[index], // Use the same color for border
      borderWidth: 1,
    }));
  
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: formattedData[0].data.map((entry) => entry.x), // Assuming all datasets have the same labels
        datasets: formattedData,
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

export default connect(mapStateToProps, mapDispatchToProps)(YearlySalesChart);

