<script>
	import CloseButton from '$lib/CloseButton.svelte';
	import MenuButton from '$lib/MenuButton.svelte';
	import { noteContent, sidebarShown, selectedFile, editor } from '$lib/stores';

	// @ts-nocheck
	import TextEditor from '$lib/TextEditor.svelte';
	import { readFile, setFileHandle, writeToFile } from '$lib/utils/fileSystemAccess';
	import { get, set } from 'idb-keyval';
</script>

<div class="fixed top-16 right-0 left-0 flex h-full items-start lg:left-72">
	<TextEditor />
</div>
