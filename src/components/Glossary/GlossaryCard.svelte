<script lang="ts">
	export let word: {
		word: string
		icon: string
		description: string
	}
</script>

<article class="Card">
	<header>
		<h3><i class={word.icon} /> {word.word}</h3>
	</header>
	<p>{word.description}</p>
</article>

<style>
	.Card {
		border: 1px solid var(--color-bg-dark);
		width: 250px;
		border-radius: 6px;
		padding: 15px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	h3 {
		font-size: 1.3rem;
	}

	p {
		font-size: 0.85rem;
	}

	@media (max-width: 767.98px) {
		.Card {
			width: 230px;
		}

		h3 {
			font-size: 1.1rem;
		}
	}

	@media (max-width: 575.98px) {
		.Card {
			width: 270px;
		}
	}
</style>
