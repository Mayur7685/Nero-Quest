"use client"

import { useState } from "react"
import { Award, Share2, Users, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuestCard, type Quest } from "@/components/quest-card"
import { RewardModal } from "@/components/reward-modal"

// Fake quest data
const questsData: Quest[] = [
  {
    id: "1",
    title: "Share a Tweet",
    description: "Share NERO Quest on Twitter and tag 3 friends",
    reward: "10 NERO",
    progress: 30,
    icon: Share2,
    color: "purple",
    tasks: [
      { id: "1-1", title: "Create a tweet about NERO Quest", completed: false },
      { id: "1-2", title: "Tag at least 3 friends in your tweet", completed: false },
      { id: "1-3", title: "Include the #NEROQuest hashtag", completed: false },
    ],
  },
  {
    id: "2",
    title: "Refer Friends",
    description: "Invite 5 friends to join NERO Quest",
    reward: "25 NERO",
    progress: 60,
    icon: Users,
    color: "blue",
    tasks: [
      { id: "2-1", title: "Share your referral link with friends", completed: false },
      { id: "2-2", title: "Get 3 friends to sign up", completed: false },
      { id: "2-3", title: "Get 5 friends to sign up", completed: false },
    ],
  },
  {
    id: "3",
    title: "Complete Profile",
    description: "Fill out your profile and connect social accounts",
    reward: "5 NERO",
    progress: 80,
    icon: Award,
    color: "orange",
    tasks: [
      { id: "3-1", title: "Add a profile picture", completed: false },
      { id: "3-2", title: "Connect at least one social account", completed: false },
      { id: "3-3", title: "Fill out your bio", completed: false },
    ],
  },
  {
    id: "4",
    title: "Daily Check-in",
    description: "Check in daily for 7 consecutive days",
    reward: "15 NERO",
    progress: 40,
    icon: Award,
    color: "green",
    tasks: [
      { id: "4-1", title: "Check in for 3 consecutive days", completed: false },
      { id: "4-2", title: "Check in for 5 consecutive days", completed: false },
      { id: "4-3", title: "Check in for 7 consecutive days", completed: false },
    ],
  },
]

export default function Dashboard() {
  const [userQuests, setUserQuests] = useState(questsData)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [completedQuest, setCompletedQuest] = useState<Quest | null>(null)

  const handleQuestComplete = (questId: string) => {
    const quest = userQuests.find((q) => q.id === questId)
    if (quest) {
      setCompletedQuest(quest)
      setShowRewardModal(true)
    }
  }

  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-center">Quest Dashboard</h1>
          <p className="text-gray-500 text-center">Complete quests to earn NERO tokens and exclusive rewards</p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Rewards Summary Card */}
          <div className="card-border-gradient border-purple">
            <Card className="border-0 rounded-[22px] overflow-hidden">
              <CardHeader className="bg-gradient-purple pb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-2xl text-purple-700">Your Rewards</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-gradient-purple p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Total Tokens</span>
                      </div>
                      <span className="text-xl font-bold text-purple-700">45 NERO</span>
                    </div>
                    <div className="mt-2 text-sm text-purple-600">Current Value: ≈ $25</div>
                  </div>

                  <div className="rounded-xl border border-purple-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Last Reward</span>
                      </div>
                      <span>10 NERO on {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-purple-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Total Quests</span>
                      </div>
                      <span>2/7 Completed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Available Quests</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} onQuestComplete={handleQuestComplete} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {completedQuest && (
        <RewardModal
          isOpen={showRewardModal}
          onClose={() => setShowRewardModal(false)}
          questTitle={completedQuest.title}
          reward={completedQuest.reward}
        />
      )}
    </main>
  )
}
