<script lang="ts">
	import Toast from './Toast.svelte'

	import { dismissToast, toasts } from '$stores/toasts'
</script>

{#if $toasts}
	<section>
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
			>
		{/each}
	</section>
{/if}

<style>
	section {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		display: flex;
		margin-bottom: 1rem;
		justify-content: center;
		flex-direction: column;
		z-index: 1001;
	}
</style>
