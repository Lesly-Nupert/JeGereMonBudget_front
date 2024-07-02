<!-- <script>
    import { account_name, success, errorServer } from "../store";

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    async function handleAddAccount() {
        try {
            const data = {
                account_name: $account_name,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/addAccount`,
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

            const account = await response.json();
            console.log(account);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorServer = "";

            $success = "Ajout du compte réussi !";

            setTimeout(() => {
                window.location.href = "#/";
            }, 1000);
        } catch (error) {
            $errorServer = "Erreur serveur, veuillez réessayer plus tard";
            console.error("Erreur réseau", error);
        }
    }
</script>

<section>
    <h1 class="text-center text-white">Ajouter un compte</h1>
    <form on:submit|preventDefault={handleAddAccount}>
        <div class="mb-3">
            <label for="account_name" class="form-label fs-5 text-white">
                Nom du compte <span aria-hidden="true">*</span>
            </label>
            <input
                bind:value={$account_name}
                type="text"
                class="form-control"
                id="account_name"
                required
            />
        </div>
        <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
</section> -->




<p class="text-white">
    test ADD account s'affiche bien 
</p>
