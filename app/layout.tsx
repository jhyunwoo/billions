import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Boilerplate',
  description:
    'Boilerplate with Next.js, TypeScript, Drizzle ORM, TailwindCSS, Auth.js and Yarn PnP',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <Link href={'/'} className={'w-full p-4 flex items-center justify-center'}>
          <div className={'text-4xl font-bold'}>Billions</div>
        </Link>
        {children}
      </body>
    </html>
  )
}
