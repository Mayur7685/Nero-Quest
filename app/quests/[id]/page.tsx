"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Award, Check, CheckCircle, Circle, Share2, Users } from "lucide-react"
import { useQuestService } from "@/services/quest"
import { useNeroContext } from "@/contexts/NeroContext"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

export default function QuestDetail({ params }: { params: { id: string } }) {
  const questId = parseInt(params.id)
  const { isConnected, connectWallet } = useNeroContext()
  const questService = useQuestService()
  
  const [quest, setQuest] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isConnected) {
      loadQuestData()
    }
  }, [isConnected, questId])

  const loadQuestData = async () => {
    try {
      setIsLoading(true)
      const questDetails = await questService.getQuestDetails(questId)
      const progress = await questService.getQuestProgress(
        await questService.signer.getAddress(),
        questId
      )
      
      setQuest(questDetails)
      setTasks(questDetails.taskIds.map((taskId: number, index: number) => ({
        id: taskId,
        title: `Task ${index + 1}`,
        completed: progress[index]
      })))
    } catch (error) {
      console.error('Error loading quest data:', error)
      toast({
        title: "Error",
        description: "Failed to load quest data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteStep = async (taskId: number) => {
    if (!isConnected) {
      await connectWallet()
      return
    }

    try {
      setIsSubmitting(true)
      await questService.completeTask(questId, taskId)
      await loadQuestData()
      toast({
        title: "Success",
        description: "Task completed successfully!",
      })
    } catch (error) {
      console.error('Error completing task:', error)
      toast({
        title: "Error",
        description: "Failed to complete task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitQuest = async () => {
    if (!isConnected) {
      await connectWallet()
      return
    }

    try {
      setIsSubmitting(true)
      await questService.claimReward(questId)
      toast({
        title: "Success",
        description: "Quest completed and reward claimed!",
      })
      window.location.href = "/reward"
    } catch (error) {
      console.error('Error claiming reward:', error)
      toast({
        title: "Error",
        description: "Failed to claim reward. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!quest) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Quest not found</h1>
        <Link href="/quests">
          <Button>Back to Quests</Button>
        </Link>
      </div>
    )
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const progress = Math.round((completedTasks / tasks.length) * 100)
  const isComplete = progress === 100

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{quest.title}</CardTitle>
          <CardDescription>{quest.description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                    <span>{task.title}</span>
                  </div>
                  <Button
                    variant={task.completed ? "outline" : "default"}
                    onClick={() => handleCompleteStep(task.id)}
                    disabled={task.completed || isSubmitting}
                  >
                    {task.completed ? "Completed" : "Complete"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 border-t bg-gray-50 px-6 py-4">
          <Button
            variant={isComplete ? "default" : "secondary"}
            className={`w-full rounded-xl ${isComplete ? "animate-pulse-glow" : ""}`}
            onClick={handleSubmitQuest}
            disabled={!isComplete || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <>{isComplete ? "Claim Reward" : "Complete Tasks"}</>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 