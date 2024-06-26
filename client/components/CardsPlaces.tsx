'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Place } from '@/types/place'
import { getPlaces } from '@/utils/http.utils'

const CardsPlaces = () => {
  const [places, setPlaces] = useState<Place[]>([])
  const { data: session, status } = useSession()

  const [idUser, setId] = useState('null')
  const [showModal, setShowModal] = useState(false)

  const recortarTexto = (texto: string, longitudMaxima: number) => {
    if (texto.length > longitudMaxima) {
      return texto.substring(0, longitudMaxima) + '...'
    } else {
      return texto
    }
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response: any = await getPlaces()
        setPlaces(response.data)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    }

    fetchPlaces()
  }, [])
  // const recortarTexto = (texto: string, longitudMaxima: number) => {
  //   if (texto.length > longitudMaxima) {
  //     return texto.substring(0, longitudMaxima) + '...';
  //   } else {
  //     return texto;
  //   }
  // };

  function handleButtonClick(_id: any): void {
    setId(_id)

    const postID = async () => {
      try {
        const token: string | undefined = session?.user?.token

        if (session && session.user && token) {
          const bodyData = {
            favorites: _id,
          }

          const response = await axios.put(
            'https://no-country-back.onrender.com/api/users/favorites/6622dcc9ce53198f7590c0d3',
            bodyData,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )

          setShowModal(true)
        } else {
          throw new Error('No session token available or idUser is null')
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    }

    postID()
  }

  return (
    <>
      <div className=' mb-5 p-4  ml-2 mt-1'>
        <h1 className=' font-aeonik  text-2xl'>Nuestras rutas destacadas</h1>
      </div>
      <section className='  p-4 m-2 grid md:grid-cols-3 gap-3'>
        {places
          .slice(0, 6)
          .sort((a, b) => (b.average || 0) - (a.average || 0))
          .map((place) => (
            <a
              href={`/description/${place.id}`}
              className='h-md '
              key={place.id}
            >
              <div className=' bg-soft-silver mt-10 rounded-lg border-gray-200 shadow h-full flex flex-col justify-between'>
                <div className=' w-full'>
                  <div className='relative w-full'>
                    <div className='w-full'>
                      <img
                        className='size-full rounded-t-lg'
                        width={200}
                        height='auto'
                        src={place.image}
                        alt='imagen de lugar'
                      />

                      <button onClick={() => handleButtonClick(place.id)}>
                        <svg
                          className='text-white  absolute top-1 right-1'
                          width={40}
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                        >
                          <path d='M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z'></path>
                        </svg>
                      </button>
                      {showModal && (
                        <div className='fixed inset-0 flex items-center justify-center bg-trasparent bg-opacity-50 z-50'>
                          <div className='bg-white p-6 rounded-lg shadow-lg relative w-3/4 sm:w-1/2 lg:w-1/3'>
                            <button
                              className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'
                              onClick={() => setShowModal(false)}
                            >
                              &times;
                            </button>
                            <h2 className='text-xl font-semibold'>
                              Añadido a favoritos
                            </h2>
                            <p>Elemento añadido a favoritos con éxito.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='p-2'>
                  <div>
                    <h5 className='mb-2 text-2xl font-bold tracking-tight text-black'>
                      {place.name.charAt(0).toUpperCase() +
                        place.name.slice(1).toLowerCase()}
                    </h5>
                  </div>
                  <p>{recortarTexto(place.description, 100)}</p>
                </div>
                <div className='flex justify-between'>
                  <div className='flex m-2  '>
                    <Image
                      className=' rounded-full text-center  '
                      width={30}
                      height={30}
                      src={place.image}
                      alt='imagen de lugar'
                    />
                    <p className=' ml-1 mt-1 overflow-hidden text-center text-black '>
                      {/* {place.} */}
                    </p>
                  </div>

                  <div className='flex justify-center rounded bg-white p-1 m-2'>
                    <svg
                      width={15}
                      className='text-soft-green m-1 '
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z'></path>
                    </svg>
                    <p
                      className='  font-normal 
        text-black mr-3'
                    >
                      {place.average
                        ? Math.round(place.average).toFixed(1)
                        : 3.9}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
      </section>
      <hr />
    </>
  )
}

export default CardsPlaces
