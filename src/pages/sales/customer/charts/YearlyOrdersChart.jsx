import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { connect } from 'react-redux';
import { fetchCustomerDetails } from '../../../../actions/auth';

const YearlyOrdersChart = ({ fetchCustomerDetails, id }) => {
  const chartRef = useRef(null);
  const [chartData, setYearlyChartData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCustomerDetails(id).then((response) => {
        const { orders_by_year } = response;
        setYearlyChartData(orders_by_year);
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

    const colors = [
      'rgba(75, 192, 192, 0.8)',
      'rgba(0, 230, 64, 0.8)',
      'rgba(180, 132, 55, 0.8)',
      'rgba(0, 132, 105, 0.8)',
    ];

    const labels = data.map(item => item.year);
    const amounts = data.map(item => item.total_kilos); // assuming `total_amount` is in kgs
  
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Orders (kgs)',
          data: amounts,
          backgroundColor: colors[0],
          borderColor: colors[0],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `${value} kgs`;
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

export default connect(mapStateToProps, mapDispatchToProps)(YearlyOrdersChart);
