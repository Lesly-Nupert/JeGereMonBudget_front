<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    // Récupère le paramètre de l'URL du front (accountId)
    export let params = {};
    let accountId = params.accountId;

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Fonction pour récupérer un compte et ses transactions
    async function getAccountWithTransactions() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
            );
            if (response.ok) {
                const account = await response.json();
                console.log("Réponse :", account);
                return account;
            } else {
                console.error(
                    "Erreur lors de la récupération d'un compte et ses transactions",
                );
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white">
    {#await getAccountWithTransactions()}
        <p>Chargement...</p>
    {:then account}
        <h1 class="text-center text-primary">{account.account_name}</h1>
        <br />
        <!-- <p class="text-center fs-6">Balance</p> -->
        <p class="text-center fs-2">
            <span class="balance fs-6 text-warning">BALANCE</span>{account.balance} €
        </p>

        <div class="containerAdd">
            <a
                class="btn btn-primary"
                href={`/addIncome/${accountId}`}
                use:link>Ajouter un revenu</a
            >
            <a
                class="btn btn-primary"
                href={`/addExpense/${accountId}`}
                use:link>Ajouter une dépense</a
            >
        </div>

        <!-- <ul> -->
        {#each account.transactions as transaction}
            <li>
                {#if transaction.type === "revenus"}
                    <a
                        class="linkTransaction btn btn-outline-light"
                        aria-label="Détails du revenu"
                        href={`#/account/${accountId}/income/${transaction.id}`}
                    >
                        <span>{transaction.transaction_name}</span>
                        <span>{transaction.amount}€</span>
                    </a>
                {:else if transaction.type === "depenses"}
                    <a
                        class="linkTransaction btn btn-outline-light"
                        aria-label="Détails de la dépense"
                        href={`#/account/${accountId}/expense/${transaction.id}`}
                    >
                        <span>{transaction.transaction_name}</span>
                        <span>-{transaction.amount}€</span>
                    </a>
                {/if}
            </li>
        {/each}
        <!-- </ul> -->
    {:catch error}
        <p>Erreur : {error.message}</p>
    {/await}
</main>

<style>
    main {
        max-width: 700px;
        margin: 0 auto;
    }
    .balance {
        display: block;
    }
    .containerAdd {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-bottom: 50px;
    }
    li {
        list-style-type: none;
    }

    .linkTransaction {
        text-decoration: none;
        flex-wrap: wrap;
    }
    a {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    .btn-primary:hover {
        background-color: #ffc107;
        border-color: #ffc107;
        color: black;
        font-weight: bolder;
    }
</style>
