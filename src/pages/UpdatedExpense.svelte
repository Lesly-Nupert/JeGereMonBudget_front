<script>
    import { onMount } from "svelte";
    import {
        expenseName,
        expenseAmount,
        successUpdatedExpense,
        errorServerUpdatedExpense,
    } from "../store";

    export let params = {};

    console.log("Y A QUOI", params);

    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");
    let accountId = params.accountId;
    let transactionId = params.id;

    // Chargemement des données de la dépense à modifier
    onMount(async () => {
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
                // Cette syntaxe récupère la valeur de transaction.transaction_name et la met dans le champ input, et idem pour transaction.amount via les variables expenseName et expenseAmount du store
                expenseName.set(transaction.transaction_name);
                expenseAmount.set(transaction.amount);
            } else {
                console.error("Erreur lors de la récupération de la dépense");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    });

    // Fonction pour modifier une dépense
    async function handleUpdateExpense() {
        try {
            const data = {
                transaction_name: $expenseName,
                amount: $expenseAmount,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/transaction/${transactionId}/updateExpense`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify(data),
                },
            );

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const expense = await response.json();
            console.log(expense);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorServerUpdatedExpense = "";

            $successUpdatedExpense = "Dépense modifiée avec succès !";

            setTimeout(() => {
                window.location.href = `#/accountWithTransactions/${accountId}`;
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorServerUpdatedExpense =
                "Erreur serveur, veuillez réessayer plus tard";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white text-center">
    <section class="formUpdatedExpense pb-5 pt-5 text-start">
        <h1 class="text-center mb-5 fs-1 text-primary">Modifier une dépense</h1>
        <form on:submit|preventDefault={handleUpdateExpense}>
            <div class="mb-3">
                <label for="transaction_name" class="form-label fs-5">
                    Nom de la dépense <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$expenseName}
                    type="text"
                    class="form-control"
                    id="transaction_name"
                    maxlength="30"
                    required
                    aria-required
                />
            </div>
            <div class="mb-3">
                <label for="amount" class="form-label fs-5">
                    Montant de la dépense <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$expenseAmount}
                    type="number"
                    class="form-control"
                    id="amount"
                    required
                    aria-required
                />
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary form-control"
                    >Modifier la dépense</button
                >
            </div>
            {#if $errorServerUpdatedExpense}
                <p
                    class="errorServerUpdatedExpense text-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorServerUpdatedExpense}
                </p>
            {/if}
            {#if $successUpdatedExpense}
                <p
                    class="successUpdatedExpense text-success"
                    role="alert"
                    aria-live="assertive"
                >
                    {$successUpdatedExpense}
                </p>
            {/if}
        </form>
    </section>
</main>

<style>
    main {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }
    .formUpdatedExpense {
        max-width: 500px;
    }
    .successUpdatedExpense,
    .errorServerUpdatedExpense {
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
    }
    .btn:hover {
        font-weight: bolder;
    }
</style>
