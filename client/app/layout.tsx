import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'
import Provider from '@/contexts/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trek Trails',
  description: 'Comparte tus experiencias, descubre nuevos destinos, y mas.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='container-fluid max-w-screen-2xl m-auto'>
          <Provider>
            <Navbar />
            <main className='flex h-full  w-full'>{children}</main>
          </Provider>
        </div>
      </body>
    </html>
  )
}
