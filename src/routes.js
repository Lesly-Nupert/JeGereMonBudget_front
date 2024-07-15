// * DEFINE THE ROUTES OF THE APPLICATION
import HomePage from "./pages/HomePage.svelte";
import Signup from "./pages/Signup.svelte";
import Login from "./pages/Login.svelte";
import AddAccount from "./pages/AddAccount.svelte";
import AccountWithTransactions from "./pages/AccountWithTransactions.svelte";
import ListAccountNameByUser from "./pages/ListAccountNameByUser.svelte";
import AddExpense from "./pages/AddExpense.svelte";
import AddIncome from "./pages/AddIncome.svelte";
import Expense from "./pages/Expense.svelte";
import Income from "./pages/Income.svelte";
import UpdatedExpense from "./pages/UpdatedExpense.svelte";
import UpdatedIncome from "./pages/UpdatedIncome.svelte";
import AccountOne from "./pages/AccountOne.svelte";
import UpdatedAccount from "./pages/UpdatedAccount.svelte";
import UserProfile from "./pages/UserProfile.svelte";
import UpdatedProfile from "./pages/UpdatedProfile.svelte";
import UpdatedPassword from "./pages/UpdatedPassword.svelte";
import ForgotPassword from "./pages/ForgotPassword.svelte";
import ResetPassword from "./pages/ResetPassword.svelte";
import ContactUs from "./pages/ContactUs.svelte";
import LegalNotice from "./pages/LegalNotice.svelte";
import NotFound from "./pages/NotFound.svelte";

export default {
    "/": HomePage,
    "/signup": Signup,
    "/login": Login,
    "/addAccount": AddAccount,
    "/accountWithTransactions/:accountId": AccountWithTransactions,
    "/listAccountNameByUser/:userId": ListAccountNameByUser,
    "/addExpense/:accountId": AddExpense,
    "/addIncome/:accountId": AddIncome,
    "/account/:accountId/expense/:id": Expense,
    "/account/:accountId/income/:id": Income,
    "/user/:userId/account/:id": AccountOne,
    "/account/:accountId/updateExpense/:id": UpdatedExpense,
    "/account/:accountId/updateIncome/:id": UpdatedIncome,
    "/user/:userId/account/updateAccount/:id": UpdatedAccount,
    "/userProfile/:userId": UserProfile,
    "/user/:userId/updateProfile": UpdatedProfile,
    "/user/:userId/updatePassword": UpdatedPassword,
    "/forgotPassword": ForgotPassword,
    "/resetPassword/:token": ResetPassword,
    "/contactUs": ContactUs,
    "/legalNotice": LegalNotice,
    "*": NotFound,
};
