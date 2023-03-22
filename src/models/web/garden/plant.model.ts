import type { Agent } from "../agent.model"

export type Plant = {
    agent: Agent
    date: string
    max_temperature: number
    min_temperature: number
    plant: string
    max_rh: number
}
