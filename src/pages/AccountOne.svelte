<script>
    import { link } from "svelte-spa-router";

    import { errorServerDeletedAccount, successDeletedAccount } from "../store";

    export let params = {};
    console.log("Y A QUOI", params);

    let accountIds = JSON.parse(localStorage.getItem("ACCOUNT_IDS"));

    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");
    let accountId = params.id;
    

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        return date.toLocaleDateString("fr-FR", options);
    }

    async function getOneAccount() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/oneAccount`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.ok) {
                const account = await response.json();
                console.log("Réponse :", account);
                return account;
            } else {
                console.error("Erreur lors de la récupération du compte");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

    // Fonction pour supprimer un revenu
    async function deleteAccount() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/deleteAccount`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.ok) {
                console.log("Compte supprimé");

                // Retire le message d'erreur
                $errorServerDeletedAccount = "";

                $successDeletedAccount = "Compte suprrimé avec succès !";

                setTimeout(() => {
                    if (accountIds.length === 0) {
                        // Redirection vers la page d'ajout de compte
                        window.location.href = "#/addAccount";
                    } else {
                        // Redirection vers la liste des comptes
                        window.location.href = `#/listAccountNameByUser/${userId}`;
                    }
                    window.location.reload();
                }, 1000);
            } else {
                console.error("Erreur lors de la suppression du compte");
            }
        } catch (error) {
            $errorServerDeletedAccount =
                "Erreur serveur, veuillez réessayer plus tard";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white">
    {#await getOneAccount()}
        <p>Chargement...</p>
    {:then account}
        <h1 class="text-center mb-5 mt-2 text-warning">Détails du Compte</h1>
        <p class="fs-4">Nom du compte : {account.account_name}</p>
        <p class="fs-6">Date : {formatDate(account.created_at)}</p>
        <div>
            <a
                href={`#/user/${userId}/account/updateAccount/${accountId}`}
                aria-label="Modifier le compte"
                class="mb-3"
                use:link
                title="Modifier le compte"
                ><i class="update bi bi-pencil text-warning fs-4"></i></a
            >
            <form on:submit|preventDefault={deleteAccount}>
                <button type="submit" aria-label="Supprimer le revenu" title="Supprimer le revenu"
                    ><i class="garbage bi bi-trash text-danger fs-4"
                    ></i></button
                >
            </form>
        </div>
    {:catch error}
        <p>Erreur lors de la récupération du compte</p>
    {/await}

    {#if $errorServerDeletedAccount}
        <p
            class="errorServerUpdatedExpense text-danger"
            role="alert"
            aria-live="assertive"
        >
            {$errorServerDeletedAccount}
        </p>
    {/if}
    {#if $successDeletedAccount}
        <p
            class="successUpdatedExpense text-success"
            role="alert"
            aria-live="assertive"
        >
            {$successDeletedAccount}
        </p>
    {/if}
</main>

<style>
    main {
        max-width: 600px;
        margin: 0 auto;
        padding: 0 30px;
    }
    h1 {
        font-family: 'Playwrite FR Moderne', sans-serif;

    }
    div {
        display: flex;
        flex-direction: column;
    }

    button {
        background: none;
        border: none;
    }

    button i {
        background: none;
    }
</style>
