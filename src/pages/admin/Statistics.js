import React, { useState } from 'react'
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
    ResponsiveContainer,
} from 'recharts'

const Statistics = () => {

    const months = [
        'Januar',
        'Februar',
        'Mart',
        'April',
        'Maj',
        'Jun',
        'Jul',
        'Avgust',
        'Septembar',
        'Oktobar',
        'Novembar',
        'Decembar',
    ];
    

    const [stats, setStats] = useState(null);
    const [data, setData] = useState(null);
    const [selectedYear, setSelectedYear] = useState(2021);

    const { isLoading } = useQuery('stats', () => getStats(), {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
            setStats(res.data);
            console.log(res.data);

            const statsMapped = res.data.stats[selectedYear].map((val, i) => {
                return {
                    name: months[i],
                    value: val
                }
            })
            setData(statsMapped);
        },
    })

    

    
    return (
        <div className="wrapper">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <h1 style={{ color: 'white' }}>
                        Broj igraca u 2020-oj godini
                    </h1>
                </>
            )}
            <ResponsiveContainer width="45%" height="35%">
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
                    <XAxis
                        dataKey="name"
                        scale="point"
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar
                        dataKey="value"
                        name="Odigrano"
                        fill="#8884d8"
                        background={{ fill: '#eee' }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Statistics
