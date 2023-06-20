import Header from '@/components/header'
import Clock from '@/components/clock'
import SearchBox from '@/components/search-box'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col">
        <Header />
        <Clock />
        <div className="w-full">
          <SearchBox />
        </div>
      </div>
    </div>
  )
}
