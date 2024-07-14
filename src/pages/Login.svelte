<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    import {
        emailLogin,
        passwordLogin,
        errorInvalidEmailOrPassword,
        successLogin,
        errorServerLogin,
    } from "../store";

    async function handleConnection() {
        try {
            const data = { email: $emailLogin, password: $passwordLogin };

            const response = await fetch(
                import.meta.env.VITE_API_BASE_URL + "login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            if (!response.ok) {
                $errorInvalidEmailOrPassword =
                    "Email ou mot de passe incorrect";
                throw new Error(`Erreur HTTP : ${response.status}`);
            } else {
                const result = await response.json();
                console.log(result);
                console.log("Données soumises avec succès");

                // Puis le token
                const token = result.token;
                // On checke dans la console
                console.log(token);

                // Puis le userId
                const userId = result.userId;
                console.log(userId);

                // Puis les accountIds
                const accountIds = result.accountIds;
                console.log(accountIds);

                // Puis les transactionIds
                const transactionIds = result.transactionIds;
                console.log(transactionIds);

                // Mémorisation du token et userID dans le localStorage
                localStorage.setItem("TOKEN", token);
                localStorage.setItem("USER_ID", userId);
                // localStorage.setItem("ACCOUNT_ID", accountId);
                localStorage.setItem("ACCOUNT_IDS", JSON.stringify(accountIds));
                // localStorage.setItem("TRANSACTION_ID", transactionId);
                localStorage.setItem("TRANSACTION_IDS", JSON.stringify(transactionIds));

                // Retire le message d'erreur
                $errorServerLogin = "";
                $errorInvalidEmailOrPassword = "";

                $successLogin = "Connexion réussie ! Redirection en cours...";

                setTimeout(() => {
                    if (accountIds.length === 0) {
                        // Redirection vers la page d'ajout de compte
                        window.location.href = "#/addAccount";
                    } else {
                        // Redirection vers la liste des comptes
                        window.location.href = `#/listAccountNameByUser/${userId}`;
                    }
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            $errorServerLogin = "Erreur veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }
</script>


<main class="text-white text-center">

    <section class="formConnection pb-5 pt-5 text-start">
        <h1 class="text-center my-md-5 my-4 fw-normal text-primary">Connexion</h1>
        <form on:submit|preventDefault={handleConnection}>
            <!-- * EMAIL -->
            <div class="mb-3">
                <label for="email" class="form-label fs-5">
                    Email <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$emailLogin}
                    type="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailFormat"
                />
                <p class="form-text fs-6 text-white" id="emailFormat">
                    Format d'email attendu : name@exemple.com
                </p>
            </div>

            <!-- * PASSWORD -->
            <div class="mb-3 mt-4">
                <label for="password" class="form-label fs-5">
                    Mot de passe <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$passwordLogin}
                    type="password"
                    class="form-control"
                    id="password"
                    aria-describedby="passwordFormat"
                    required
                    maxlength="12"
                />
                <p class="form-text fs-6 text-white" id="passwordFormat">
                    Votre mot de passe doit contenir entre 8 et 12 caractères,
                    avec au moins une lettre majuscule, un chiffre et un
                    caractère spécial.
                </p>
            </div>

            <!-- * BUTTON -->
            <button class="btn btn-primary form-control fs-5">Soumettre</button>

            <!-- * MESSAGE D'ERREUR OU DE SUCCÈS -->
            {#if $successLogin}
                <div
                    class="success text-success"
                    role="alert"
                    aria-live="assertive"
                >
                    {$successLogin}
                </div>
            {/if}

            {#if $errorInvalidEmailOrPassword}
                <div
                    class="errorInvalidEmailOrPassword text-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorInvalidEmailOrPassword}
                </div>
            {/if}

            {#if $errorServerLogin}
                <div
                    class="errorServer text-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorServerLogin}
                </div>
            {/if}
        </form>
    </section>

    <p class="fs-4">
        Vous n'avez pas encore de compte ? <a
            href="/signup"
            class="d-block text-light link-offset-2 link-underline link-underline-opacity-100"
            aria-label="Accès à la page d'inscription"
            use:link
            >Inscrivez-vous
        </a>
    </p>
</main>

<style>
    main {
        max-width: 600px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }
    h1 {
        font-family: 'Playwrite FR Moderne', sans-serif;
    }
    .formConnection {
        max-width: 500px;
        margin-top: -50px;
    }

    button:hover {
        font-weight: bolder;
    }
    .success,
    .errorInvalidEmailOrPassword,
    .errorServer {
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
    }

    
</style>
