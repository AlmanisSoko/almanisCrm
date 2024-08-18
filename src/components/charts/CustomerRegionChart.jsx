import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { fetchCustomerRegion } from '../../actions/auth';
import { connect } from 'react-redux';

const CustomerRegionChart = ({ fetchCustomerRegion }) => {
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState({});
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetchCustomerRegion().then((response) => {
      const {
        nairobi,
        central,
        eastern,
        rift_valley,
        coast,
        nyanza,
        western,
        north_eastern,
      } = response;

      const newData = {
        labels: [
          'Nairobi',
          'Central',
          'Eastern',
          'Rift Valley',
          'Coast',
          'Nyanza',
          'Western',
          'North Eastern',
        ],
        datasets: [
          {
            data: [
              nairobi,
              central,
              eastern,
              rift_valley,
              coast,
              nyanza,
              western,
              north_eastern,
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.8)',
              'rgba(0, 230, 64, 0.8)',
              'rgba(180, 132, 55, 0.8)',
              'rgba(0, 132, 105, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(153, 102, 255, 0.8)',
            ],
          },
        ],
      };

      setChartData(newData);
      setDataFetched(true);
    });
  }, [fetchCustomerRegion]);

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

    const newChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    chartRef.current.chart = newChart;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', marginTop: 90 }}>
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
    fetchCustomerRegion: () => dispatch(fetchCustomerRegion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRegionChart);
