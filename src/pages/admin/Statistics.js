import React from 'react'
import { useQuery } from 'react-query'
import { getStats } from '../../services/stats'
import Spinner from '../../components/Spinner'

const Statistics = () => {
    const [stats, setStats] = React.useState(null)
    const { isLoading } = useQuery('scores', () => getStats(), {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
            setStats(res.data)
        },
    })

    console.log(stats)

    return (
        <div className="wrapper">
            {isLoading ? <Spinner /> : <>

            <h1 style={{ color: '#fff' }}>hello</h1>
            </>}
        </div>
    )
}

export default Statistics
