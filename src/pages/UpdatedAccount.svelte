<script>
    import { onMount } from "svelte";
    import {
        accountName,
        successAccountNameUpdated,
        errorServerAccountNameUpdated,
    } from "../store";

    export let params = {};

    console.log("Y A QUOI", params);

    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");
    let accountId = params.id;


    // Chargemement des données du compte à modifier
    onMount(async () => {
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
                accountName.set(account.account_name);
            } else {
                console.error("Erreur lors de la récupération du compte");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    });

    // Fonction pour modifier un compte
    async function handleUpdateAccount() {
        try {
            const data = {
                account_name: $accountName,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}/account/${accountId}/updateAccount`,
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

            console.log(data);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorServerAccountNameUpdated = "";

            $successAccountNameUpdated = "Modification du compte réussie !";

            setTimeout(() => {
                window.location.href = `#/accountWithTransactions/${accountId}`;
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorServerAccountNameUpdated =
                "Erreur veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }

</script>

<main class="text-white text-center">
    <section class="formUpdatedAccount text-start">
        <h1 class="text-center mb-5 mt-2 fs-1 text-primary">Modifier le compte</h1>
        <form on:submit|preventDefault={handleUpdateAccount}>
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
                
                <button type="submit" class="btn btn-primary form-control mt-3">Modifier le compte</button>

                <div class="errorServerAccountNameUpdated text-danger">
                    {#if $errorServerAccountNameUpdated}
                        <p>{$errorServerAccountNameUpdated}</p>
                    {/if}   
                </div>

                <div class="successAccountNameUpdated text-success">
                    {#if $successAccountNameUpdated}
                        <p>{$successAccountNameUpdated}</p>
                    {/if}
                </div>
            </div>
            
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
    .formUpdatedAccount {
        max-width: 500px;
    }
    .successAccountNameUpdated,
    .errorServerAccountNameUpdated {
        margin-top: 10px;
        border-radius: 5px;
    }
    .btn:hover {
        font-weight: bolder;
    }
</style>

                

