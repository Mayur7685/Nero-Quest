import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Bell, Menu, User, Home, Trophy, Award, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "NERO Quest - Earn Rewards for Social Actions",
  description: "Complete social quests to earn on-chain rewards on NERO Chain",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full py-2">
              <div className="container px-4 md:px-6">
                <div className="card-border-gradient border-purple">
                  <div className="rounded-[22px] bg-white/95 backdrop-blur-sm">
                    <div className="flex h-16 items-center px-4">
                      <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center text-white font-bold">
                          N
                        </div>
                        <span className="text-lg font-bold">NERO Quest</span>
                      </Link>

                      <nav className="hidden md:flex ml-8 gap-1">
                        <Link href="/" className="nav-button nav-button-inactive">
                          <div className="flex items-center gap-1.5">
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                          </div>
                        </Link>
                        <Link href="/dashboard" className="nav-button nav-button-inactive">
                          <div className="flex items-center gap-1.5">
                            <Trophy className="h-4 w-4" />
                            <span>Quests</span>
                          </div>
                        </Link>
                        <Link href="/reward" className="nav-button nav-button-inactive">
                          <div className="flex items-center gap-1.5">
                            <Award className="h-4 w-4" />
                            <span>Rewards</span>
                          </div>
                        </Link>
                        <Link href="/devview" className="nav-button nav-button-inactive">
                          <div className="flex items-center gap-1.5">
                            <Settings className="h-4 w-4" />
                            <span>Developer</span>
                          </div>
                        </Link>
                      </nav>

                      <div className="ml-auto flex items-center gap-2">
                        <div className="card-border-gradient border-purple hidden sm:block">
                          <Button variant="ghost" className="rounded-full bg-gradient-purple hover:bg-purple-200">
                            <Bell className="h-5 w-5 text-purple-600 mr-2" />
                            <span className="text-purple-700">Notifications</span>
                          </Button>
                        </div>

                        <div className="card-border-gradient border-purple">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-gradient-purple hover:bg-purple-200"
                          >
                            <User className="h-5 w-5 text-purple-600" />
                            <span className="sr-only">Profile</span>
                          </Button>
                        </div>

                        <Button variant="ghost" size="icon" className="rounded-full md:hidden hover-scale">
                          <Menu className="h-5 w-5" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
