"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Share, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function RewardPage() {
  const [claimed, setClaimed] = useState(false)

  const handleClaimReward = () => {
    console.log("Claiming reward (simulated)")
    toast({
      title: "Reward Claimed!",
      description: "Your NERO tokens and SBT have been added to your wallet.",
    })
    setClaimed(true)
  }

  const handleShareReward = () => {
    console.log("Sharing reward (simulated)")
    toast({
      title: "Sharing Reward",
      description: "This would open a share dialog for social media.",
    })
  }

  return (
    <main className="flex-1 py-12">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-purple-600">Congratulations!</h1>
            <p className="text-xl text-gray-500">You've successfully completed the quest and earned a reward.</p>
          </div>

          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-75 blur-lg"></div>
              <Card className="relative overflow-hidden border-2 border-purple-200 bg-white">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 pb-2 pt-6 text-white">
                  <CardTitle className="text-2xl">Social Sharer</CardTitle>
                  <CardDescription className="text-purple-100">Soulbound Token (SBT)</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-8">
                  <div className="flex justify-center">
                    <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-lg">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="SBT Badge"
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/20 to-transparent"></div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2 text-center">
                    <h3 className="text-xl font-bold">Share a Tweet</h3>
                    <p className="text-gray-500">You've successfully shared NERO Quest with your network</p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span className="font-bold text-purple-600">Reward: 10 NERO</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-4 border-t bg-gray-50 px-6 py-4">
                  <div className="text-xs text-gray-500">
                    ID: NERO-SBT-12345 • Issued: {new Date().toLocaleDateString()}
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {!claimed ? (
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={handleClaimReward}
              >
                <Award className="mr-2 h-5 w-5" />
                Claim Reward
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 bg-green-50 text-green-600 hover:bg-green-100"
                disabled
              >
                <Award className="mr-2 h-5 w-5" />
                Reward Claimed
              </Button>
            )}

            <Button size="lg" variant="outline" onClick={handleShareReward}>
              <Share className="mr-2 h-5 w-5" />
              Share Achievement
            </Button>

            <Link href="/dashboard">
              <Button size="lg" variant="ghost">
                Back to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 rounded-lg border bg-gray-50 p-6">
            <h3 className="mb-4 text-lg font-medium">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600">
                  <Check className="h-4 w-4" />
                </div>
                <span>Your NERO tokens are added to your wallet balance</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600">
                  <Check className="h-4 w-4" />
                </div>
                <span>Your Soulbound Token (SBT) is minted to your wallet</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 text-green-600">
                  <Check className="h-4 w-4" />
                </div>
                <span>New quests are unlocked on your dashboard</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
