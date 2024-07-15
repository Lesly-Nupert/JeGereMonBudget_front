<script>
    import { onMount } from "svelte";
    import {
        usernameSignup,
        emailSignup,
        successUpdatedUserProfile,
        errorServerUpdatedUserProfile,
    } from "../store";

    export let params = {};

    console.log("Y A QUOI", params);

    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Chargemement des données du compte utilisateur à modifier
    onMount(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            
            if (response.ok) {
                const profileOne = await response.json();
                console.log("Réponse :", profileOne);
                // Cette syntaxe récupère la valeur de transaction.transaction_name et la met dans le champ input, et idem pour transaction.amount via les variables incomeName et incomeAmount du store
                usernameSignup.set(profileOne.username);
                emailSignup.set(profileOne.email);
            } else {
                console.error("Erreur lors de la récupération du compte utilisateur");
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    });

    // Fonction pour modifier un compte utilisateur
    async function handleUpdateProfile() {
        try {
            const data = {
                username: $usernameSignup,
                email: $emailSignup,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/update/${userId}`,
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

            const profile = await response.json();
            console.log(profile);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorServerUpdatedUserProfile = "";

            $successUpdatedUserProfile = "Revenu modifié avec succès !";

            setTimeout(() => {
                window.location.href = `#/userProfile/${userId}`;
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorServerUpdatedUserProfile =
                "Erreur veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white text-center">
    <section class="formUpdatedIncome text-start">
        <h1 class="text-center mb-5 mt-2 fs-2 text-info">Modifier les identitifiants</h1>
        <form on:submit|preventDefault={handleUpdateProfile}>
            <div class="mb-3">
                <label for="username" class="form-label fs-5">
                    Nom d'utilisateur <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$usernameSignup}
                    type="text"
                    class="form-control"
                    id="username"
                    maxlength="30"
                    required
                    aria-required
                />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label fs-5">
                    Email <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$emailSignup}
                    type="email"
                    class="form-control"
                    id="email"
                    required
                    aria-required
                />
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-info form-control"
                    >Modifier mes identifiants</button
                >
            </div>
            {#if $errorServerUpdatedUserProfile}
                <p
                    class="errorServerUpdatedUserProfile text-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorServerUpdatedUserProfile}
                </p>
            {/if}
            {#if $successUpdatedUserProfile}
                <p
                    class="successUpdatedUserProfile text-success"
                    role="alert"
                    aria-live="assertive"
                >
                    {$successUpdatedUserProfile}
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
        line-height: 1.5;
    }
    .formUpdatedIncome {
        max-width: 500px;
    }
    .successUpdatedUserProfile,
    .errorServerUpdatedUserProfile {
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
    }
    .btn:hover {
        font-weight: bolder;
    }
</style>
