import { writable } from "svelte/store";






// * SIGNUP
export const usernameSignup = writable("");
export const emailSignup = writable("");
export const passwordSignup = writable("");
export const errorUsernameSignup = writable("");
export const errorEmailSignup = writable("");
export const errorPasswordSignup = writable("");
export const errorServerSignup = writable("");
export const successSignup = writable("");

// * LOGIN
export const emailLogin= writable("");
export const passwordLogin = writable("");
export const errorInvalidEmailOrPassword = writable("");
export const errorServerLogin = writable("");
export const successLogin = writable("");

// * ADD ACCOUNT
export const accountName = writable("");
export const successAddAccount = writable("");
export const errorServerAddAccount = writable("");

// * ADD TRANSACTION
export const transaction_name = writable("");
export const amount = writable("");


