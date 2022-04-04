<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { selectedFile } from '$lib/stores.js';
	import { readFile, writeToFile } from './utils/fileSystemAccess';
	import { editor } from '$lib/stores.js';

	let element;

	onMount(() => {
		$editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				$editor = $editor;
			},
			onUpdate({ editor }) {
				if ($selectedFile) writeToFile($selectedFile, editor.getHTML());
			}
		});
	});

	onDestroy(() => {
		if ($editor) {
			$editor.destroy();
		}
	});
</script>

<div id="editor-wrapper" bind:this={element} />

<style>
	#editor-wrapper {
		@apply h-full w-full;
	}
</style>
