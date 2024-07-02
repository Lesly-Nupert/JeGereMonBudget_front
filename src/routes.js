// * DEFINE THE ROUTES OF THE APPLICATION

import HomePageWithLogin from "./pages/HomePageWithLogin.svelte";
import Signup from "./pages/Signup.svelte";
import AddAccount from "./pages/AddAccount.svelte";
import AccountWithTransactions from "./pages/AccountWithTransactions.svelte";
import ListAccountNameByUser from "./pages/ListAccountNameByUser.svelte";
import AddExpense from "./pages/AddExpense.svelte";
import AddIncome from "./pages/AddIncome.svelte";
// import Expense from "./pages/Expense.svelte";
// import Income from "./pages/Income.svelte";
// import UpdatedExpense from "./pages/UpdatedExpense.svelte";
// import UpdatedIncome from "./pages/UpdatedIncome.svelte";
// import UserAccount from "./pages/UserAccount.svelte";
// import UpdatedAccount from "./pages/UpdtedAccount.svelte";
// import UpdatedPassword from "./pages/UpdatedPassword.svelte";
// import ContactUs from "./pages/ContactUs.svelte";
// import LegalNotice from "./pages/LegalNotice.svelte";
// import NotFound from "./pages/NotFound.svelte";

export default {
    "/": HomePageWithLogin,
    "/signup": Signup,
    "/addAccount": AddAccount,
    "/accountWithTransactions/:id": AccountWithTransactions,
    "/listAccountNameByUser/:userId": ListAccountNameByUser,
    "/addExpense": AddExpense,
    "/addIncome": AddIncome,
//     "/expense/:id": Expense,
//     "/income/:id": Income,
//     "/updatedExpense/:id": UpdatedExpense,
//     "/updatedIncome/:id": UpdatedIncome,
//     "/userAccount/:userId": UserAccount,
//     "/updatedAccount/:userId": UpdatedAccount,
//     "/updatedPassword/:userId": UpdatedPassword,
//     "/contactUs ": ContactUs,
//     "/legalNotice": LegalNotice,
//     "*": NotFound,
};
