<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";
    
    // Mettre un log pour éviter le message d'avertissement vu que le paramètre n'est pas utilisé car userId est récupéré dans le localStorage.
    export let params = {};
    console.log(params);
    
    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");
    
    // Fonction pour récupérer un compte et ses transactions
    async function getAllAccountsWithTransactions() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/accounts`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
            );
            if (response.ok) {
                const accounts = await response.json();
                console.log("Réponse :", accounts);
                return accounts;
            } else {
                console.error(
                    "Erreur lors de la récupération des comptes et ses transactions associées",
                );
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white">
    {#await getAllAccountsWithTransactions()}
        <p>Chargement...</p>
    {:then accounts}
        {#each accounts as account}
        <a href={`#/accountWithTransactions/${account.id}`} class="text-white" use:link>
            <p>{account.account_name}</p>
        </a>
        {/each}
    {:catch error}
        <p>Erreur : {error.message}</p>
    {/await}
</main>



























