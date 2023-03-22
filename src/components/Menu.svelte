<header class="Header">
	<a href="/">
		<h2><span class="Purple">Purple</span>Sheep</h2>
		<small>one <span class="Purple">task</span> at a <span class="Purple">time...</span></small>
	</a>
	<ul class="Tasks">
		<a href="/garden">
			<li><i class="fa-solid fa-seedling" /></li>
		</a>
		<a href="/#code">
			<li><i class="fa-solid fa-code" /></li>
		</a>
	</ul>
</header>

<style>
	.Header {
		width: 100%;
		height: 50px;
		background-color: var(--color-bg);
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 9;
	}

	h2 {
		color: var(--color-dark);
		font-size: 1.6rem;
	}

	a {
		display: flex;
		align-items: flex-end;
		gap: 2px;
	}

	small {
		font-size: 0.6rem;
		font-weight: bolder;
		margin-bottom: 5px;
	}

	.Purple {
		color: var(--color-main);
		font-family: 'Oswald', sans-serif;
	}

	.Tasks {
		position: absolute;
		right: 30px;
		display: flex;
		gap: 10px;
	}

	.Tasks a:first-child i {
		color: var(--color-green);
	}
</style>
