import About from '@/components/About'
import CardsPlaces from '@/components/CardsPlaces'
import CarrouselExplore from '@/components/CarrouselExplore'
import MainHeader from '@/components/MainHeader'
import Reviews from '@/components/Reviews'
import BgImage from '@/components/BgImage'


import CardsPlacesHome from '@/components/CardsPlacesHome'
export default function Home() {

  

  return (
    <div className=' w-full mt-3'>
      <div>
        <h1 className='text-3xl z-50 inset-x-0 inset-y-1 text-center  lg:text-6xl font-extrabold font-aeonik bg-clip-text text-transparent bg-gradient-to-r from-light-green to-teal'>
          ¿Buscas tu proxima aventura compartida?
        </h1>
      </div>
      <MainHeader />
       {/* {session ? <CardsPlaces /> : <CardsPlacesHome />} */}
       <CardsPlaces />
      <CarrouselExplore />
      <About />
      <Reviews />
      <BgImage />
    </div>
  )
}
