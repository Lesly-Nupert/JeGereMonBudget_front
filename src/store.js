import { writable } from "svelte/store";

export const email = writable("");
export const password = writable("");
export const errorEmail = writable("");
export const errorPassword = writable("");
export const success = writable("");
export const errorServer = writable("");
export const errorInvalidEmailOrPassword = writable("");