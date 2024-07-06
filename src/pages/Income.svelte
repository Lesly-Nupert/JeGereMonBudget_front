<script>
    import { link } from "svelte-spa-router";

    import { errorServerDeletedIncome, successDeletedIncome } from "../store";

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

    async function getOneIncome() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/transaction/${transactionId}/oneIncome`,
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

    // Fonction pour supprimer un revenu
    async function deleteIncome() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/transaction/${transactionId}/deleteIncome`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.ok) {
                console.log("Revenu supprimé");

                // Retire le message d'erreur
                $errorServerDeletedIncome = "";

                $successDeletedIncome = "Revenu suprrimé avec succès !";

                setTimeout(() => {
                    window.location.href = `#/accountWithTransactions/${accountId}`;
                    window.location.reload();
                }, 1000);
            } else {
                console.error("Erreur lors de la suppression du revenu");
            }
        } catch (error) {
            $errorServerDeletedIncome =
                "Erreur serveur, veuillez réessayer plus tard";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white">
    {#await getOneIncome()}
        <p>Chargement...</p>
    {:then transaction}
        <h1 class="text-center mb-5 text-warning">Détails du Revenu</h1>
        <p class="fs-4">Nom : {transaction.transaction_name}</p>
        <p class="fs-4">Montant : {transaction.amount}€</p>
        <p class="fs-6">Date : {formatDate(transaction.created_at)}</p>
        <div>
            <a
                href={`#/account/${accountId}/updateIncome/${transactionId}`}
                aria-label="Modifier le revenu"
                class="mb-3"
                use:link
                ><i class="update bi bi-pencil text-warning fs-4"></i></a
            >
            <form on:submit|preventDefault={deleteIncome}>
                <button type="submit" aria-label="Supprimer le revenu"
                    ><i class="garbage bi bi-trash text-danger fs-4"
                    ></i></button
                >
            </form>
        </div>
    {:catch error}
        <p>Erreur lors de la récupération du revenu</p>
    {/await}

    {#if $errorServerDeletedIncome}
        <p
            class="errorServerUpdatedExpense text-danger"
            role="alert"
            aria-live="assertive"
        >
            {$errorServerDeletedIncome}
        </p>
    {/if}
    {#if $successDeletedIncome}
        <p
            class="successUpdatedExpense text-success"
            role="alert"
            aria-live="assertive"
        >
            {$successDeletedIncome}
        </p>
    {/if}
</main>

<style>
    main {
        max-width: 500px;
        margin: 0 auto;
        padding: 0 30px;
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
