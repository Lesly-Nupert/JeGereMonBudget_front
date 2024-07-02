<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    import {
        username,
        email,
        password,
        success,
        errorServer,
        errorPassword,
        errorEmail,
        errorUsername,
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
        $errorEmail = "";
        $errorPassword = "";
        $errorUsername = "";

        // Validation côté client
        // Appel des fonctions avec la valeur du store
        if (!validateEmail($email)) {
            $errorEmail = "ERREUR Format d'email attendu : exemple@exemple.com";
        }

        if (!validatePassword($password)) {
            $errorPassword =
                "ERREUR Votre mot de passe doit contenir entre 8 et 12 caractères, avec au moins une lettre majuscule, un chiffre et un caractère spécial.";
        }

        if (!$username) {
            $errorUsername = "ERREUR Veuillez remplir ce champ";
        }
        // Si des erreurs sont présentes, ne pas envoyer la requête
        if ($errorEmail || $errorPassword) {
            return;
        }

        try {
            const data = {
                username: $username,
                email: $email,
                message: $password,
            };

            const response = await fetch(
                import.meta.env.VITE_API_BASE_URL + "contact",
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
            $errorServer = "";

            $success = "Inscription réussie ! Redirection en cours...";

            setTimeout(() => {
                window.location.href = "#/login";
            }, 1000);
        } catch (error) {
            $errorServer = "Erreur serveur, veuillez réessayer plus tard";
            console.error("Erreur réseau", error);
        }
    }
</script>


<main class="text-white text-center">
   
    <section class="form__connection pb-5 pt-5 text-start">
        <h1 class="text-center my-md-5 my-4 fw-normal">INSCRIPTION</h1>
        <form on:submit|preventDefault={handleSignup}>

            <!-- * USERNAME -->
            <div class="mb-3">
                <label for="username" class="form-label fs-5">
                    Nom d'utilisateur <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$username}
                    type="text"
                    class="form-control"
                    id="username"
                    required
                />
                {#if $errorUsername}
                    <p class="form-text fs-6 text-danger">{$errorUsername}</p>
                {/if}
            </div>

            <!-- * EMAIL -->
            <div class="mb-3">
                <label for="email" class="form-label fs-5">
                    Email <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$email}
                    type="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailFormat"
                />
                <p class="form-text fs-6 text-white" id="emailFormat">
                    Format d'email attendu : name@exemple.com
                </p>
            </div>
            {#if $errorEmail}
                <p class="form-text fs-6 text-danger">{$errorEmail}</p>
            {/if}

            <!-- * PASSWORD -->
            <div class="mb-3 mt-4">
                <label for="password" class="form-label fs-5">
                    Mot de passe <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$password}
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
            {#if $errorPassword}
                <p class="form-text fs-6 text-danger">{$errorPassword}</p>
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
                        href="URL_CONDITIONS_UTILISATION"
                        target="_blank"
                        >les conditions d'utilisation du site et sa politique de
                        confidentialité</a
                    >.
                </label>
            </div>

            <!-- * BUTTON -->
            <button class="btn btn-warning form-control fs-5">Soumettre</button>

            <!-- * MESSAGE D'ERREUR SERVEUR OU DE SUCCÈS -->
            {#if $success}
                <div
                    class="success alert alert-success"
                    role="alert"
                    aria-live="assertive"
                >
                    {$success}
                </div>
            {/if}

           
            {#if $errorServer}
                <div
                    class="errorServer alert alert-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorServer}
                </div>
            {/if}
        </form>
    </section>

    <p class="fs-4">
        Vous avez déjà un compte ? <br /><a
            href="/"
            class="text-primary" 
            aria-label="Accès à la page d'inscription"
            use:link>Connectez-vous
        </a
        >
    </p>

</main>



<style>
    main {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }
    .icon__euro {
        font-size: 100px;
        color: white;
    }

    .form__connection {
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
