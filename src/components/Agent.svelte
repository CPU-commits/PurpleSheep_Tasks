<script lang="ts">
	import type { GardenPlantMetric } from '$models/web/garden/metric.model'
	import Table from './Table.svelte'

	export let metric: GardenPlantMetric
</script>

<article class="GardenAgent">
	<header>
		<h4><i class="fa-solid fa-binoculars" /> {metric.agent}</h4>
		<div>
			<Table headers={['Planta', 'Máx. T° (C°)', 'Mín. T° (C°)', 'Máx. HR']}>
				<tr>
					<td>{metric.plant}</td>
					<td>{metric.max_temperature}</td>
					<td>{metric.min_temperature}</td>
					<td>{metric.max_rh}</td>
				</tr>
			</Table>
			<span>T[C°]: {metric.temperature}°</span>
			<span>HR[%]: {metric.rh}%</span>
			<br />
		</div>
	</header>
	<section class="GardenAgent__metrics">
		<span
			class:low={metric.temperature < metric.min_temperature}
			class:normal={metric.temperature >= metric.min_temperature &&
				metric.temperature < metric.max_temperature}
			class:high={metric.temperature >= metric.max_temperature}
		>
			{#if metric.temperature < metric.min_temperature}
				<i title="Temperatura baja" class="fa-solid fa-temperature-low low" />
				[Baja]
			{/if}
			{#if metric.temperature >= metric.min_temperature && metric.temperature < metric.max_temperature}
				<i title="Temperatura ideal" class="fa-solid fa-temperature-half normal" />
				[Normal]
			{/if}
			{#if metric.temperature >= metric.max_temperature}
				<i title="Temperatura alta" class="fa-solid fa-temperature-high high" />
				[Alta]
			{/if}
		</span>
		<i
			title={metric.rain ? 'Lloviendo' : 'Sin lluvia'}
			class:rain={metric.rain}
			class="fa-solid fa-cloud-showers-heavy"
		/>
		{#if metric.rh <= metric.max_rh}
			<i title="Tierra arida" class="fa-solid fa-sun-plant-wilt dry" />
		{:else}
			<i title="Tierra humeda" class="fa-solid fa-seedling wet" />
		{/if}
		{#if metric.day}
			<i title="Día" class="fa-solid fa-sun sun" />
		{:else}
			<i title="Noche" class="fa-solid fa-moon night" />
		{/if}
		<i
			title={!metric.rain &&
			metric.rh <= metric.max_rh &&
			metric.temperature >= metric.min_temperature &&
			metric.temperature < metric.max_temperature &&
			!metric.day
				? 'Regando'
				: 'No regando'}
			class:rain={!metric.rain &&
				metric.rh <= metric.max_rh &&
				metric.temperature >= metric.min_temperature &&
				metric.temperature < metric.max_temperature &&
				!metric.day}
			class="fa-solid fa-droplet"
		/>
	</section>
</article>

<style>
	.GardenAgent {
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
		border: 2px solid;
		border-radius: 5px;
	}

	.GardenAgent header {
		display: flex;
		flex-direction: column;
		gap: 5px;
		align-items: center;
		font-size: 1.1rem;
		padding-right: 5px;
	}

	.GardenAgent header span {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.GardenAgent__metrics {
		display: flex;
		align-items: center;
		gap: 20px;
		background-color: var(--color-bg-dark);
		padding: 8px;
		border-radius: 3px;
		display: flex;
		justify-content: center;
	}

	i {
		font-size: 1.1rem;
		color: var(--color-gray);
	}

	div span {
		font-size: 0.9rem;
	}

	.low {
		color: var(--color-light);
	}

	.normal {
		color: var(--color-light);
	}

	.high {
		color: var(--color-light);
	}

	.rain {
		color: var(--color-light);
	}

	.dry {
		color: var(--color-light);
	}

	.wet {
		color: var(--color-light);
	}

	.sun {
		color: var(--color-light);
	}

	.night {
		color: var(--color-light);
	}

	@media (max-width: 575.98px) {
		.GardenAgent {
			display: flex;
			flex-direction: column;
		}

		.GardenAgent header {
			border-right: 0;
		}

		span,
		td {
			font-size: 0.85rem;
		}
	}
</style>
