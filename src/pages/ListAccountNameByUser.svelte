<!-- <script>
    import { onMount } from "svelte";

    import { link } from "svelte-spa-router";

    // Obtention du token dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Route dynamique
    export let params = {};
    console.log(params.id);

    // Fonction pour obtenir les noms de compte par utilisateur
    onMount(async () => {
    async function getAccountNameByUser() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/allAccountsNames`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const accountsNames = await response.json();
            console.log(accountsNames);
            return accountsNames;
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

});
</script>

<section>
    <ul>
        {#await getAccountNameByUser()}
            <p>Chargement...</p>
        {:then accountsNames}
            {#each accountsNames as accountName}
                <li><a href={`/listAccountNameByUser/${accountsNames.account_name}`} class="text-white">{accountName.account_name}</a></li>
            {/each}
        {:catch error}
            <p>Erreur : {error.message}</p>
        {/await}
    </ul>
</section> -->





<p class="text-white">test LIST account s'affiche bien</p>



