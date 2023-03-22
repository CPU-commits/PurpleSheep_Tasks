import type { GardenMetric } from "./metric.model"

export type GardenGraphic = {
    agent: string
    metrics: Array<GardenMetric>
}
