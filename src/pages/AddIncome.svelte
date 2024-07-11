<script>
    import { incomeName, incomeAmount, successAddIncome, errorServerAddIncome } from "../store";

    // Récupère le paramètre de l'URL du front (accountId)
    export let params = {};
    let accountId = params.accountId;

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    async function handleAddIncome() {
        try {
            const data = {
                transaction_name: $incomeName,
                amount: $incomeAmount,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/addIncome`,
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

            const income = await response.json();
            console.log(income);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorServerAddIncome = "";

            $successAddIncome = "Revenu ajouté avec succès !";

            setTimeout(() => {
                window.location.href = `#/accountWithTransactions/${accountId}`;
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorServerAddIncome = "Erreur veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white text-center">
    <section class="formaddIncome text-start">
        <h1 class="text-center mb-5 mt-2 fs-1 text-primary">Ajouter un revenu</h1>
        <form on:submit|preventDefault={handleAddIncome}>
            <div class="mb-3">
                <label for="transaction_name" class="form-label fs-5">
                    Entrer le nom du revenu <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$incomeName}
                    type="text"
                    class="form-control"
                    id="transaction_name"
                    minlength="3"
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
                    bind:value={$incomeAmount}
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
                >Ajouter</button
            >

            <!-- * MESSAGE D'ERREUR OU DE SUCCÈS -->
            {#if $successAddIncome}
                <div
                    class="successAddAccount text-success"
                    role="alert"
                    aria-live="assertive"
                >
                    {$successAddIncome}
                </div>
            {/if}

            {#if $errorServerAddIncome}
                <div
                    class="errorServerAddAccount text-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorServerAddIncome}
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
    .formaddIncome {
        max-width: 500px;
    }
    .successAddAccount,
    .errorServerAddAccount {
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
    }
    .btn:hover {
        font-weight: bolder;
    }
</style>


