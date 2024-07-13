<script>
    // Importation des variables du store
    import {
        email,
        message,
        errorEmail,
        errorMessage,
        success,
        errorServer,
    } from "../store";

    // REGEX
    function validateEmail(email) {
        let emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,10}\b/;
        return emailRegex.test(email);
    }

    async function handleContact() {
        // Réinitialisation des messages d'erreur
        $errorEmail = "";
        $errorMessage = "";

        // Validation côté client
        // Appel de la fonction validateEmail avec la valeur du store
        if (!validateEmail($email)) {
            $errorEmail = "ERREUR Format d'email attendu : exemple@exemple.com";
        }

        if (!$message) {
            $errorMessage = "ERREUR Veuillez saisir un message";
        }

        // Si des erreurs sont présentes, ne pas envoyer la requête
        if ($errorEmail || $errorMessage) {
            return;
        }

        try {
            const data = { email: $email, message: $message };

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
            // console.log(json);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorServer = "";

            $success = "Message envoyé avec succès";

            setTimeout(() => {
                window.location.href = "#/";
                window.location.reload();
            }, 2000);
        } catch (error) {
            $errorServer = "Erreur serveur, veuillez réessayer plus tard";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-light">
    <h1 class="text-center p-5 text-info">CONTACT</h1>
    <form on:submit|preventDefault={handleContact}>
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
            <p class="form-text fs-6 text-light" id="emailFormat">
                Format d'email attendu : nom@exemple.com
            </p>
        </div>

        {#if $errorEmail}
            <div class="alert alert-danger" role="alert" aria-live="assertive">
                {$errorEmail}
            </div>
        {/if}

        <div class="mb-3 mt-4">
            <label for="message" class="form-label fs-5">
                Votre message <span aria-hidden="true">*</span>
            </label>
            <textarea
                bind:value={$message}
                class="form-control"
                id="message"
                rows="3"
            ></textarea>
        </div>

        {#if $errorMessage}
            <div class="alert alert-danger" role="alert" aria-live="assertive">
                {$errorMessage}
            </div>
        {/if}

        <div class="mb-3 mt-4">
            <input
                class="form-check-input"
                type="checkbox"
                id="checkbox"
                required
            />
            <label class="form-check-label" for="checkbox">
                J'accepte <a href="URL_CONDITIONS_UTILISATION" target="_blank" class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    >les conditions d'utilisation du site et sa politique de
                    confidentialité</a
                >.
            </label>
        </div>

        <button class="btn">Soumettre</button>

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
</main>

<style>
    main {
        max-width: 600px;
        margin: auto;
    }

    .btn:hover {
        background-color: #0dcaf0;
        color: black;
    }

    .btn {
        background-color: #fff;
        border: 2px solid #0dcaf0;
        font-weight: bold;
    }

    .errorServer,
    .success {
        margin-top: 15px;
    }
</style>
