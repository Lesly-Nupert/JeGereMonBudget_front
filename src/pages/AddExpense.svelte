<!-- <script>
    import { transaction_name, amount, success, errorServer } from "../store";

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    async function handleAddExpense() {
        try {
            const data = {
                transaction_name: $transaction_name,
                amount: $amount,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/addExpense`,
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
            $errorServer = "";

            $success = "Dépense ajoutée avec succès !";

            setTimeout(() => {
                window.location.href = "#/accountWithTransactions/:id";
            }, 1000);
        } catch (error) {
            $errorServer = "Erreur serveur, veuillez réessayer plus tard";
            console.error("Erreur réseau", error);
        }
    }
</script>

<section>
    <h1 class="text-center text-white">Ajouter une dépense</h1>
    <form on:submit|preventDefault={handleAddExpense}>
        <div class="mb-3">
            <label for="transaction_name" class="form-label fs-5 text-white">
                Nom de la dépense <span aria-hidden="true">*</span>
            </label>
            <input
                bind:value={$transaction_name}
                type="text"
                class="form-control"
                id="transaction_name"
                required
            />
        </div>
        <div class="mb-3">
            <label for="amount" class="form-label fs-5 text-white">
                Montant <span aria-hidden="true">*</span>
            </label>
            <input
                bind:value={$amount}
                type="number"
                class="form-control"
                id="amount"
                required
            />
        </div>
        <button type="submit" class="btn btn-primary form-control">Ajouter</button>
    </form>
</section>


<style>
    h1{
        margin: 50px;
    }
    
    section{
        max-width: 500px;
        margin: 0 auto;
    }
</style> -->









<p class="text-white">
    test ADD EXPENSE s'affiche bien 
</p>
