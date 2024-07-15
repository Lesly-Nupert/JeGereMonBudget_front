<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    import {
        usernameSignup,
        emailSignup,
        passwordSignup,
        successSignup,
        errorServerSignup,
        errorPasswordSignup,
        errorEmailSignup,
        errorUsernameSignup,
    } from "../store";

    // REGEX
    function validateEmail(email) {
        let emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
        return emailRegex.test(email);
    }
    function validatePassword(password) {
        let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,12}$/;
        return passwordRegex.test(password);
    }

    async function handleSignup() {
        // Réinitialisation des messages d'erreur
        $errorEmailSignup = "";
        $errorPasswordSignup = "";
        $errorUsernameSignup = "";

        // Validation côté client
        // Appel des fonctions avec la valeur du store
        if (!validateEmail($emailSignup)) {
            $errorEmailSignup = "ERREUR Format d'email attendu : exemple@exemple.com";
        }

        if (!validatePassword($passwordSignup)) {
            $errorPasswordSignup =
                "ERREUR Votre mot de passe doit contenir entre 8 et 12 caractères, avec au moins une lettre majuscule, un chiffre et un caractère spécial.";
        }

        if (!$usernameSignup) {
            $errorUsernameSignup = "ERREUR Veuillez remplir ce champ";
        }
        // Si des erreurs sont présentes, ne pas envoyer la requête
        if ($errorEmailSignup || $errorPasswordSignup || $errorUsernameSignup) {
            return;
        }

        try {
            const data = {
                username: $usernameSignup,
                email: $emailSignup,
                password: $passwordSignup,
            };
 console.log("donnéees envoyées : ", data);
            const response = await fetch(
                import.meta.env.VITE_API_BASE_URL + "signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorServerSignup = "";

            $successSignup = "Inscription réussie ! Redirection en cours...";

            setTimeout(() => {
                window.location.href = "#/login";
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorServerSignup = "Erreur veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }
</script>


<main class="text-white text-center">
   
    <section class="formConnection pb-5 text-start">
        <h1 class="text-center my-md-5 my-4 fw-normal text-primary">Inscription</h1>
        <form on:submit|preventDefault={handleSignup}>

            <!-- * USERNAME -->
            <div class="mb-3">
                <label for="username" class="form-label fs-5">
                    Nom d'utilisateur <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$usernameSignup}
                    type="text"
                    class="form-control"
                    id="username"
                    required
                />
                {#if $errorUsernameSignup}
                    <p class="form-text fs-6 text-danger">{$errorUsernameSignup}</p>
                {/if}
            </div>

            <!-- * EMAIL -->
            <div class="mb-3">
                <label for="email" class="form-label fs-5">
                    Email <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$emailSignup}
                    type="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailFormat"
                />
                <p class="form-text fs-6 text-white" id="emailFormat">
                    Format d'email attendu : name@exemple.com
                </p>
            </div>
            {#if $errorEmailSignup}
                <p class="form-text fs-6 text-danger">{$errorEmailSignup}</p>
            {/if}

            <!-- * PASSWORD -->
            <div class="mb-3 mt-4">
                <label for="password" class="form-label fs-5">
                    Mot de passe <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$passwordSignup}
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
            {#if $errorPasswordSignup}
                <p class="form-text fs-6 text-danger">{$errorPasswordSignup}</p>
            {/if}

            <!-- * CHECKBOX -->
            <div class="container__legacy d-flex mb-3 mt-4">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox"
                    required
                />
                <label class="form-check-label ms-2" for="checkbox">
                    J'accepte <a
                        class="text-light"
                        href="#/legalNotice"
                        target="_blank"
                        >les conditions d'utilisation et la politique de
                        confidentialité du site</a
                    >.
                </label>

                
            </div>

            <!-- * BUTTON -->
            <button class="btn btn-primary form-control fs-5">Valider mon inscription</button>

            <!-- * MESSAGE D'ERREUR SERVEUR OU DE SUCCÈS -->
            {#if $successSignup}
                <div
                    class="success alert alert-success"
                    role="alert"
                    aria-live="assertive"
                >
                    {$successSignup}
                </div>
            {/if}

           
            {#if $errorServerSignup}
                <div
                    class="errorServer alert alert-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorServerSignup}
                </div>
            {/if}
        </form>
    </section>

    <p class="fs-4">
        Vous avez déjà un compte ? <a
            href="/login"
            class="d-block text-light link-offset-2 link-underline link-underline-opacity-100" 
            aria-label="Accès à la page d'inscription"
            use:link>Connectez-vous
        </a
        >
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
        padding: 0 20px;
    }

    h1 {
        font-family: 'Playwrite FR Moderne', sans-serif;
    }

    .formConnection {
        max-width: 500px;
    }

    button:hover {
        font-weight: bolder;
    }
    .success,
    .errorServer {
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
    }
</style>
