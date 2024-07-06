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

// * ADD INCOME
export const incomeName = writable("");
export const incomeAmount = writable("");
export const successAddIncome = writable("");
export const errorServerAddIncome = writable("");

// * ADD EXPENSE
export const expenseName = writable("");
export const expenseAmount = writable("");
export const successAddExpense = writable("");
export const errorServerAddExpense = writable("");

// * UPDATE EXPENSE
export const successUpdatedExpense = writable("");
export const errorServerUpdatedExpense = writable("");

// * UPDATE INCOME
export const successUpdatedIncome = writable("");
export const errorServerUpdatedIncome = writable("");

// * DELETE INCOME
export const successDeletedIncome = writable("");
export const errorServerDeletedIncome = writable("");

// * DELETE EXPENSE
export const successDeletedExpense = writable("");
export const errorServerDeletedExpense = writable("");

// * DISCONNECT
export const successDisconnect = writable("");