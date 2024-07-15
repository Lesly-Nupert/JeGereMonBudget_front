<script>
    import { passwordReset, errorPasswordReset, successResetPassword } from "../store";

    // let token = "";

    let token = new URLSearchParams(window.location.search).get('token');

    // onMount(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     token = params.get('token');
    // });

   
    async function handleResetPassword() {
        try {
            const data = {
                password: $passwordReset,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}resetPassword/${token}`,
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

            const password = await response.json();
            console.log(password);
            console.log("Données soumises avec succès");

            // Retire le message d'erreur
            $errorPasswordReset = "";

            $successResetPassword = "Mot de passe réinitialisé avec succès !";

            setTimeout(() => {
                window.location.href = `#/login`;
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorPasswordReset = "Erreur veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }

</script>



<main class="text-light text-center">
    <section class="formResetPassword text-start">
        <h1 class="text-center mb-5 mt-2 fs-1 text-primary">Réinitialiser votre mot de passe</h1>
        <form on:submit|preventDefault={handleResetPassword}>
            <div class="mb-3">
                <label for="password" class="form-label fs-5">
                    Entrer votre nouveau mot de passe <span aria-hidden="true">*</span>
                </label>
                <input
                    bind:value={$passwordReset}
                    type="password"
                    class="form-control"
                    id="password"
                    required
                    aria-required
                />
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary">Réinitialiser</button>
            </div>
            {#if $errorPasswordReset}
                <div class="alert alert-danger" role="alert">
                    {$errorPasswordReset}
                </div>
            {/if}
            {#if $successResetPassword}
                <div class="alert alert-success" role="alert">
                    {$successResetPassword}
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
