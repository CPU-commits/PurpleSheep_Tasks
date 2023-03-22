export type GardenMetric = {
    agent: string
    temperature: number
    rain: boolean
    rh: number
    day: boolean
    date: string
    real_agent: boolean
}

export type GardenPlantMetric = GardenMetric & {
    max_temperature: number
    min_temperature: number
    plant: string
    max_rh: number
}
