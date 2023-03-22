import type { Agent } from "./agent.model"

export type Task = {
    _id: string
    task: string
    name: string
    description: string
    date: string
    agents: Agent[]
}
