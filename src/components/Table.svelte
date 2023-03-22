<script lang="ts">
	export let headers: Array<string>
</script>

<table class="Table">
	<thead>
		<tr>
			{#each headers as header}
				<td>{@html header}</td>
			{/each}
		</tr>
	</thead>
	<tbody class="Tbody">
		<slot />
	</tbody>
</table>

<style>
	.Table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 20px;
	}

	.Table td {
		padding: 10px;
		text-align: center;
	}

	.Table thead tr {
		border-bottom: 1px solid var(--color-dark);
		font-size: 1rem;
	}

	@media (max-width: 575.98px) {
		td {
			font-size: 0.9rem;
		}
	}
</style>
