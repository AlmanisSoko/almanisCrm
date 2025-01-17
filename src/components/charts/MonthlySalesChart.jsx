// import React, { useEffect, useRef, useState } from 'react';
// import { fetchMonthlyData } from '../../actions/auth';
// import { connect } from 'react-redux';
// import Chart from 'chart.js/auto';  // Import Chart.js

// const MonthlySalesChart = ({ fetchMonthlyData }) => {
//   const chartRef = useRef(null);
//   const [chartData, setMonthChart] = useState(null);

//   useEffect(() => {
//     fetchMonthlyData().then((response) => {
//       setMonthChart(response.month_chart); 
//     });
//   }, [fetchMonthlyData]);

//   useEffect(() => {
//     renderChart(chartData);
//   }, [chartData]);

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-KE', {
//       style: 'currency',
//       currency: 'KES',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(amount);
//   };

//   const renderChart = (data) => {
//     if (!chartRef.current || !data) {
//       return;
//     }

//     if (chartRef.current.chart) {
//       chartRef.current.chart.destroy();
//     }

//     const ctx = chartRef.current.getContext('2d');

//     const formattedData = data.map((entry) => ({
//       x: new Date(entry.date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(entry.date).getFullYear(),
//       y: entry.amt,
//     }));

//     const newChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: formattedData.map((entry) => entry.x),
//         datasets: [
//           {
//             label: 'Sales',
//             data: formattedData.map((entry) => entry.y),
//             backgroundColor: 'rgba(75, 192, 192, 0.4', // Adjust opacity for a more appealing style
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             ticks: {
//               callback: function (value) {
//                 return formatCurrency(value);
//               },
//             },
//           },
//         },
//       },
//     });

//     chartRef.current.chart = newChart;
//   };

//   return (
//     <div>
//       <canvas ref={chartRef} />
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   user: state.auth.user,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchMonthlyData: () => dispatch(fetchMonthlyData()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MonthlySalesChart);


import React, { useEffect, useRef, useState } from 'react';
import { fetchMonthlyData } from '../../actions/auth';
import { connect } from 'react-redux';
import Chart from 'chart.js/auto';

const MonthlySalesChart = ({ fetchMonthlyData }) => {
  const chartRef = useRef(null);
  const [chartData, setMonthChart] = useState(null);

  useEffect(() => {
    fetchMonthlyData().then((response) => {
      setMonthChart(response.month_chart); 
    });
  }, [fetchMonthlyData]);

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

    // Filter data for current year
    const currentYear = new Date().getFullYear();
    const filteredData = data.filter(entry => new Date(entry.date).getFullYear() === currentYear);

    const formattedData = filteredData.map((entry) => ({
      x: new Date(entry.date).toLocaleString('default', { month: 'long' }),
      y: entry.amt,
    }));

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: formattedData.map((entry) => entry.x),
        datasets: [
          {
            label: `Sales ${currentYear}`,
            data: formattedData.map((entry) => entry.y),
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
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
        plugins: {
          title: {
            display: true,
            text: `Monthly Sales for ${currentYear}`,
            font: {
              size: 16
            }
          }
        }
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
    fetchMonthlyData: () => dispatch(fetchMonthlyData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthlySalesChart);