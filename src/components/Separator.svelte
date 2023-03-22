<section class="triangle" />

<style>
	.triangle {
		position: relative;
		background: var(--color-bg-dark);
	}

	.triangle::before {
		content: '';
		position: absolute;
		bottom: 0;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 35px 35px 0 35px;
		border-color: var(--color-bg-dark) transparent transparent transparent;
		left: 50%;
		transform: translateX(-50%) translateY(100%);
	}
</style>
