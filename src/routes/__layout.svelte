<script>
	import CloseButton from '$lib/CloseButton.svelte';
	import MenuButton from '$lib/MenuButton.svelte';
	import Overlay, { overlayShown } from '$lib/Overlay.svelte';

	import { activeFolderFiles, editor, selectedFile, sidebarShown } from '$lib/stores';
	import {
		readFile,
		saveNewFile,
		setFileHandle,
		writeToFile,
		getNotesFolder,
		getFolderFiles
	} from '$lib/utils/fileSystemAccess';
	import { get } from 'idb-keyval';
	import { onMount } from 'svelte';

	import '../global.css';
</script>

<!-- outer wrapper -->
<Overlay on:close={() => ($sidebarShown = false)} />
<div class={`flex h-screen w-screen`}>
	<!-- sidebar toggle button -->

	<div
		class="fixed top-0 left-0 right-0 flex h-10 items-center justify-between bg-slate-600 lg:left-72"
	>
		<MenuButton />
		<div>
			<button
				class="h-full bg-slate-600 px-4 text-slate-100 transition-all hover:brightness-125"
				on:click={async () => {
					$selectedFile = await saveNewFile();
					writeToFile($selectedFile, $editor.getHTML());
				}}>Save to File</button
			>
			<button
				class="h-full bg-slate-600 px-4 text-slate-100 transition-all hover:brightness-125"
				on:click={async () => {
					$selectedFile = await setFileHandle();
					let content = await readFile($selectedFile);
					$editor.commands.setContent(content);
					writeToFile($selectedFile, $editor.getHTML());
				}}>Open File</button
			>
			<button
				on:click={async () => {
					const { array } = await getNotesFolder();
					$activeFolderFiles = array;
				}}
				class="h-full bg-slate-600 px-4 text-slate-100 transition-all hover:brightness-125"
			>
				Open Folder
			</button>
		</div>
	</div>
	<div class="fixed top-10 left-0 right-0 h-6 bg-slate-300 lg:left-72">
		{#if $selectedFile}
			<h3 class="ml-2 text-center font-bold text-slate-800">
				Current File: <span class="font-normal">{$selectedFile.name}</span>
			</h3>
		{:else}
			<h3 class="ml-2 text-slate-800 text-center">Save your note or open a folder.</h3>
		{/if}
	</div>

	<!-- sidebar -->
	<div
		id="sidebar"
		class={`fixed z-50 h-screen w-5/6 bg-slate-800 transition-transform lg:relative ${
			$sidebarShown ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
		} lg:w-72`}
	>
		<div class="flex w-full items-center justify-between px-4 py-4">
			<h2 class="text-2xl text-slate-100">Folder</h2>
			<CloseButton />
		</div>
		<div>
			{#each $activeFolderFiles as file, i}
				<button
					on:click={async () => {
						$selectedFile = file.value;
						let content = await readFile($selectedFile);
						$editor.commands.setContent(content);
						writeToFile($selectedFile, $editor.getHTML());
					}}
					class="block w-full bg-slate-800 py-1 px-4 text-left text-xl text-slate-100 hover:text-slate-400 hover:brightness-125"
					>{file.value.name}</button
				>
			{/each}
		</div>
	</div>

	<slot />
</div>
