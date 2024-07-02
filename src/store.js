import { writable } from "svelte/store";

export const username = writable("");
export const email = writable("");
export const password = writable("");
export const errorEmail = writable("");
export const errorPassword = writable("");
export const success = writable("");
export const errorServer = writable("");
export const errorInvalidEmailOrPassword = writable("");
export const errorUsername = writable("");
export const account_name = writable("");
export const transaction_name = writable("");
export const amount = writable("");