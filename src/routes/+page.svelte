<script lang="ts">
	import Code from '$components/Code.svelte'
	import Column from '$components/Column.svelte'
	import GlossaryCard from '$components/Glossary/GlossaryCard.svelte'
	import Separator from '$components/Separator.svelte'
	import TaskComponent from '$components/Task.svelte'
	import { PUBLIC_API } from '$env/static/public'
	import type { Task } from '$models/web/task.model'
	import { addToast } from '$stores/toasts'
	import API from '$utils/APIModule'
	import { onMount } from 'svelte'
	// Data
	let tasks: Array<Task> = []
	const glossaryCards = [
		{
			word: 'Tractor',
			icon: 'fa-solid fa-truck-ramp-box',
			description: 'Idea abstracta sobre el sistema general de las tareas',
		},
		{
			word: 'Tarea',
			icon: 'fa-solid fa-bars-progress',
			description: 'Proceso a automatizar',
		},
		{
			icon: 'fa-solid fa-mask',
			word: 'Agente',
			description:
				'Dispositivo, servicio, servidor, etc. Todo ente capaz de manejar el estado de una tarea',
		},
		{
			icon: 'fa-solid fa-microchip',
			word: 'Dispositivo [Agente]',
			description: 'Encargados de la entrega y emisión de datos',
		},
		{
			icon: 'fa-solid fa-server',
			word: 'Cliente [Agente]	',
			description: 'Encargados del estado de los servicios',
		},
		{
			icon: 'fa-solid fa-bell-concierge',
			word: 'Servicio',
			description: 'Manojo de funciones que ofrece un ente',
		},
	]

	onMount(async () => {
		try {
			const dataFetch = await API.fetchGetData(`${PUBLIC_API}/api/tasks/get_tasks`)
			tasks = dataFetch.body
		} catch (err: any) {
			addToast({
				message: err.message,
				type: 'error',
			})
		}
	})
</script>

<svelte:head>
	<title>Tasks - PurpleSheep</title>
</svelte:head>

<main>
	<div class="Container">
		<section class="Main">
			<figure>
				<img src="/images/douglas.jpg" alt="Douglas Engelbart" />
				<figcaption>Douglas Engelbar - Creador del primer mouse</figcaption>
			</figure>
			<q
				>La tecnolog&iacute;a no debe apuntar a reemplazar a los humanos, sino a aumentar
				sus capacidades</q
			>
			<img src="/images/mouse.png" alt="Mouse Douglas Engelbart" />
		</section>
	</div>

	<section class="Flag">
		<h3>Internet of Things</h3>
		<p>
			Esta p&aacute;gina est&aacute; hecha para compartir mi desarrollo personal en
			tecnolog&iacute;a IoT
		</p>
		<Separator />
	</section>

	<div class="Container">
		<Column>Tasks</Column>
		<section class="Tasks">
			<div class="Tasks__cards">
				{#each tasks as task}
					<TaskComponent {task} />
				{/each}
			</div>
		</section>
	</div>

	<section class="Glossary">
		<h3>Glosario</h3>
		<section class="Glossary__cards">
			{#each glossaryCards as glossaryCard}
				<GlossaryCard word={glossaryCard} />
			{/each}
		</section>
	</section>

	<section class="Code" id="code">
		<h3><i class="fa-solid fa-code" /> C&oacute;digo</h3>
		<p>
			El c&oacute;digo usado para construir Tasks - PurpleSheep consta de cuatro componentes,
			cada uno con su respectivo repositorio:
		</p>
		<Code />
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.Container {
		display: flex;
		justify-content: center;
		padding: 10px;
		width: 100%;
		align-items: center;
		box-sizing: border-box;
		max-width: 1500px;
	}

	.Main {
		padding: 30px;
		display: grid;
		grid-template-columns: 270px 60px 140px 140px;
		grid-template-rows: 200px 200px;
		grid-template-areas:
			'img space text purple'
			'img space purplef mouse';
	}

	.Main figure {
		grid-area: img;
	}

	.Main figcaption {
		text-align: center;
		font-size: 0.8rem;
	}

	.Main img:first-child {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 5px;
	}

	.Main q {
		grid-area: text;
		text-align: center;
		margin: auto;
		color: var(--color-golden);
		font-style: italic;
	}

	.Main img:last-child {
		grid-area: mouse;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 20%;
		border-radius: 3px;
		filter: grayscale(1);
	}

	i {
		color: var(--color-main);
	}

	.Flag {
		width: 100%;
		display: flex;
		background-color: var(--color-bg-dark);
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 10px;
		box-sizing: border-box;
		margin-bottom: 20px;
	}

	.Flag p,
	.Flag h3 {
		color: white;
	}

	.Glossary {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		max-width: 1500px;
		justify-content: center;
		box-sizing: border-box;
	}

	.Glossary h3 {
		font-size: 1.8rem;
		color: var(--color-golden);
		margin-bottom: 15px;
	}

	.Glossary__cards {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: center;
	}

	.Tasks {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}

	.Tasks__cards {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.Code {
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media (max-width: 767.98px) {
		.Main {
			grid-template-columns: 230px 40px 120px 120px;
		}

		p {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 575.98px) {
		.Main {
			grid-template-columns: 0px 0px 145px 145px;
		}

		p {
			font-size: 0.85rem;
			text-align: center;
		}
	}
</style>
