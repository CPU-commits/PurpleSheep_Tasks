<script lang="ts">
	import type { Repository } from '$models/code/repository.model'

	export let repository: Repository
</script>

<article class="Repository">
	<a href={repository.repo} rel="external" target="_blank">
		<header>
			<h2><i class="fa-brands fa-github" /> {repository.name}</h2>
		</header>
	</a>
	<p>{repository.description}</p>
	<footer>
		{#each repository.tec as tec}
			<small>
				{#if !tec.is_image}
					<i class={tec.icon} />
				{:else}
					<img src={tec.icon} alt={tec.name} />
				{/if}
				<span>{tec.name}</span>
			</small>
		{/each}
	</footer>
</article>

<style>
	.Repository {
		border: 1px solid var(--color-light);
		border-radius: 3px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	small {
		display: flex;
		align-items: center;
		gap: 3px;
	}

	h2,
	i,
	span,
	p {
		color: var(--color-light);
	}

	h2 {
		font-size: 1.3rem;
	}

	p {
		font-size: 0.9rem;
	}

	img {
		width: 15px;
		height: 15px;
		filter: grayscale(1);
	}

	footer {
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
	}
</style>
