import React, { useState, useEffect } from 'react'
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
import { EditLocation } from '@material-ui/icons'

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
]

const monthsDropdownOptions = ['Svi', ...months]
console.log(monthsDropdownOptions)

const Statistics = () => {
    const [stats, setStats] = useState(null)
    const [data, setData] = useState(null)
    const [selectedYear, setSelectedYear] = useState(2021)
    const [month, setMonth] = useState('')

    const { isLoading } = useQuery('stats', () => getStats(month), {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
            setStats(res.data)
            const years = Object.keys(res.data.stats)
            console.log(years)
            const theLastYear = years[years.length - 1]
            setSelectedYear(theLastYear)
            console.log(theLastYear)
        },
    })

    useEffect(() => {
        // console.log(stats, selectedYear)
        if (stats) {
            const statsMapped = stats.stats[selectedYear].map((val, i) => {
                return {
                    name: months[i],
                    value: val,
                }
            })
            setData(statsMapped)
        }
    }, [selectedYear, stats])

    return (
        <div className="wrapper">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <h1 style={{ color: 'white' }}>
                        Broj igraca u {selectedYear}-oj godini
                    </h1>
                    <select
                        value={selectedYear}
                        onChange={(event) => {
                            setSelectedYear(parseInt(event.target.value))
                        }}
                    >
                        {Object.keys(stats.stats).map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>

                    <select>
                        {Object.keys(monthsDropdownOptions).map((el) => <option key={el} value={el}>{el}</option>)}
                    </select>
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
