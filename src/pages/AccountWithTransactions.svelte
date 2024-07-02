<script>
    // Routeur optimisé pour Single Page Application (SPA)
    // import { link } from "svelte-spa-router";

    // Obtention du token et ID user dans le localStorage
    // let token = localStorage.getItem("TOKEN");
    // let userId = localStorage.getItem("USER_ID");

    // Route dynamique
    // export let params = {};
    // console.log(`id recette: ${params.id}`);


//     async function getAccountWithTransactions() {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/user/:userId/account/:accountId/${params.id}`
//       );
//       if (response.ok) {
//         const account = await response.json();
//         return account;
//       } else {
//         console.error("Erreur lors de la récupération d'un compte et ses transactions");
//       }
//     } catch (error) {
//       console.error("Erreur réseau", error);
//     }
//   }

</script>




<!-- <main class="text-white">
    {#await getAccountWithTransactions()} 
        <p>Chargement...</p>
    {:then account}
        <h1>{account.account_name}</h1>
        <p>Balance : {account.balance}</p>
        <ul>
            {#each account.transactions as transaction}
                <li><a href="#" >{transaction.transaction_name} - {transaction.amount}</a></li>
            {/each}
        </ul>
    {:catch error}
        <p>Erreur : {error.message}</p>
    {/await}
</main> -->














<p class="text-white">test ACCOUNT WITH TRANSACTION account s'affiche bien</p>