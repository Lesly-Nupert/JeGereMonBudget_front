<script>
    import { emailForgotPassword, successForgotPassword, errorEmailForgotPassword } from "../store";

    async function handleForgotPassword() {
        try {
            const data = {
                email: $emailForgotPassword,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}forgotPassword`,
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

            const email = await response.json();
            console.log(email);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorEmailForgotPassword = "";

            $successForgotPassword = "Un email de réinitialisation vous a été envoyé !";

            setTimeout(() => {
                window.location.href = `#/login`;
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorEmailForgotPassword = "Erreur veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }
</script>


<main class="text-light text-center">
    <section class="formForgotPassword text-start pb-5 pt-5">
        <h1 class="text-center mb-5 mt-2 fs-1 text-primary">Mot de passe oublié</h1>
        <form on:submit|preventDefault={handleForgotPassword}>
            <div class="mb-3">
                <label for="email" class="form-label fs-5">
                    Entrer votre email <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$emailForgotPassword}
                    type="email"
                    class="form-control"
                    id="email"
                    required
                    aria-required
                    placeholder=" "
                />
            </div>

            <button type="submit" class="btn btn-primary form-control" aria-label="Envoyer la demande de réinitialisation du mot de passe">Envoyer</button>

            <!-- * MESSAGE D'ERREUR OU DE SUCCÈS -->
            {#if $errorEmailForgotPassword}
                <div class="alert alert-danger mt-3" role="alert" aria-live="assertive">
                    {$errorEmailForgotPassword}
                </div>
            {/if}
            {#if $successForgotPassword}
                <div class="alert alert-success mt-3" role="alert" aria-live="assertive">
                    {$successForgotPassword}
                </div>
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
    }

    /* .successAddExpense,
    .errorServerAddExpense {
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
    } */

    .btn:hover {
        font-weight: bolder;
    }
</style>



