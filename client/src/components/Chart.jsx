import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadarChart, Radar, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

const testReq = [
  {
    effort: [
      {
        effortType: "reqAnalysis",
        timeCost: 3
      },
      {
        effortType: "coding",
        timeCost: 3
      },
      {
        effortType: "projectManagement",
        timeCost: 3
      },
      {
        effortType: "design",
        timeCost: 3
      }
    ]
  },
  {
    effort: [
      {
        effortType: "reqAnalysis",
        timeCost: 3
      },
      {
        effortType: "coding",
        timeCost: 3
      },
      {
        effortType: "projectManagement",
        timeCost: 3
      },
      {
        effortType: "design",
        timeCost: 3
      }
    ]
  }
]

const Chart = (props) => {

  const { project } = props;

  const [data, setData] = useState([
    {
      "type": "reqAnalysis",
      "functional": 0,
      "non functional": 0,
      "fullMark": 500
    },
    {
      "type": "design",
      "functional": 0,
      "non functional": 0,
      "fullMark": 500
    },
    {
      "type": "coding",
      "functional": 0,
      "non functional": 0,
      "fullMark": 500
    },
    {
      "type": "testing",
      "functional": 0,
      "non functional": 0,
      "fullMark": 500
    },
    {
      "type": "projectManagement",
      "functional": 0,
      "non functional": 0,
      "fullMark": 500
    }
  ]);

  const [functional, setFunctional] = useState([]);
  const [nonFunctional, setNonFunctional] = useState([]);
  
  function getData() {
  
    project?.funqReq?.forEach((item) => {
      item?.effort?.forEach((effort) => {

        const { effortType, timeCost } = effort;

        const matchingObject = data.find((data) => data.type === effortType);

        if (matchingObject) {
          matchingObject.functional += timeCost;
        }

        setData((prevState) => [...prevState]);

      })
    })

    project?.nonFuncReq?.forEach((item) => {
      item?.effort?.forEach((effort) => {
  
        const { effortType, timeCost } = effort;

        const matchingObject = data.find((data) => data.type === effortType);

        if (matchingObject) {
          matchingObject.functional += timeCost;
        }

        setData((prevState) => [...prevState]);

      })
    })

  }

  useEffect(() => {
    getData();
  },[])

  return (
    <ResponsiveContainer width={'80%'} height={300}>
      <PieChart>
        <Pie data={data} dataKey="type" nameKey="functional" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
        <Pie data={data} dataKey="type" nameKey="non-functional" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
      </PieChart>
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
