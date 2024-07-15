<script>
    import {
        oldPassword,
        newPassword,
        successUpdatedPassword,
        errorServerUpdatedPassword,
    } from "../store";

    // Route dynamique
    export let params = {};
    console.log(params);

    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // REGEX
    function validateOldPassword(oldPassword) {
        let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,12}$/;
        return passwordRegex.test(oldPassword);
    }

    function validateNewPassword(newPassword) {
        let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,12}$/;
        return passwordRegex.test(newPassword);
    }

    // Fonction pour modifier le mot de passe utilisateur
    async function handleUpdatePassword() {
        // Réinitialisation des messages d'erreur
        $errorServerUpdatedPassword = "";
        $successUpdatedPassword = "";

        // Validation des mots de passe
        if (
            !validateOldPassword($oldPassword) ||
            !validateNewPassword($newPassword)
        ) {
            $errorServerUpdatedPassword =
                "ERREUR : Vérifiez votre saisie ! Vos mots de passe doivent contenir entre 8 et 12 caractères, avec au moins une lettre majuscule, un chiffre et un caractère spécial.";
            return;
        }

        try {
            const data = {
                oldPassword: $oldPassword,
                newPassword: $newPassword,
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/updatePassword/${userId}`,
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

            const result = await response.json();
            console.log(result);
            console.log("Données soumises avec succès");

            $successUpdatedPassword = "Mot de passe modifié avec succès !";

            setTimeout(() => {
                window.location.href = "#/";
                window.location.reload();
            }, 1000);
        } catch (error) {
            $errorServerUpdatedPassword = "Erreur serveur, veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-light text-center">
    <section class="formUpdatedPassword text-start">
        <h1 class="text-center mb-5 mt-2 fs-2 text-info">
            Modifier le mot de passe
        </h1>
        <form on:submit|preventDefault={handleUpdatePassword}>
            <div class="mb-3">
                <label for="oldPassword" class="form-label fs-5"
                    >Ancien mot de passe <span aria-hidden="true">*</span
                    ></label
                >
                <input
                    bind:value={$oldPassword}
                    type="password"
                    class="form-control"
                    id="oldPassword"
                    aria-describedby="passwordFormat"
                    required
                    maxlength="12"
                />
                <p class="form-text fs-6 text-light" id="passwordFormat">
                    Votre mot de passe doit contenir entre 8 et 12 caractères,
                    avec au moins une lettre majuscule, un chiffre et un
                    caractère spécial.
                </p>
            </div>

            <div class="mb-3 mt-4">
                <label for="newPassword" class="form-label fs-5"
                    >Nouveau mot de passe <span aria-hidden="true">*</span
                    ></label
                >
                <input
                    bind:value={$newPassword}
                    type="password"
                    class="form-control"
                    id="newPassword"
                    aria-describedby="passwordFormat"
                    required
                    maxlength="12"
                />
                <p class="form-text fs-6 text-light" id="passwordFormat">
                    Votre mot de passe doit contenir entre 8 et 12 caractères,
                    avec au moins une lettre majuscule, un chiffre et un
                    caractère spécial.
                </p>
            </div>

            <div class="mb-3">
                <button type="submit" class="btn btn-info form-control"
                    >Modifier le mot de passe</button
                >
            </div>

            {#if $errorServerUpdatedPassword}
                <div class="text-danger" role="alert" aria-live="assertive">
                    {$errorServerUpdatedPassword}
                </div>
            {/if}
            {#if $successUpdatedPassword}
                <div class="text-success" role="alert" aria-live="assertive">
                    {$successUpdatedPassword}
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
        padding: 10px;
    }

    h1 {
        font-family: "Playwrite FR Moderne", sans-serif;
    }

    .formUpdatedPassword {
        max-width: 500px;
    }

    button:hover {
        font-weight: bolder;
    }
</style>
