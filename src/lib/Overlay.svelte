<script context="module">
	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte/internal';
	export const overlayShown = writable(false);
</script>

<script>
	const dispatch = createEventDispatcher();
	let windowWidth;

	function sizeChange() {
		if (windowWidth >= 1024) {
			$overlayShown = false;
			dispatch('close');
		}
	}

	$: windowWidth, sizeChange();
</script>

<svelte:window bind:innerWidth={windowWidth} />
{#if $overlayShown}
	<div
		on:click={() => {
			$overlayShown = false;
			dispatch('close');
		}}
		class="bg-black opacity-60 z-30 w-screen h-screen fixed top-0"
	/>
{/if}
