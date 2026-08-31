import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import SystemStatus from '../components/SystemStatus'
import Stats from '../components/Stats'
import StationInfo from '../components/StationInfo'

export default function HomePage({ passes, loading, error }) {
    return (
        <>
            <Hero />
            <Gallery passes={passes.filter(p => p.images && p.images.length > 0)} loading={loading} />
            <SystemStatus error={error} />
            <Stats passes={passes} />
            <StationInfo />
        </>
    )
}
