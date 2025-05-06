"use client"

import { useState } from "react"
import { ArrowRight, Info, Check, Code, Server, Wallet, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DeveloperView() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const handleStepHover = (step: number) => {
    setActiveStep(step)
  }

  const handleStepLeave = () => {
    setActiveStep(null)
  }

  return (
    <main className="flex-1 py-12">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Developer View</h1>
            <p className="text-gray-500">Visual representation of the ERC-4337 UserOperation lifecycle on NERO Chain</p>
          </div>

          <div className="card-border-gradient border-purple">
            <Card className="border-0 rounded-[22px] overflow-hidden">
              <CardHeader className="bg-gradient-purple">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-purple-700">ERC-4337 UserOperation Lifecycle</CardTitle>
                </div>
                <CardDescription className="text-purple-600">
                  How Account Abstraction works on NERO Chain
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative py-8">
                  {/* Flow diagram */}
                  <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-purple-100"></div>

                  <TooltipProvider>
                    {/* Step 1: Create UserOperation */}
                    <div
                      className={`relative mb-16 transition-all duration-300 ${activeStep === 1 ? "scale-105" : ""}`}
                      onMouseEnter={() => handleStepHover(1)}
                      onMouseLeave={handleStepLeave}
                    >
                      <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-purple-600 text-white shadow-lg">
                        1
                      </div>
                      <div className="card-border-gradient border-purple ml-auto mr-[calc(50%+2rem)] max-w-xs hover-scale">
                        <div className="rounded-[22px] bg-white p-4">
                          <h3 className="mb-2 font-bold text-purple-600">Create UserOperation</h3>
                          <p className="text-sm text-gray-600">
                            User initiates an action (like accepting a quest) which creates a UserOperation
                          </p>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="mt-2 h-7 gap-1 px-2 text-xs rounded-full">
                                <Info className="h-3.5 w-3.5" />
                                More Info
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-xs rounded-xl">
                              <p>
                                A UserOperation is a data structure that describes the action a user wants to perform.
                                It's similar to a transaction but more flexible.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="absolute left-1/2 top-[calc(50%+1.5rem)] -translate-x-1/2">
                        <ArrowRight className="h-6 w-6 rotate-90 text-purple-400" />
                      </div>
                    </div>

                    {/* Step 2: Bundler */}
                    <div
                      className={`relative mb-16 transition-all duration-300 ${activeStep === 2 ? "scale-105" : ""}`}
                      onMouseEnter={() => handleStepHover(2)}
                      onMouseLeave={handleStepLeave}
                    >
                      <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-lg">
                        2
                      </div>
                      <div className="card-border-gradient border-blue ml-[calc(50%+2rem)] max-w-xs hover-scale">
                        <div className="rounded-[22px] bg-white p-4">
                          <h3 className="mb-2 font-bold text-blue-600">Bundler</h3>
                          <p className="text-sm text-gray-600">
                            The Bundler collects UserOperations and submits them to the EntryPoint contract
                          </p>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="mt-2 h-7 gap-1 px-2 text-xs rounded-full">
                                <Info className="h-3.5 w-3.5" />
                                More Info
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs rounded-xl">
                              <p>
                                Bundlers are specialized nodes that collect UserOperations from many users, bundle them
                                together, and submit them to the blockchain in a single transaction.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="absolute left-1/2 top-[calc(50%+1.5rem)] -translate-x-1/2">
                        <ArrowRight className="h-6 w-6 rotate-90 text-blue-400" />
                      </div>
                    </div>

                    {/* Step 3: Paymaster */}
                    <div
                      className={`relative mb-16 transition-all duration-300 ${activeStep === 3 ? "scale-105" : ""}`}
                      onMouseEnter={() => handleStepHover(3)}
                      onMouseLeave={handleStepLeave}
                    >
                      <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-green-600 text-white shadow-lg">
                        3
                      </div>
                      <div className="card-border-gradient border-green ml-auto mr-[calc(50%+2rem)] max-w-xs hover-scale">
                        <div className="rounded-[22px] bg-white p-4">
                          <h3 className="mb-2 font-bold text-green-600">Paymaster</h3>
                          <p className="text-sm text-gray-600">
                            The Paymaster pays for gas fees on behalf of the user, enabling gasless transactions
                          </p>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="mt-2 h-7 gap-1 px-2 text-xs rounded-full">
                                <Info className="h-3.5 w-3.5" />
                                More Info
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-xs rounded-xl">
                              <p>
                                Paymasters are contracts that can sponsor gas fees for users. This enables gasless
                                transactions where users don't need to hold native tokens to pay for gas.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="absolute left-1/2 top-[calc(50%+1.5rem)] -translate-x-1/2">
                        <ArrowRight className="h-6 w-6 rotate-90 text-green-400" />
                      </div>
                    </div>

                    {/* Step 4: Execution */}
                    <div
                      className={`relative transition-all duration-300 ${activeStep === 4 ? "scale-105" : ""}`}
                      onMouseEnter={() => handleStepHover(4)}
                      onMouseLeave={handleStepLeave}
                    >
                      <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-orange-600 text-white shadow-lg">
                        4
                      </div>
                      <div className="card-border-gradient border-orange ml-[calc(50%+2rem)] max-w-xs hover-scale">
                        <div className="rounded-[22px] bg-white p-4">
                          <h3 className="mb-2 font-bold text-orange-600">Execution</h3>
                          <p className="text-sm text-gray-600">
                            The UserOperation is executed on-chain, updating state and emitting events
                          </p>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="mt-2 h-7 gap-1 px-2 text-xs rounded-full">
                                <Info className="h-3.5 w-3.5" />
                                More Info
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs rounded-xl">
                              <p>
                                The EntryPoint contract validates and executes the UserOperation. This includes
                                verifying signatures, checking gas limits, and calling the target contract with the
                                user's data.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </TooltipProvider>
                </div>

                <div className="mt-8 card-border-gradient border-purple">
                  <div className="rounded-[22px] bg-gradient-purple p-6">
                    <h3 className="mb-4 font-medium text-purple-700">Key Benefits</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-white p-1 text-purple-600 mt-0.5">
                          <Check className="h-4 w-4" />
                        </div>
                        <span>Gasless transactions - users don't need to hold native tokens</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-white p-1 text-purple-600 mt-0.5">
                          <Check className="h-4 w-4" />
                        </div>
                        <span>Improved UX - no need for browser extensions or complicated wallet setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-white p-1 text-purple-600 mt-0.5">
                          <Check className="h-4 w-4" />
                        </div>
                        <span>Batched transactions - multiple operations in a single transaction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-white p-1 text-purple-600 mt-0.5">
                          <Check className="h-4 w-4" />
                        </div>
                        <span>Smart contract wallets - programmable accounts with advanced security features</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <div className="card-border-gradient border-purple hover-scale">
                    <div className="rounded-[22px] flex flex-col items-center space-y-2 bg-white p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <Server className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="font-bold">Bundler API</h3>
                      <p className="text-xs text-center text-gray-500">Access our bundler API for your dApp</p>
                    </div>
                  </div>
                  <div className="card-border-gradient border-blue hover-scale">
                    <div className="rounded-[22px] flex flex-col items-center space-y-2 bg-white p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Wallet className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold">Paymaster SDK</h3>
                      <p className="text-xs text-center text-gray-500">Integrate gasless transactions easily</p>
                    </div>
                  </div>
                  <div className="card-border-gradient border-orange hover-scale">
                    <div className="rounded-[22px] flex flex-col items-center space-y-2 bg-white p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                        <Shield className="h-5 w-5 text-orange-600" />
                      </div>
                      <h3 className="font-bold">Security Audits</h3>
                      <p className="text-xs text-center text-gray-500">View our security audit reports</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
