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

const Statistics = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState('') // u pocetku nemam izabran mesec pa ce da mi da rezultate za godine

    // ovaj month moze da bude broj od 0 do 11 ili prazan string
    // ako je broj onda je izabran mesec a ako je string onda nije izabran

    const [data, setData] = useState([]) // podaci koje prikazujemo
    const [stats, setStats] = useState(null) // svi podaci, za sve godine

    /* 
    
    Meni je ovaj stats isti objekat bilo da imam mesec ili godine izabrane
    
    stats = {
        2021: [...],
        2020: [...]
    }

    */

    const { isLoading, refetch: refetchStats } = useQuery(
        'stats',
        () => getStats(month),
        {
            refetchOnMount: false,
            onSuccess: (res) => {
                let resultStats = {}
                if (typeof month === 'number') {
                    resultStats = res.month // ovde imam i za 2020, 2021,...
                } else {
                    resultStats = res.stats
                }

                const theLastYear = Object.keys(resultStats).sort(
                    (a, b) => b - a
                )

                if (theLastYear.length !== 0) {
                    setSelectedYear(theLastYear[0])
                } else {
                    setSelectedYear(new Date().getFullYear())
                }

                setStats(resultStats)
            },
        }
    )

    useEffect(() => {
        refetchStats()
    }, [month, refetchStats])

    useEffect(() => {
        if (stats) {
            let statsData = stats[selectedYear] || []
            if (typeof month === 'number') {
                statsData = statsData.map((el, i) => ({
                    name: i + 1,
                    value: el,
                }))
            } else {
                statsData = statsData.map((el, i) => ({
                    name: months[i],
                    value: el,
                }))
            }
            setData(statsData)
        }
    }, [stats, selectedYear, month])

    return (
        <div className="wrapper">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <h1 style={{ color: 'white' }}>
                        Broj igraca u {selectedYear}-oj godini
                    </h1>
                    {stats && (
                        <select
                            value={selectedYear}
                            onChange={(event) => {
                                setSelectedYear(parseInt(event.target.value))
                            }}
                        >
                            {Object.keys(stats).map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    )}

                    <select
                        value={months[month]}
                        onChange={(event) => {
                            if (event.target.value !== 'Svi') {
                                setMonth(months.indexOf(event.target.value))
                            } else {
                                setMonth('')
                            }
                        }}
                    >
                        {monthsDropdownOptions.map((el, index) => (
                            <option key={index} value={el}>
                                {el}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {data.length === 0 ? (
                <div style={{ width: '55%' }}>
                    <h1 style={{ color: 'white', textAlign: 'center' }}>
                        Nema rezultata
                    </h1>
                </div>
            ) : (
                <ResponsiveContainer width="55%" height="35%">
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
            )}
        </div>
    )
}

export default Statistics
