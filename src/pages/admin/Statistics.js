import React from 'react'
import { useQuery } from 'react-query'
import { getStats } from '../../services/stats'
import Spinner from '../../components/Spinner'
import {
    BarChart,
    CartesianGrid,
    XAxis,
    Tooltip,
    YAxis,
    Legend,
    Bar,
    ResponsiveContainer
} from 'recharts'

const Statistics = () => {
    const [stats, setStats] = React.useState(null)
    const { isLoading } = useQuery('scores', () => getStats(), {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
            setStats(res.data)
            console.log(res.data)
        },
    })

    const data = [
        { name: 'Januar', value: 10 },
        { name: 'Februar', value: 22 },
        { name: 'March', value: 44 },
        { name: 'April', value: 65 },
        { name: 'May', value: 178 },
        { name: 'Jun', value: 365 },
        { name: 'Juli', value: 125 },
        { name: 'August', value: 548},
        { name: 'September', value: 325 },
        { name: 'October', value: 800 },
        { name: 'November', value: 1220 },
        { name: 'December', value: 1654 },
    ]

    return (
        <div className="wrapper">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <h1 style={{ color: 'white' }}>Broj igraca u 2020-oj godini</h1>
                </>
            )}
            <ResponsiveContainer width="50%" height="35%">
        <BarChart
          width={300}
          height={150}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={30}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
        </div>
    )
}

export default Statistics
