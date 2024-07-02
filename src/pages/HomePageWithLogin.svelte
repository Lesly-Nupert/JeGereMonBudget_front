<script>
    import {
        email,
        password,
        errorInvalidEmailOrPassword,
        success,
        errorServer,
    } from "../store";

    async function handleConnection() {
        try {
            const data = { email: $email, message: $password };

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
            }

            const json = await response.json();
            console.log(json);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorServer = "";
            $errorInvalidEmailOrPassword = "";

            $success = "Connexion réussie ! Redirection en cours...";

            setTimeout(() => {
                // window.location.href = "/#";
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorServer = "Erreur serveur, veuillez réessayer plus tard.";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white text-center">
    <i class="icon__euro bi bi-currency-euro text-warning"></i>

    <h1 class="fs-1 text-primary m-4">Bienvenue dans MonBudget !</h1>

    <p class="fs-4">
        MonBudget - Une application pour suivre facilement ses revenus et ses
        dépenses
    </p>

    <section class="form__connection pb-5 pt-5 text-start">
        <h2 class="text-center my-md-5 my-4 fw-normal">SE CONNECTER</h2>
        <form on:submit|preventDefault={handleConnection}>
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
            <button class="btn btn-warning form-control fs-5"
                >Soumettre</button
            >

            <!-- * MESSAGE D'ERREUR OU DE SUCCÈS -->
            {#if $success}
                <div
                    class="success alert alert-success"
                    role="alert"
                    aria-live="assertive"
                >
                    {$success}
                </div>
            {/if}

            {#if $errorInvalidEmailOrPassword}
                <div
                    class="errorInvalidEmailOrPassword alert alert-danger"
                    role="alert"
                    aria-live="assertive"
                >
                    {$errorInvalidEmailOrPassword}
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
        Vous n'avez pas encore de compte ? <br /><a
            href="#"
            class="text-primary">Inscrivez-vous</a
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

    button:hover{
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
