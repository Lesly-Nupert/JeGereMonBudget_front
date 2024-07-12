<script>
    import { onMount } from "svelte";
    import { link } from "svelte-spa-router";

    // Récupère le paramètre de l'URL du front (accountId)
    export let params = {};
    let accountId = params.accountId;

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Initialisation de l'objet account pour stocker les informations du compte et ses transactions 
    let account = { account_name: "", balance: 0, transactions: {} };

    // Initialisation de la variable selectedMonthYear pour le menu déroulant de sélection du mois et de l'année des transactions
    let selectedMonthYear = "";

    // Fonction pour récupérer un compte et ses transactions groupées par mois et année
    async function getAccountWithTransactions() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (response.ok) {
                const accountData = await response.json();
                account = accountData;
                // Vérifie s'il y a des transactions dans l'objet account.transactions
                if (Object.keys(account.transactions).length > 0) {
                    // Récupère la première clé de l'objet account.transactions et la stocke dans selectedMonthYear
                    selectedMonthYear = Object.keys(account.transactions)[0];
                }
            } else {
                console.error("Erreur lors de la récupération des transactions");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
    // Appel de la fonction pour récupérer le compte et ses transactions au chargement de la page.
    onMount(() => {
        getAccountWithTransactions();
    });
</script>

<main class="text-light">
    <!-- Affichage du nom du compte -->
    <a class="title mb-4 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" aria-label="Accès aux détails du compte" href={`#/user/${userId}/account/${account.id}`}>
        <h1 class="text-center text-light" aria-label="Titre du compte">{account.account_name}</h1>
    </a>
    <!-- Affichage du solde du compte -->
    <p class="text-center fs-3 text-warning" aria-label="Balance du compte">
        <span>{account.balance}</span>€
    </p>
    
    <!-- Menu déroulant pour sélectionner le mois et l'année -->
    <div class="selectorMonthYear text-center">
        <label for="monthYear">Sélectionner un mois :</label>
        <!-- Utilisation de la directive bind pour lier la valeur du select à la variable selectedMonthYear -->
        <select id="monthYear" bind:value={selectedMonthYear}>
            <!-- Boucle each pour créer une option pour chaque clé dans l'objet transactions -->
            {#each Object.keys(account.transactions) as monthYear}
                <option value={monthYear}>{monthYear}</option>
            {/each}
        </select>
    </div>

    <div class="containerAdd">
        <a class="btn btn-primary" href={`/addIncome/${accountId}`} aria-label="Accès au formulaire d'ajout d'un revenu" use:link>Ajouter un revenu</a>
        <a class="btn btn-primary" href={`/addExpense/${accountId}`} aria-label="Accès au formulaire d'ajout d'une dépense" use:link>Ajouter une dépense</a>
    </div>

    <!-- Affichage des transactions pour le mois sélectionné -->
    {#if selectedMonthYear}
        <ul>
            <!-- Boucle sur les transactions du mois et de l'année sélectionnés -->
            {#each account.transactions[selectedMonthYear] as transaction}
                <li>
                    {#if transaction.type === "revenus"}
                        <a class="linkTransaction btn btn-outline-light" aria-label="Détails du revenu" href={`#/account/${accountId}/income/${transaction.id}`}>
                            <span>{transaction.transaction_name}</span>
                            <span>{transaction.amount}€</span>
                        </a>
                    {:else if transaction.type === "depenses"}
                        <a class="linkTransaction btn btn-outline-light" aria-label="Détails de la dépense" href={`#/account/${accountId}/expense/${transaction.id}`}>
                            <span>{transaction.transaction_name}</span>
                            <span>-{transaction.amount}€</span>
                        </a>
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}
</main>

<style>
    main {
        max-width: 700px;
        margin: 0 auto;
        padding: 0 10px;
    }
    .title {
        display: block;
    }
    .containerAdd {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 50px;
        font-family: 'Playwrite FR Moderne', sans-serif;
    }
    /* ca centre la liste en responsive */
    ul{
        padding: 0; 
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
    .selectorMonthYear {
        margin-bottom: 20px;
    }
    .selectorMonthYear label {
        margin-right: 10px;
    }
</style>
