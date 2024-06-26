'use client'
import React from 'react'
import imageHeader1 from '@/public/imageHeader1.svg'
import Link from 'next/link'
import run from '../public/run.jpg'
import place from '../public/place.jpeg'
import person from '../public/person.png'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect,useState } from 'react'
import axios from 'axios';



interface Place {
  description: string
  id: string;
  name: string;
  city: string[];
  image: string;
  trips: string[];
  stars?: { rating: number; uid: string }[];
  average?: number;
}

  
interface token{
  token: string 
}

interface Texto{
  texto:string;
}


interface IDPlace{
  id:string;
}

const CardsPlaces: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([])
  const { data: session, status } = useSession()

    const [idUser, setId] = useState<IDPlace | null>(null);
    const [showModal, setShowModal] = useState(false);


  const recortarTexto = (texto: string, longitudMaxima: number) => {
    if (texto.length > longitudMaxima) {
      return texto.substring(0, longitudMaxima) + '...'; 
    } else {
      return texto;
    }
  };


  const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjJkY2M5Y2U1MzE5OGY3NTkwYzBkMyIsImZpcnN0X25hbWUiOiJDbGVtZW50ZSIsImxhc3RfbmFtZSI6IkNMRU1FTlRFIiwiZW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzEzOTgyNjI0LCJleHAiOjE3MTQwNjkwMjR9.BfQeiAI9eAxu-O_68oRR32VZy3pKBPMqg-mhYTnpu48";

useEffect(() => {
  const fetchPlaces = async () => {
    try {
      if (session && session.user && token) {
        const response = await axios.get("https://no-country-back.onrender.com/api/places", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        setPlaces(response.data);
      } else {
        throw new Error('No session token available');
      }
    }
    catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  fetchPlaces();
}, []);

  return (
    <>
      <div className=' mb-5 p-4  ml-2 mt-1'>
        <h1 className=' font-aeonik  text-2xl'>Nuestras rutas destacadas</h1>
      </div>
      <section className='  p-4 m-2 grid md:grid-cols-3 gap-3'>
        {places.slice(0,6).map((place) => (
          <div className=' ' key={place.id}>
          <div className=' bg-soft-silver mt-10 rounded-lg border-gray-200 shadow '>
            <div className=' w-full'>
              <button className='relative w-full'>
                <div className='w-full'>
                <img
                className='size-full rounded-t-lg'
                width={200}
                height='auto' 
                src={place.image}
                alt='imagen de lugar'
              />

                  
                
        <div className="fixed inset-0 flex items-center justify-center bg-trasparent bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-3/4 sm:w-1/2 lg:w-1/3">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold">Añadido a favoritos</h2>
            <p>Elemento añadido a favoritos con éxito.</p>
          </div>
        </div>
      

                  
                </div>
              </button>
            </div>
            <div className='p-2'>
              <a href='#'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-black'>
                {place.name.charAt(0).toUpperCase() + place.name.slice(1).toLowerCase()}


                </h5>
              </a>
              <p>{recortarTexto(place.description,100)}</p>
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
                  {Math.round(place.average|| 4 )}
                </p>
              </div>
            </div>
          </div>
        </div>
        ))}
      </section>
      <hr />
    </>
  )
}

export default CardsPlaces
