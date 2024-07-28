"use client"
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'; // For dynamic import of ReactApexChart

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import PieChart from './PieChart';



const ContributionChart = ({ contributionData , pieData}) => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  // Function to sum amounts by month for the current year
  const sumAmountsByMonth = (data) => {
    const currentYear = new Date().getFullYear();
    const monthlyAmounts = new Array(12).fill(0); // Array to store monthly totals (Jan to Dec)
  
    data.forEach((contribution) => {
      if (contribution?.createdAt && contribution?.amount) {
        const createdAt = new Date(contribution.createdAt); // Parse createdAt date string
        const year = createdAt.getFullYear();
        
        if (year === currentYear) {
          const month = createdAt.getMonth(); // Month index (0-11)
          const amount = parseInt(contribution.amount);
  
          monthlyAmounts[month] += amount;
        }
      }
    });
  
    return monthlyAmounts;
  };

  // Prepare data for ApexCharts
  const prepareDataForChart = (monthlyTotals) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const data = months.map((month, index) => ({
      x: month,
      y: monthlyTotals[index] || 0, // Default to 0 if monthlyTotals[index] is undefined
    }));

    return data;
  };

  // Reference for ApexCharts
  const chartRef = useRef(null);

  // Effect to update chart options
  useEffect(() => {
    if (contributionData && contributionData?.length > 0) {
      setLoading(false);

      const monthlyTotals = sumAmountsByMonth(contributionData);
      const newChartData = prepareDataForChart(monthlyTotals);
      setChartData(newChartData); // Set chartData state with the new data

      if (chartRef.current  && chartRef.current.chart) {
        chartRef.current.chart.updateOptions({
          plotOptions: {
            bar: {
              colors: {
                ranges: [{
                  from: 0,
                  to: 100000, // Adjust based on your data range
                  color: '#18B8A8' // Single color for all bars
                }]
              },
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: true
          },
          xaxis: {
            title: {
              text: `Month Of The Year (${new Date().getFullYear()})`
            },
            categories: newChartData.map(item => item?.x),
          },
          yaxis: {
            title: {
              text: 'Total Contribution ($)'
            }
          },
          fill: {
            opacity: 1
          }
        });
      }
    }
  }, [contributionData]);

  return (
    <div>
      <h1 className='text-xl mt-4'>Total Contribution for the Year {new Date().getFullYear()}</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='flex items-center'>
          <div className='w-3/4'>
          {(typeof window !== 'undefined') &&
            <Chart
              options={{
                plotOptions: {
                  bar: {
                    colors: {
                      ranges: [{
                        from: 0,
                        to: 100000, // Adjust based on your data range
                        color: '#18B8A8' // Single color for all bars
                      }]
                    },
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                  },
                },
                chart: {
                  id: 'monthly-contributions-bar',
                },
                xaxis: {
                  title: {
                    text: `Month Of The Year (${new Date().getFullYear()})`
                  },
                  categories: chartData.map(item => item?.x),
                },
                yaxis: {
                  title: {
                    text: 'Total Contribution ($)'
                  }
                },
              }}
              series={[{
                name: 'Amount',
                data: chartData.map(item => item?.y),
              }]}
              type="bar"
              height={400}
              width={"100%"}
              ref={chartRef}
            />
          }
          </div>
          <div>
            <PieChart data={pieData}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionChart;
