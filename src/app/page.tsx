import Header from '@/components/header'
import Clock from '@/components/clock'
import SearchBox from '@/components/search-box'
import Wallpaper from '@/components/wallpaper'

export default function Home() {
  return (
    <>
      <div className="relative z-[1]">
        <div className="flex flex-col">
          <Header />
          <Clock />
          <div className="w-full">
            <SearchBox />
          </div>
        </div>
      </div>
      <Wallpaper />
    </>
  )
}
