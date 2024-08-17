

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { connect } from 'react-redux';
import { fetchCustomerDetails } from '../../../../actions/auth';

const MonthlyPaymentsChart = ({ fetchCustomerDetails, id }) => {
  const chartRef = useRef(null);
  const [chartData, setYearlyChartData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCustomerDetails(id).then((response) => {
        const { payments_by_month } = response;
        setYearlyChartData(payments_by_month);
        setDataFetched(true);
      });
    }
  }, [fetchCustomerDetails, id]); 

  useEffect(() => {
    if (dataFetched) {
      renderChart(chartData);
    }
  }, [chartData, dataFetched]);

  const renderChart = (data) => {
    if (!chartRef.current || !data || !dataFetched) {
      return;
    }
  
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
  
    const ctx = chartRef.current.getContext('2d');
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const labels = data.map(item => `${monthNames[item.month - 1]} ${item.year}`);
    const payment = data.map(item => item.total_payment);
  
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Payment (Ksh)',
          data: payment,
          backgroundColor: 'rgba(75, 192, 192, 0.4', // Adjust opacity for a more appealing style
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `${value} ksh`;
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
    fetchCustomerDetails: (id) => dispatch(fetchCustomerDetails(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyPaymentsChart);
