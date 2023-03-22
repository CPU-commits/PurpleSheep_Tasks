<script lang="ts">
	// Modules
	import { onMount } from 'svelte'
	import { io } from 'socket.io-client'
	import { variables } from '$lib/variables'
	import API from '$utils/APIModule'
	import { addToast } from '$stores/toasts'
	import Chart from 'chart.js/auto'
	// Components
	import Dictionary from '$components/Dictionary.svelte'
	import Agent from '$components/Agent.svelte'
	// Types
	import type { Plant } from '$models/web/garden/plant.model'
	import type { GardenPlantMetric, GardenMetric } from '$models/web/garden/metric.model'
	import type { Agent as AgentType, AgentStatus } from '$models/web/agent.model'
	import { formatDate, formatDateTime } from '$utils/format'
	import type { GardenGraphic } from '$models/web/garden/graphic.model'
	import TaskContainer from '$components/TaskContainer.svelte'
	// Data
	let metrics: Array<GardenPlantMetric> = []
	let plants: Array<Plant>
	let agents: Array<AgentType>
	let startMetrics: Array<GardenGraphic>
	// Graphics
	type Graphics = {
		agent: string
		canvas: Array<HTMLCanvasElement>
		chart: {
			chartDirt?: Chart
			chartTemperature?: Chart
		}
	}
	let graphics: Array<Graphics>
	let selected = 0

	function webSocket() {
		const socket = io(`${variables.API}`).connect()
		socket.on('garden/metrics', (metric: GardenMetric) => {
			// Insert graph
			insertDataGraph(metric, metric.agent)
			// Update metric
			const plantPostion = plants.findIndex((plant) => {
				return plant.agent.name === metric.agent
			})
			const agentPosition = metrics.findIndex((obj) => {
				return obj.agent === metric.agent
			})
			const { agent: _, ...rest } = plants[plantPostion]
			if (agentPosition !== -1) {
				metrics[agentPosition] = {
					...metric,
					...rest,
				}
			} else {
				metrics.push({
					...metric,
					...rest,
				})
			}
		})
		socket.on('agents/status', (agentStatus: AgentStatus) => {
			const agentPosition = agents.findIndex((agent) => {
				return agent.name === agentStatus.agent
			})
			agents[agentPosition].connected = agentStatus.status
			if (agentStatus.date) agents[agentPosition].last_connection = agentStatus.date
		})
	}

	function initGraphics() {
		graphics = []
		for (let i = 0; i < startMetrics.length; i++) {
			const metric = startMetrics[i]
			graphics[i] = {
				agent: metric.agent,
				canvas: [],
				chart: {},
			}
		}
	}

	function insertDataGraph(metric: GardenMetric, agent: string) {
		const agentPosition = graphics.findIndex((g) => {
			return g.agent === agent
		})
		const date = formatDateTime(metric.date)
		// Charts
		const { chartDirt, chartTemperature } = graphics[agentPosition].chart
		// Update all labels
		chartDirt?.data.labels?.push(date)
		// Update temperature
		chartTemperature?.data.datasets[0].data.push(metric.temperature)
		chartTemperature?.update()
		// Update RH
		chartDirt?.data.datasets[0].data.push(metric.rh)
		chartDirt?.update()
	}

	function buildGraph(data: any, canvas: HTMLCanvasElement) {
		return new Chart(canvas, {
			type: 'line',
			data,
			options: {
				plugins: {
					legend: {
						display: false,
					},
				},
			},
		})
	}

	function buildDataGraphic(metrics: Array<GardenMetric>) {
		const labels = metrics.map((metric) => {
			return formatDateTime(metric.date)
		})
		const dataT = {
			labels,
			datasets: [
				{
					data: metrics.map((metric) => {
						return metric.temperature
					}),
					fill: true,
					borderColor: 'rgb(36, 62, 180)',
					tension: 0,
					backgroundColor: 'rgb(36, 62, 180, 0.4)',
					label: 'Temperatura ',
					drawActiveElementsOnTop: false,
				},
			],
		}
		const dataH = {
			labels,
			datasets: [
				{
					data: metrics.map((metric) => {
						return metric.rh
					}),
					fill: true,
					borderColor: 'rgb(36, 62, 180)',
					tension: 0,
					backgroundColor: 'rgb(36, 62, 180, 0.4)',
					label: 'Temperatura ',
					drawActiveElementsOnTop: false,
				},
			],
		}
		return {
			dataTemperature: dataT,
			dataHumidity: dataH,
		}
	}

	function buildGraphs() {
		for (let i = 0; i < startMetrics.length; i++) {
			const metrics = startMetrics[i].metrics
			const data = buildDataGraphic(metrics)
			graphics[i].chart.chartTemperature = buildGraph(
				data.dataTemperature,
				graphics[i].canvas[0],
			)
			graphics[i].chart.chartDirt = buildGraph(data.dataHumidity, graphics[i].canvas[1])
		}
	}

	onMount(async () => {
		try {
			// Get data
			const dataFetch = await Promise.allSettled([
				API.fetchGetData(`${variables.API}/api/garden/get_plants`),
				API.fetchGetData(`${variables.API}/api/agents/get_agents/garden`),
				API.fetchGetData(`${variables.API}/api/garden/get_metrics?limit=20&latest=true`),
			]).then((data) => {
				return {
					plants: data[0],
					agents: data[1],
					metrics: data[2],
				}
			})
			if (dataFetch.plants.status === 'fulfilled') {
				plants = dataFetch.plants.value.body
			} else {
				throw new Error('No se obtuvieron las plantas. Recargue la página')
			}
			if (dataFetch.agents.status === 'fulfilled') agents = dataFetch.agents.value.body
			if (dataFetch.metrics.status === 'fulfilled') {
				startMetrics = dataFetch.metrics.value.body
				initGraphics()
			}
			// Socket io
			webSocket()
			// Graph
			setTimeout(() => {
				buildGraphs()
			}, 0)
		} catch (err: any) {
			addToast({
				message: err.message,
				type: 'error',
			})
		}
	})
