"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Award, Share, X, Trophy, CoinsIcon as Coin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ConfettiEffect } from "@/components/confetti-effect"

interface RewardModalProps {
  isOpen: boolean
  onClose: () => void
  questTitle: string
  reward: string
}

export function RewardModal({ isOpen, onClose, questTitle, reward }: RewardModalProps) {
  const [claimed, setClaimed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isClaimLoading, setIsClaimLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    } else {
      setClaimed(false)
    }
  }, [isOpen])

  const handleClaimReward = () => {
    setIsClaimLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsClaimLoading(false)
      setClaimed(true)
      setShowConfetti(true)

      toast({
        title: "Reward Claimed!",
        description: "Your NERO tokens and SBT have been added to your wallet.",
      })

      setTimeout(() => setShowConfetti(false), 3000)
    }, 2000)
  }

  const handleShareReward = () => {
    toast({
      title: "Sharing Reward",
      description: "This would open a share dialog for social media.",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <ConfettiEffect active={showConfetti} />

      <div className="relative max-h-[90vh] w-full max-w-lg overflow-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="animate-fade-in">
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">Congratulations!</h1>
            <p className="text-white/80">You've successfully completed the quest and earned a reward.</p>
          </div>

          <div className="card-border-gradient border-purple">
            <Card className="border-0 rounded-[22px] overflow-hidden">
              <CardHeader className="bg-gradient-purple pb-2 pt-6">
                <div className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-purple-600" />
                  <CardTitle className="text-2xl text-purple-700">Your Rewards</CardTitle>
                </div>
                <CardDescription className="text-purple-600">Soulbound Token (SBT)</CardDescription>
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
                  <h3 className="text-xl font-bold">{questTitle}</h3>
                  <p className="text-gray-500">You've successfully completed this quest</p>

                  <div className="mt-6 rounded-xl bg-gradient-purple p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coin className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Total Tokens</span>
                      </div>
                      <span className="text-xl font-bold text-purple-700">{reward}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-purple-600">
                      <span>Current Value</span>
                      <span>≈ $25</span>
                    </div>
                  </div>

                  <div className="mt-2 rounded-xl border border-purple-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Last Reward</span>
                      </div>
                      <span className="font-medium">
                        {reward} on {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 rounded-xl border border-purple-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Total Quests</span>
                      </div>
                      <span className="font-medium">1 Completed</span>
                    </div>
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

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {!claimed ? (
              <Button
                size="lg"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white"
                onClick={handleClaimReward}
                disabled={isClaimLoading}
              >
                {isClaimLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Claiming...</span>
                  </div>
                ) : (
                  <>
                    <Award className="mr-2 h-5 w-5" />
                    Claim Reward
                  </>
                )}
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-xl border-green-500 bg-green-50 text-green-600 hover:bg-green-100"
                disabled
              >
                <Award className="mr-2 h-5 w-5" />
                Reward Claimed
              </Button>
            )}

            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={handleShareReward}
            >
              <Share className="mr-2 h-5 w-5" />
              Share Achievement
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
