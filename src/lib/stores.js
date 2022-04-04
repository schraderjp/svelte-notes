import { writable } from 'svelte/store';

export const sidebarShown = writable(false);
export const noteContent = writable('');
export const selectedFile = writable(null);
export const editor = writable(null);
export const activeFolderFiles = writable([]);
