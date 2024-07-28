"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // For dynamic import of ReactApexChart

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [chartOptions, setChartOptions] = useState({
    labels: [],
    series: [],
    chart: {
      type: 'pie',
      height: 350,
    },
    legend: {
      position: 'bottom',
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false);

      const newChartOptions = {
        ...chartOptions,
        labels: data.map(item => item?.featureType || ''),
        series: data.map(item => item?.count || 0),
      };

      setChartOptions(newChartOptions);
    }
  }, [data]);

  return (
    <div>
      {loading ? (
        <p>Loading Pie Chart...</p>
      ) : (
        <Chart options={chartOptions} series={chartOptions.series} type="pie" height={350} width='100%'/>
      )}
    </div>
  );
};

export default PieChart;
