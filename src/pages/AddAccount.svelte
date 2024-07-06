<script>
    import {
        accountName,
        successAddAccount,
        errorServerAddAccount,
    } from "../store";

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    async function handleAddAccount() {
        try {
            const data = {
                account_name: $accountName,
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
            console.log(data);
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const account = await response.json();
            console.log(account);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorServerAddAccount = "";

            $successAddAccount = "Ajout du compte réussi !";

            setTimeout(() => {
                window.location.href = `#/accountWithTransactions/${account.id}`;
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorServerAddAccount =
                "Erreur serveur, veuillez réessayer plus tard";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white text-center">
    <section class="formaddAccount text-start">
        <h1 class="text-center mb-5 fs-1 text-primary">Ajouter un compte</h1>
        <form on:submit|preventDefault={handleAddAccount}>
            <div class="mb-3">
                <label for="account_name" class="form-label fs-5">
                    Entrer le nom du compte <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$accountName}
                    type="text"
                    class="form-control"
                    id="account_name"
                    maxlength="30"
                    required
                    aria-required
                />
            </div>
            <button type="submit" class="btn btn-primary form-control"
                >Ajouter</button
            >

            <!-- * MESSAGE D'ERREUR OU DE SUCCÈS -->
            {#if $successAddAccount}
                <div
                    class="successAddAccount alert alert-success"
                    role="alert"
                    aria-live="assertive"
                >
                    {$successAddAccount}
                </div>
            {/if}

            {#if $errorServerAddAccount}
                <div
                    class="errorServerAddAccount alert alert-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorServerAddAccount}
                </div>
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
    }
    .formaddAccount {
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
