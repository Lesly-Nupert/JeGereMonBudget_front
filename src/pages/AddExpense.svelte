<script>
    import { expenseName, expenseAmount, successAddExpense, errorServerAddExpense } from "../store";

    // Récupère le paramètre de l'URL du front (accountId)
    export let params = {};
    let accountId = params.accountId;

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    async function handleAddIncome() {
        try {
            const data = {
                transaction_name: $expenseName,
                amount: $expenseAmount,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/addExpense`,
                {
                    method: "POST",
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
            $errorServerAddExpense = "";

            $successAddExpense = "Dépense ajoutée avec succès !";

            setTimeout(() => {
                window.location.href = `#/accountWithTransactions/${accountId}`;
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorServerAddExpense = "Erreur veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white text-center">
    <section class="formaddExpense text-start">
        <h1 class="text-center mb-5 mt-2 fs-1 text-primary">Ajouter une dépense</h1>
        <form on:submit|preventDefault={handleAddIncome}>
            <div class="mb-3">
                <label for="transaction_name" class="form-label fs-5">
                    Entrer le nom de la dépense <span aria-hidden="true">*</span>
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
                    Entrer le montant <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$expenseAmount}
                    type="number"
                    step="0.01"
                    class="form-control"
                    id="amount"
                    maxlength="30"
                    required
                    aria-required
                />
            </div>

            <button type="submit" class="btn btn-primary form-control"
                >Ajouter la dépense</button
            >

            <!-- * MESSAGE D'ERREUR OU DE SUCCÈS -->
            {#if $successAddExpense}
                <div
                    class="successAddExpense text-success"
                    role="alert"
                    aria-live="assertive"
                >
                    {$successAddExpense}
                </div>
            {/if}

            {#if $errorServerAddExpense}
                <div
                    class="errorServerAddExpense text-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorServerAddExpense}
                </div>
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

    .successAddExpense,
    .errorServerAddExpense {
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
    }
    .btn:hover {
        font-weight: bolder;
    }
</style>












