<script>
    import { onMount } from "svelte";
    import {
        incomeName,
        incomeAmount,
        successUpdatedIncome,
        errorServerUpdatedIncome,
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
                // Cette syntaxe récupère la valeur de transaction.transaction_name et la met dans le champ input, et idem pour transaction.amount via les variables incomeName et incomeAmount du store
                incomeName.set(transaction.transaction_name);
                incomeAmount.set(transaction.amount);
            } else {
                console.error("Erreur lors de la récupération du revenu");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    });

    // Fonction pour modifier une dépense
    async function handleUpdateExpense() {
        try {
            const data = {
                transaction_name: $incomeName,
                amount: $incomeAmount,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/transaction/${transactionId}/updateIncome`,
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
            $errorServerUpdatedIncome = "";

            $successUpdatedIncome = "Revenu modifié avec succès !";

            setTimeout(() => {
                window.location.href = `#/accountWithTransactions/${accountId}`;
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorServerUpdatedIncome =
                "Erreur serveur, veuillez réessayer plus tard";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white text-center">
    <section class="formUpdatedIncome text-start">
        <h1 class="text-center mb-5 mt-2 fs-1 text-primary">Modifier un revenu</h1>
        <form on:submit|preventDefault={handleUpdateExpense}>
            <div class="mb-3">
                <label for="transaction_name" class="form-label fs-5">
                    Nom du revenu <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$incomeName}
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
                    Montant du revenu <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$incomeAmount}
                    type="number"
                    class="form-control"
                    id="amount"
                    required
                    aria-required
                />
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary form-control"
                    >Modifier</button
                >
            </div>
            {#if $errorServerUpdatedIncome}
                <p
                    class="errorServerUpdatedIncome text-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorServerUpdatedIncome}
                </p>
            {/if}
            {#if $successUpdatedIncome}
                <p
                    class="successUpdatedIncome text-success"
                    role="alert"
                    aria-live="assertive"
                >
                    {$successUpdatedIncome}
                </p>
            {/if}
        </form>
    </section>
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
    .formUpdatedIncome {
        max-width: 500px;
    }
    .successUpdatedIncome,
    .errorServerUpdatedIncome {
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
    }
    .btn:hover {
        font-weight: bolder;
    }
</style>
