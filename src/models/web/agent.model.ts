export type Agent = {
    _id: string
    name: string
    agent_type: string
    created: string
    connected: boolean
    last_connection: string | Date
    description?: string
    real_agent: boolean
}

export type AgentStatus = {
    agent: string
    status: boolean
    date?: Date,
}
