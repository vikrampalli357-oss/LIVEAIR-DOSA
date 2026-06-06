import './globals.css'
import { Rajdhani, Outfit } from 'next/font/google'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-header',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: 'Air Dosa - AI-Powered Drone Dosa Delivery',
  description: "Get hot, crispy dosas griddled mid-air and delivered autonomously via lidar-guided drones straight to your balcony. Fast, fresh, and futuristic.",
  keywords: 'Air Dosa, drone delivery, instant dosa, Indian food tech, drone food delivery, autopilot cooking'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${outfit.variable}`}>
      <body id="air-dosa-body">{children}</body>
    </html>
  )
}
