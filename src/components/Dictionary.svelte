<script lang="ts">
	import Table from './Table.svelte'
</script>

<Table headers={['Icono', 'Significado']}>
	<tr>
		<td><i title="Temperatura baja" class="fa-solid fa-temperature-low" /></td>
		<td>Temperatura baja</td>
	</tr>
	<tr>
		<td><i title="Temperatura ideal" class="fa-solid fa-temperature-half" /></td>
		<td>Temperatura ideal</td>
	</tr>
	<tr>
		<td><i title="Temperatura alta" class="fa-solid fa-temperature-high" /></td>
		<td>Temperatura alta</td>
	</tr>
	<tr>
		<td><i class="fa-solid fa-cloud-showers-heavy" /></td>
		<td>Lluvia</td>
	</tr>
	<tr>
		<td><i title="Tierra arida" class="fa-solid fa-sun-plant-wilt" /></td>
		<td>Tierra arida</td>
	</tr>
	<tr>
		<td><i title="Tierra humeda" class="fa-solid fa-seedling wet" /></td>
		<td>Tierra humeda</td>
	</tr>
	<tr>
		<td><i title="Día" class="fa-solid fa-sun sun" /></td>
		<td>D&iacute;a</td>
	</tr>
	<tr>
		<td><i title="Noche" class="fa-solid fa-moon night" /></td>
		<td>Noche</td>
	</tr>
	<tr>
		<td><i class="fa-solid fa-droplet" /></td>
		<td>Regando planta</td>
	</tr>
	<tr>
		<td><i class="fa-solid fa-tower-broadcast" /></td>
		<td>Agente connectado</td>
	</tr>
	<tr>
		<td><i class="fa-solid fa-robot" /></td>
		<td>
			No es un dispositivo real, es decir, sus m&eacute;tricas son simuladas por un agente
			externo.
		</td>
	</tr>
</Table>
