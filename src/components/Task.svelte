<script lang="ts">
	import type { Task } from '$models/web/task.model'
	import { formatDate } from '$utils/format'

	export let task: Task
</script>

<article class="Task">
	{#if task.name !== 'client'}
		<a href="/{task.name}" data-sveltekit-preload-data>
			<h3>{task.task} [#{task.name}]</h3>
			<p>{task.description}</p>
		</a>
	{:else}
		<div>
			<h3>{task.task} [#{task.name}]</h3>
			<p>{task.description}</p>
		</div>
	{/if}
	{#if task.agents.length > 0}
		<section class="Agents">
			<h4>Agentes</h4>
			{#each task.agents as agent}
				<article class="Agent">
					<span>{agent.name}</span>
					<span>Tipo: {agent.agent_type}</span>
					<small>{formatDate(agent.created)}</small>
				</article>
			{/each}
		</section>
	{/if}
	<small class="Task__date">{formatDate(task.date)}</small>
</article>

<style>
	.Task {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 800px;
		min-width: 300px;
		text-align: center;
		padding: 15px;
		border-bottom: 1px solid var(--color-light);
	}

	.Agents {
		margin-top: 10px;
	}

	.Agent {
		padding: 3px;
		border-bottom: 1px solid var(--color-dark);
		font-size: 0.85rem;
	}

	a:hover h3 {
		color: var(--color-main);
	}

	h3 {
		margin-bottom: 10px;
		transition: all 0.4s ease;
	}

	p {
		font-size: 0.9rem;
		max-width: 500px;
	}

	.Task__date {
		margin-top: 20px;
	}

	.Agent {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 767.98px) {
		.Task {
			padding: 0;
		}
	}
</style>
