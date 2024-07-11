<script>
    import { link } from "svelte-spa-router";

    import { errorServerDeletedExpense, successDeletedExpense } from "../store";

    export let params = {};

    console.log("Y A QUOI", params);

    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");
    let accountId = params.accountId;
    let transactionId = params.id;

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        return date.toLocaleDateString("fr-FR", options);
    }

    // Fonction pour récupérer une dépense
    async function getOneExpense() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/transaction/${transactionId}/oneExpense`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.ok) {
                const transaction = await response.json();
                console.log("Réponse :", transaction);
                return transaction;
            } else {
                console.error("Erreur lors de la récupération du revenu");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

    // Fonction pour supprimer une dépense
    async function deleteExpense() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/transaction/${transactionId}/deleteExpense`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.ok) {
                console.log("Dépense supprimée");

                // Retire le message d'erreur
                $errorServerDeletedExpense = "";

                $successDeletedExpense = "Dépense supprimée avec succès !";

                setTimeout(() => {
                    window.location.href = `#/accountWithTransactions/${accountId}`;
                    window.location.reload();
                }, 1000);
            } else {
                console.error("Erreur lors de la suppression de la dépense");
            }
        } catch (error) {
            $errorServerDeletedExpense =
                "Erreur veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white">
    {#await getOneExpense()}
        <p>Chargement...</p>
    {:then transaction}
        <h1 class="text-center mb-5 mt-2 text-warning">Détails de la Dépense</h1>
        <p class="fs-4">Nom : {transaction.transaction_name}</p>
        <p class="fs-4">Montant : {transaction.amount}€</p>
        <p class="fs-6">Date : {formatDate(transaction.created_at)}</p>
        <div>
            <a
                href={`#/account/${accountId}/updateExpense/${transactionId}`}
                aria-label="Modifier la dépense"
                class="mb-3"
                use:link
                title="Modifier la dépense"
                ><i class="update bi bi-pencil text-warning fs-4"></i></a
            >

            <form on:submit|preventDefault={deleteExpense}>
                <button type="submit" aria-label="Supprimer la dépense" title="Supprimer la dépense"
                    ><i class="garbage bi bi-trash text-danger fs-4"
                    ></i></button
                >
            </form>
        </div>
    {:catch error}
        <p>Erreur lors de la récupération de la dépense</p>
    {/await}

    {#if $errorServerDeletedExpense}
        <p
            class="errorServerUpdatedExpense text-danger"
            role="alert"
            aria-live="assertive"
        >
            {$errorServerDeletedExpense}
        </p>
    {/if}
    {#if $successDeletedExpense}
        <p
            class="successUpdatedExpense text-success"
            role="alert"
            aria-live="assertive"
        >
            {$successDeletedExpense}
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
