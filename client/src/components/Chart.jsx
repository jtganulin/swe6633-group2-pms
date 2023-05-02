import { useEffect, useState } from 'react';
import { Box, VStack, Heading } from '@chakra-ui/react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadarChart, Radar, Legend, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';


const Chart = (props) => {
  const { project } = props;

  const [data, setData] = useState([
    {
      "type": "reqAnalysis",
      "name": "Requirements Analysis",
      "value": 0,
      "fullMark": 100
    },
    {
      "type": "design",
      "name": "Design",
      "value": 0,
      "fullMark": 100
    },
    {
      "type": "coding",
      "name": "Coding",
      "value": 0,
      "fullMark": 100
    },
    {
      "type": "testing",
      "name": "Testing",
      "value": 0,
      "fullMark": 100
    },
    {
      "type": "projectManagement",
      "name": "Project Management",
      "value": 0,
      "fullMark": 500
    }
  ]);

  function getData(project) {
    // First get the project's totalEffort, which has nested keys pertaining to each type of effort
    const totalEffort = project?.totalEffort;
    // Then loop through the data array and set the value of each type of effort to the value of the totalEffort
    const newData = data.map(d => {
      d.value = totalEffort[d.type];
      return d;
    });
    // Set the data state to the new data
    setData(newData);
  }

  useEffect(() => {
    getData(project);
  }, [])

  return (
    <ResponsiveContainer width={'80%'} height={300}>
      {/* <Box> */}
      {/* <Heading as="h2" size="lg">Effort Breakdown</Heading> */}
      <PieChart>
        <Pie data={data} nameKey="name" dataKey="value" cx="50%" cy="50%"
          outerRadius={40} fill="#8884d8" labelLine={false} labelFontSize={8}
          minAngle={30} label={({
            name,
            value,
            percent,
          }) => value !== 0 ? `${value}hrs` : null}> {/* Hides labels without values */}
          <Cell fill="#C19AB7" />
          <Cell fill="#9C95DC" />
          <Cell fill="#228CDB" />
          <Cell fill="#0B7189" />
          <Cell fill="#170A1C" />
        </Pie>
        <Tooltip formatter={(value, name) => `${value} hrs`} />
        <Legend />
        </PieChart>
      {/* </Box> */}
    </ResponsiveContainer>
  )

}

export default Chart;

/*
 *<RadarChart
        outerRadius={90}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey={"type"} />
        <PolarRadiusAxis angle={30} domain={[0, 500]} />
        <Radar name="functional" dataKey={"functional"} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="non functional" dataKey={"non functional"} stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
 */
