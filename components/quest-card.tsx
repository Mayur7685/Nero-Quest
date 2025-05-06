"use client"

import type React from "react"

import { useState } from "react"
import { Award, CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { ConfettiEffect } from "@/components/confetti-effect"

export interface Task {
  id: string
  title: string
  completed: boolean
}

export interface Quest {
  id: string
  title: string
  description: string
  reward: string
  progress: number
  icon: React.ElementType
  tasks: Task[]
  color: "purple" | "blue" | "orange" | "green"
}

interface QuestCardProps {
  quest: Quest
  onQuestComplete: (questId: string) => void
}

export function QuestCard({ quest, onQuestComplete }: QuestCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [tasks, setTasks] = useState(quest.tasks)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const completedTasks = tasks.filter((task) => task.completed).length
  const progress = Math.round((completedTasks / tasks.length) * 100)
  const isComplete = progress === 100

  const handleCompleteStep = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newCompleted = !task.completed
        if (newCompleted) {
          // Show mini celebration for task completion
          toast({
            title: "Task completed!",
            description: "Keep going to complete the quest!",
            duration: 2000,
          })
        }
        return { ...task, completed: newCompleted }
      }
      return task
    })

    setTasks(updatedTasks)

    // Check if all tasks are now completed
    const allCompleted = updatedTasks.every((task) => task.completed)
    if (allCompleted) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const handleSubmitQuest = () => {
    if (progress === 100) {
      setIsSubmitting(true)

      // Simulate loading
      setTimeout(() => {
        setIsSubmitting(false)
        onQuestComplete(quest.id)
      }, 1500)
    } else {
      toast({
        title: "Quest not complete",
        description: "Please complete all tasks before submitting.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <ConfettiEffect active={showConfetti} />
      <div className={`card-border-gradient border-${quest.color} shadow-lg hover-scale`}>
        <Card className="border-0 rounded-[22px] overflow-hidden">
          <CardHeader className={`bg-gradient-${quest.color} p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <quest.icon className="h-5 w-5" />
                <CardTitle>{quest.title}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/20"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
            <CardDescription>{quest.description}</CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 rounded-full bg-gray-200" />
            <div className="mt-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">{quest.reward}</span>
            </div>

            {expanded && (
              <div className="mt-6 space-y-4 animate-fade-in">
                <h3 className="text-lg font-medium">Quest Tasks</h3>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-start gap-3 rounded-xl p-3 transition-colors ${
                        task.completed ? "bg-green-50" : "bg-gray-50"
                      }`}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-6 w-6 rounded-full ${
                          task.completed ? "bg-green-100 text-green-600 border-green-200" : "bg-white"
                        }`}
                        onClick={() => handleCompleteStep(task.id)}
                      >
                        {task.completed ? (
                          <CheckCircle className="h-4 w-4 animate-bounce-in" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                        <span className="sr-only">Complete step</span>
                      </Button>
                      <div className="flex-1">
                        <p className={`font-medium ${task.completed ? "text-green-600" : ""}`}>{task.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex gap-2 border-t bg-gray-50 px-6 py-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isComplete ? "default" : "secondary"}
                    className={`w-full rounded-xl ${
                      isComplete ? `bg-${quest.color}-500 hover:bg-${quest.color}-600` : ""
                    } ${isComplete ? "animate-pulse-glow" : ""}`}
                    onClick={handleSubmitQuest}
                    disabled={!isComplete || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>{isComplete ? "Submit Quest" : "Accept Quest"}</>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This triggers a gasless transaction on NERO via Paymaster.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {!expanded && (
              <Button variant="outline" className="w-full rounded-xl" onClick={() => setExpanded(true)}>
                View Details
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
