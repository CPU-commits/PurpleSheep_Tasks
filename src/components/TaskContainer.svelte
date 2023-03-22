<script lang="ts">
	// Exports
	export let img: string
	export let task: string
	export let selected: number

	function changeSelected(index: number) {
		selected = index
	}
</script>

<div class="Task">
	<section class="Task__content">
		<header>
			<figure>
				<img src={img} alt="Tarea" />
				<h1>{task}</h1>
			</figure>
		</header>
		<div class="Task__content--body">
			<section class="Task__body--dashboard">
				<menu class="Task__dashboard--menu">
					<ul>
						<li>
							<button on:click={() => changeSelected(0)}>
								<i class:Selected={selected === 0} class="fa-solid fa-seedling" />
							</button>
						</li>
						<li>
							<button on:click={() => changeSelected(2)}>
								<i class:Selected={selected === 2} class="fa-solid fa-microchip" />
							</button>
						</li>
						<li>
							<button on:click={() => changeSelected(1)}>
								<i class:Selected={selected === 1} class="fa-solid fa-book" />
							</button>
						</li>
					</ul>
				</menu>
				<div>
					<slot />
				</div>
			</section>
		</div>
	</section>
</div>

<style>
	.Task {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.Task__content {
		max-width: 1000px;
		width: 100%;
	}

	.Task__content--body {
		padding: 20px;
		margin-bottom: 200px;
	}

	header img {
		position: relative;
		width: 100%;
		height: 200px;
		filter: grayscale(0.8) blur(1px);
		object-fit: cover;
		z-index: -1;
		border-radius: 5px;
		position: absolute;
	}

	figure {
		position: relative;
		display: flex;
		justify-content: center;
		height: 200px;
		align-items: center;
	}

	header h1 {
		color: white;
		font-size: 2.2rem;
	}

	.Task__body--dashboard {
		display: flex;
		border-bottom: 2px solid;
		width: 100%;
		justify-content: center;
	}

	.Task__dashboard--menu ul {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
		border-right: 2px solid;
	}

	.Task__body--dashboard li {
		padding: 10px;
	}

	.Task__body--dashboard div {
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
	}

	button {
		border: none;
		font-size: 1rem;
	}

	.Selected {
		color: var(--color-main);
	}
</style>
