<script lang="ts">
	import Repository from './Repository.svelte'
	import type { Repository as RepositoryType } from '$models/code/repository.model'

	const repositories: Array<RepositoryType> = [
		{
			tec: [
				{ name: 'Golang', icon: 'fa-brands fa-golang' },
				{ name: 'Broker MQTT', icon: 'fa-solid fa-server' },
				{
					name: 'Docker',
					icon: 'devicon-docker-plain',
				},
			],
			repo: 'https://github.com/CPU-commits/Broker-MQTT',
			name: 'Broker MQTT',
			description: 'Broker MQTT escrito en Golang usando de base el broker Mochi-MQTT',
		},
		{
			tec: [
				{ name: 'NodeJS', icon: 'fa-brands fa-node-js' },
				{ name: 'NestJS', icon: 'devicon-nestjs-plain' },
				{
					name: 'Typescript',
					icon: 'devicon-typescript-plain',
				},
				{
					name: 'MongoDB',
					icon: 'devicon-mongodb-plain',
				},
				{
					name: 'Docker',
					icon: 'devicon-docker-plain',
				},
			],
			repo: 'https://github.com/CPU-commits/NestJS-MQTT-Client',
			name: 'NestJS-MQTT-Client',
			description:
				'Cliente MQTT para administrar, almacenar, formatear, etc. Las métricas de agentes de cualquier tarea. Servidor Websocket para envíar las métricas para ser consumidas por Web.',
		},
		{
			tec: [
				{ name: 'Deno', icon: 'devicon-denojs-original' },
				{
					name: 'Typescript',
					icon: 'devicon-typescript-plain',
				},
				{
					name: 'Docker',
					icon: 'devicon-docker-plain',
				},
			],
			repo: 'https://github.com/CPU-commits/AgentMQTT-Garden',
			name: 'AgentMQTT-Garden',
			description:
				'Fake Agent para generar métricas falsas de una planta en base a coordenadas geográficas',
		},
		{
			tec: [
				{ name: 'NodeJS', icon: 'fa-brands fa-node-js' },
				{
					name: 'Typescript',
					icon: 'devicon-typescript-plain',
				},
				{ name: 'Sveltekit', icon: 'devicon-svelte-plain' },
			],
			repo: 'https://github.com/CPU-commits/PurpleSheep_Tasks',
			name: 'PurpleSheep_Tasks',
			description:
				'Cliente para visualizar métricas, agentes y tareas o procesos a través de la Web',
		},
	]
</script>

<section class="Repositories">
	{#each repositories as repository}
		<Repository {repository} />
	{/each}
</section>

<style>
	.Repositories {
		margin-top: 15px;
		width: 100%;
		padding: 15px;
		border-radius: 5px;
		background-color: var(--color-bg-dark);
	}
</style>