</script>

<svelte:head>
	<title>Garden Task - PurpleSheep</title>
</svelte:head>

<TaskContainer img={'/images/garden.jpg'} task={'Garden Task'} bind:selected>
	<section id="menu" class:Hidden={selected !== 0} class="Panel">
		<section class="Metrics">
			{#each metrics as metric}
				<Agent {metric} />
			{:else}
				<span><i class="fa-solid fa-spinner" /> Recopilando agentes...</span>
			{/each}
		</section>
	</section>
	<section id="graphics" class:Hidden={selected !== 0}>
		<h2>Gr&aacute;ficos</h2>
		{#if graphics}
			{#each graphics as graphic, i}
				<h3>{graphic.agent}</h3>
				<h4>Temperatura C°</h4>
				<canvas id="fdfs" bind:this={graphics[i].canvas[0]} />
				<h4>Humedad de la tierra RH</h4>
				<canvas id="" bind:this={graphics[i].canvas[1]} />
			{/each}
		{/if}
	</section>
	<h2 class:Hidden={selected !== 1}><i class="fa-solid fa-map" /> Esquema y Dic.</h2>
	<section id="dictionary" class="Dictionary" class:Hidden={selected !== 1}>
		<img src="/images/garden-schema.png" alt="Garden Schema" />
		<div class="Dictionary__table">
			<Dictionary />
		</div>
	</section>
	<h2 class:Hidden={selected !== 2}>Agentes</h2>
	<section id="devices" class="Agents" class:Hidden={selected !== 2}>
		{#if agents}
			{#each agents as agent}
				<article class="Agent">
					<header>
						<h4>{agent.name}</h4>
						{#if agent.connected}
							<i title="Conectado" class="fa-solid fa-tower-broadcast" />
						{/if}
					</header>
					{#if agent.description}
						<p>{agent.description}</p>
					{/if}
					{#if !agent.real_agent}
						<span>
							<i class="fa-solid fa-robot" /> Este dispositivo no es real.
						</span>
					{/if}
					<footer>
						<small
							>&Uacute;ltima conexi&oacute;n: {formatDateTime(
								agent.last_connection,
							)}</small
						>
						<small>Fecha creaci&oacute;n: {formatDate(agent.created)}</small>
					</footer>
				</article>
			{/each}
		{/if}
	</section>
</TaskContainer>

<style>
	.Panel {
		margin-top: 15px;
	}

	h2,
	i {
		color: var(--color-main);
	}

	canvas {
		max-height: 400px;
	}

	.Metrics {
		width: 100%;
		display: flex;
		gap: 15px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.Dictionary {
		display: flex;
		width: 100%;
		justify-content: center;
		flex-direction: column;
		justify-content: center;
	}

	.Dictionary img {
		width: 100%;
		object-fit: contain;
	}

	.Dictionary__table {
		width: 100%;
		max-width: 800px;
	}

	.Agents {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-wrap: wrap;
	}

	.Agent {
		padding: 10px;
		display: flex;
		flex-direction: column;
	}

	.Agent span {
		width: 100%;
		text-align: center;
	}

	.Agent header {
		display: flex;
		gap: 10px;
		align-items: center;
		justify-content: center;
		margin-bottom: 5px;
		border-bottom: 2px solid var(--color-dark);
	}

	.Agent header i {
		color: var(--color-main);
	}

	.Agent footer {
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.Hidden {
		display: none;
	}

	@media (max-width: 767.98px) {
		h2 {
			font-size: 1.3rem;
		}

		h3 {
			font-size: 0.9rem;
		}

		h4 {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 575.98px) {
		span {
			font-size: 0.9rem;
		}

		small {
			font-size: 0.8rem;
		}
	}
</style>
