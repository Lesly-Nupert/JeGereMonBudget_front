<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    import {
        successDeletedUserProfile,
        errorServerDeletedUserProfile,
    } from "../store";

    // Route dynamique
    export let params = {};
    console.log(params.id);

    // Obtention du token et ID user dans le localStorage
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Fonction pour vider le localStorage après suppression du compte utilisateur
    function disconnect() {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USER_ID");
    }

    // Fonction pour charger un profil utilisateur
    async function getOneProfile() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/${userId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
            );
            console.log(response);

            if (response.ok) {
                const user = await response.json();
                console.log(user);
                return user;
            } else {
                console.error(
                    "Erreur lors de la récupération d'un utilisateur",
                );
            }
        } catch (error) {
            console.error("Erreur réseau", error);
        }
    }

    // Fonction suppression du compte utilisateur
    async function deleteProfile() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/delete/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
            );
            if (response.ok) {
                console.log("Compte utilisateur supprimé !");

                $errorServerDeletedUserProfile = "";

                $successDeletedUserProfile =
                    "Compte utilisateur supprimé avec succès !";
                disconnect();

                setTimeout(() => {
                    window.location.href = "#/";
                    window.location.reload();
                }, 1000);
            } else {
                console.error("Erreur Suppression", response.status);
            }
        } catch (error) {
            $errorServerDeletedUserProfile = "Erreur veuillez réessayer.";
            console.error("Erreur réseau", error);
        }
    }
</script>

<main class="text-white">
    {#if token && userId}
        {#await getOneProfile()}
            <p>Chargement du compte utilisateur</p>
        {:then user}
            <h1 class="text-center mb-5 mt-2 text-warning">Mes informations</h1>
            <p class="fs-4">Nom : {user.username}</p>
            <p class="fs-4">Email : {user.email}</p>
            <p class="fs-4">Mot de passe : ********</p>
        {/await}

        <a
            class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 mb-3"
            href={`/user/${userId}/updateProfile`}
            aria-label="Accès à la page de modification du nom d'utilisateur ou de l'email"
            use:link
            >Modifier mes identifiants
        </a>

        <a
            class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-4 mb-4"
            href={`/user/${userId}/updatePassword`}
            aria-label="Accès à la page de modification du mot de passe"
            use:link
            >Changer mon mot de passe
        </a>

        <button
            on:click={deleteProfile}
            aria-label="Déconnexion"
            class="btnDisconnect btn btn-danger mt-0"
            type="submit">Supprimer mon compte définitivement</button
        >
    {/if}

    {#if $errorServerDeletedUserProfile}
        <p
            class="errorServerUpdatedExpense text-danger"
            role="alert"
            aria-live="assertive"
        >
            {$errorServerDeletedUserProfile}
        </p>
    {/if}
    {#if $successDeletedUserProfile}
        <p
            class="successUpdatedExpense text-success"
            role="alert"
            aria-live="assertive"
        >
            {$successDeletedUserProfile}
        </p>
    {/if}
</main>

<style>
    main {
        max-width: 600px;
        margin: 0 auto;
        padding: 0 30px;
        width: 100%;
        text-align: center;
    }
    h1 {
        font-family: "Playwrite FR Moderne", sans-serif;
    }
    a {
        display: block;
    }
    .btnDisconnect:hover {
        background-color: #fff;
        color: red;
        font-weight: bolder;
    }
</style>
