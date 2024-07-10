<script>
    import { successDisconnect } from "../store";

    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";

    // Si Token = navbar s'affiche
    let token = localStorage.getItem("TOKEN");
    let userId = localStorage.getItem("USER_ID");

    // Fonction pour se déconnecter
    function disconnect() {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USER_ID");
        localStorage.removeItem("ACCOUNT_IDS");
        localStorage.removeItem("TRANSACTION_IDS");

        $successDisconnect =
            "Déconnexion réussie, redirection vers la page d'accueil";

        setTimeout(() => {
            window.location.href = "#/";
            window.location.reload();
        }, 1000);

    }

</script>

{#if token}
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <button
                class="navbar-toggler fs-6"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a
                            use:link
                            class="nav-link"
                            href={`#/listAccountNameByUser/${userId}`}
                            >Liste des comptes</a
                        >
                    </li>
                    <li class="nav-item">
                        <a use:link class="nav-link" href="/addAccount"
                            >Créer un nouveau compte</a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Mes informations</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contactez-moi</a>
                    </li>
                </ul>

                <!-- Bouton de déconnexion -->
                <button
                    aria-label="Déconnexion"
                    on:click={disconnect}
                    class="btnDisconnect btn btn-danger p-1 mt-2"
                >
                    Déconnexion
                </button>

                {#if $successDisconnect}
                    <div
                        class="successDisconnect text-success"
                        role="alert"
                        aria-live="assertive"
                    >
                        {$successDisconnect}
                    </div>
                {/if}
            </div>
        </div>
    </nav>
{/if}

<style>
    button {
        border: none;
    }
    nav {
        background-color: #121212 !important;
    }
    .btnDisconnect:hover {
        background-color: #fff;
        color: darkred;
        font-weight: bolder;
    }
    .collapse {
    position: fixed;
    top: 40px;
    width: auto;
    z-index: 10;
    background-color:black; 
    border: 2px solid white;
    border-radius: 10px;
    padding: 10px;
    }


</style>
