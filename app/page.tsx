import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Twitter, Sparkles, Clock, Gift, Shield, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="card-border-gradient border-purple inline-block self-start mb-4">
                  <div className="rounded-full bg-gradient-purple px-4 py-1">
                    <p className="text-sm font-medium text-purple-700">✨ New: Earn NERO tokens for social actions</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    NERO Quest – Earn Rewards for Social Actions
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Complete social quests, connect with others, and earn on-chain rewards. No gas fees, no complicated
                    wallets - just fun and rewards.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 rounded-full shadow-lg hover-scale"
                        >
                          Sign in with Google
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[300px] rounded-xl">
                        <p>This will create a smart wallet on NERO Chain via Account Abstraction (no gas fees).</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="lg"
                          variant="outline"
                          className="bg-white text-purple-600 border-purple-200 hover:bg-purple-50 rounded-full shadow-lg hover-scale"
                        >
                          <Twitter className="mr-2 h-4 w-4" />
                          Sign in with Twitter
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[300px] rounded-xl">
                        <p>This will create a smart wallet on NERO Chain via Account Abstraction (no gas fees).</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]">
                  <div className="card-border-gradient border-purple">
                    <div className="rounded-[22px] overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=450&width=450"
                        alt="NERO Quest Hero"
                        width={450}
                        height={450}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 card-border-gradient border-orange shadow-lg hover-scale">
                    <div className="rounded-[22px] bg-white p-4">
                      <p className="text-lg font-bold text-orange-600">Earn NERO Tokens</p>
                      <p className="text-sm text-gray-600">Complete quests, get rewards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-purple">
          <div className="container px-4 md:px-6">
            <div className="card-border-gradient border-purple mx-auto max-w-4xl">
              <div className="rounded-[22px] bg-white p-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter text-purple-700 sm:text-4xl">
                      What is NERO Quest?
                    </h2>
                    <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      NERO Quest is a SocialFi platform that rewards users for completing social actions and engaging
                      with Web3 communities.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full">
                    <div className="card-border-gradient border-blue">
                      <div className="rounded-[22px] bg-gradient-blue p-4">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-blue-600" />
                          <h3 className="font-bold text-blue-700">Gasless Transactions</h3>
                        </div>
                        <p className="text-sm mt-2">No gas fees thanks to Account Abstraction technology</p>
                      </div>
                    </div>
                    <div className="card-border-gradient border-orange">
                      <div className="rounded-[22px] bg-gradient-orange p-4">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-orange-600" />
                          <h3 className="font-bold text-orange-700">Soulbound Tokens</h3>
                        </div>
                        <p className="text-sm mt-2">Earn unique non-transferable NFTs for your achievements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="card-border-gradient border-purple hover-scale">
                <div className="rounded-[22px] flex flex-col items-center space-y-2 bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-700">Accept Quests</h3>
                  <p className="text-sm text-center text-gray-500">
                    Browse and accept social quests that match your interests and skills
                  </p>
                </div>
              </div>
              <div className="card-border-gradient border-blue hover-scale">
                <div className="rounded-[22px] flex flex-col items-center space-y-2 bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">Complete Tasks</h3>
                  <p className="text-sm text-center text-gray-500">
                    Follow the steps to complete each quest's requirements and track your progress
                  </p>
                </div>
              </div>
              <div className="card-border-gradient border-orange hover-scale">
                <div className="rounded-[22px] flex flex-col items-center space-y-2 bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                    <Gift className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-600">Earn Rewards</h3>
                  <p className="text-sm text-center text-gray-500">
                    Claim your NERO tokens and exclusive Soulbound Tokens (SBTs) as rewards
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-full shadow-lg hover-scale"
                >
                  Explore Quests
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-purple-700">
                  Popular Quest Categories
                </h2>
                <p className="mt-2 text-gray-500">Discover different ways to earn rewards on NERO Quest</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-border-gradient border-purple hover-scale">
                  <div className="rounded-[22px] bg-white p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <Twitter className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-purple-700">Social Sharing</h3>
                    </div>
                    <p className="text-gray-500 mb-4">
                      Share content about NERO Chain on social media platforms and tag friends to earn rewards.
                    </p>
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="font-medium">Rewards up to:</span>
                      <span className="ml-auto font-bold">25 NERO</span>
                    </div>
                  </div>
                </div>

                <div className="card-border-gradient border-blue hover-scale">
                  <div className="rounded-[22px] bg-white p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Award className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-700">Community Engagement</h3>
                    </div>
                    <p className="text-gray-500 mb-4">
                      Participate in community discussions, answer questions, and help new users.
                    </p>
                    <div className="flex items-center text-sm text-blue-600">
                      <span className="font-medium">Rewards up to:</span>
                      <span className="ml-auto font-bold">15 NERO</span>
                    </div>
                  </div>
                </div>

                <div className="card-border-gradient border-orange hover-scale">
                  <div className="rounded-[22px] bg-white p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                        <Shield className="h-5 w-5 text-orange-600" />
                      </div>
                      <h3 className="text-xl font-bold text-orange-600">Testing & Feedback</h3>
                    </div>
                    <p className="text-gray-500 mb-4">
                      Test new features, report bugs, and provide valuable feedback to improve the platform.
                    </p>
                    <div className="flex items-center text-sm text-orange-600">
                      <span className="font-medium">Rewards up to:</span>
                      <span className="ml-auto font-bold">30 NERO</span>
                    </div>
                  </div>
                </div>

                <div className="card-border-gradient border-green hover-scale">
                  <div className="rounded-[22px] bg-white p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Gift className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-green-600">Referral Program</h3>
                    </div>
                    <p className="text-gray-500 mb-4">
                      Invite friends to join NERO Quest and earn rewards when they complete their first quest.
                    </p>
                    <div className="flex items-center text-sm text-green-600">
                      <span className="font-medium">Rewards up to:</span>
                      <span className="ml-auto font-bold">20 NERO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-8 md:px-6">
          <p className="text-center text-sm text-gray-500 md:text-left">© 2025 NERO Quest. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
