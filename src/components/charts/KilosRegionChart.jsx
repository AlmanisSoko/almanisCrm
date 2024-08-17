// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { connect } from 'react-redux';
// import { fetchHomePage } from '../../actions/auth';

// const KilosRegionChart = ({ fetchHomePage }) => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     fetchHomePage().then((response) => {
//       const { kilos_per_region } = response;
//       const labels = kilos_per_region.map((region) => region.region__region);
//       const data = kilos_per_region.map((region) => parseFloat(region.total_kilos));

//       setChartData({
//         labels: labels,
//         datasets: [
//           {
//             label: 'Kilos (Kgs)',
//             data: data,
//             backgroundColor: [
//                 'rgba(75, 192, 192, 0.8)',
//                 'rgba(0, 230, 64, 0.8)',
//                 'rgba(180, 132, 55, 0.8)',
//                 'rgba(0, 132, 105, 0.8)',
//                 'rgba(255, 99, 132, 0.8)',
//                 'rgba(255, 206, 86, 0.8)',
//                 'rgba(54, 162, 235, 0.8)',
//                 'rgba(153, 102, 255, 0.8)',
//             ],
//             borderColor: [
//                 'rgba(75, 192, 192, 0.8)',
//                 'rgba(0, 230, 64, 0.8)',
//                 'rgba(180, 132, 55, 0.8)',
//                 'rgba(0, 132, 105, 0.8)',
//                 'rgba(255, 99, 132, 0.8)',
//                 'rgba(255, 206, 86, 0.8)',
//                 'rgba(54, 162, 235, 0.8)',
//                 'rgba(153, 102, 255, 0.8)',
//             ],
//             borderWidth: 1,
//           },
//         ],
//       });
//     });
//   }, [fetchHomePage]);

//   return (
//     <div>
//       {chartData && <Pie data={chartData} />}
//     </div>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchHomePage: () => dispatch(fetchHomePage()),
//   };
// };

// export default connect(null, mapDispatchToProps)(KilosRegionChart);

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { fetchHomePage } from '../../actions/auth';

const KilosRegionChart = ({ fetchHomePage }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchHomePage().then((response) => {
      const { kilos_per_region } = response;
      const labels = kilos_per_region.map((region) => region.region__region);
      const data = kilos_per_region.map((region) => parseFloat(region.total_kilos));

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Kilos (Kgs)',
            data: data,
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
            borderColor: [
              'rgba(75, 192, 192, 0.8)',
              'rgba(0, 230, 64, 0.8)',
              'rgba(180, 132, 55, 0.8)',
              'rgba(0, 132, 105, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(153, 102, 255, 0.8)',
            ],
            borderWidth: 1,
          },
        ],
      });
    });
  }, [fetchHomePage]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '820px', height: '500px', marginTop: 50 }}>
      {chartData && <Pie data={chartData} options={options} />}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHomePage: () => dispatch(fetchHomePage()),
  };
};

export default connect(null, mapDispatchToProps)(KilosRegionChart);