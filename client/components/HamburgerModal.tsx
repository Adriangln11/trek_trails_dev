import Link from 'next/link'
import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import { RiTwitterXFill, RiCloseFill } from 'react-icons/ri'
import logo from '@/public/logo.svg'
import { useSession } from 'next-auth/react'

interface ModalProps {
  open?: boolean
  close?: MouseEventHandler
}

export const HamburgerModal = ({
  open,
  close,
}: {
  open: boolean
  close: MouseEventHandler
}) => {
  const { data: session } = useSession()

  if (!open) return null
  return (
    <div
      tabIndex={-1}
      className=' fixed top-0 left-0 z-50 p-2 w-full h-full  overflow-y-hidden backdrop-blur-md flex  border-2 border-slate-300 rounded-lg'
    >
      <div className='w-full'>
        <button
          onClick={close}
          type='button'
          className='end-2.5 text-white bg-gray-500 hover:bg-gray-200 hover:text-red-700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center '
        >
          <RiCloseFill />
          <span className='sr-only'>Cerrar modal</span>
        </button>
        <div>
          <figure>
            <Image
              src={logo}
              alt='Logo de Aventura Compartida'
              width={100}
              priority={true}
              className='m-auto'
            />
          </figure>
        </div>
        <div>
          <div className=''>
            <ul className='flex flex-col  divide-y-2 font-semibold items-center text-black'>
              <li className='inline-flex items-center hover:text-teal py-3'>
                <Link href='/' className='' onClick={close}>
                  Inicio
                </Link>
              </li>
              <li className='inline-flex items-center hover:text-teal py-3'>
                <Link href='/explore' onClick={close}>
                  Explorar
                </Link>
              </li>
              <li className='inline-flex items-center hover:text-teal py-3'>
                <Link href='/post' onClick={close}>
                  Compartir
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {session?.user ? (
          <div></div>
        ) : (
          <div className='flex justify-center py-5'>
            <Link
              href='/login'
              className='bg-light-green text-white font-semibold rounded-full py-3 px-5 hover:bg-light hover:text-light-green hover:border-light-green'
            >
              Iniciar sesion
            </Link>
          </div>
        )}
        <div className='flex justify-center text-3xl my-5'>
          <div className=''>
            <ul className='flex font-semibold items-center text-white gap-3 '>
              <li className='inline-flex items-center py-3'>
                <i className='bg-light-green p-2 rounded-full  hover:text-light-green hover:bg-white'>
                  <FaInstagram />
                </i>
              </li>

              <li className='inline-flex items-center py-3'>
                <i className='bg-light-green p-2 rounded-full  hover:text-light-green hover:bg-white'>
                  <RiTwitterXFill />
                </i>
              </li>

              <li className='inline-flex items-center py-3'>
                <i className='bg-light-green p-2 rounded-full  hover:text-light-green hover:bg-white'>
                  <FaFacebookF />
                </i>
              </li>
            </ul>
          </div>
        </div>
        <div className='text-gray-500 font-bold text-center text-sm mt-10'>
          @Trek Trails
        </div>
      </div>
    </div>
  )
}

export default HamburgerModal