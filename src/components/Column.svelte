<div class="Column">
	<h2><slot /></h2>
</div>

<style>
	.Column {
		background-color: var(--color-bg-dark);
		height: fit-content;
	}

	h2 {
		color: var(--color-light);
		text-align: center;
		padding: 3px;
		font-size: 1.4rem;
		writing-mode: vertical-rl;
		text-orientation: upright;
	}
</style>
