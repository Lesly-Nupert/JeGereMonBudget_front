<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";
</script>

<main class="text-white text-center">
    <i class="iconEuro bi bi-currency-euro text-warning"></i>

    <h1 class="fs-1 text-primary m-4">Bienvenue dans MonBudget !</h1>

    <p class="introAppli fs-4 mb-5">
        MonBudget - Une application pour suivre facilement ses revenus et ses
        dépenses
    </p>

    <p>
        <a
            href="#/login"
            class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-3"
            aria-label="Accès au formulaire de connexion">Connexion</a
        >
    </p>

    <p>ou</p>

    <p>
        <a
            href="#/signup"
            class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-3"
            aria-label="Accès au formulaire d'inscription">Inscription</a
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
    .iconEuro {
        font-size: 100px;
        color: white;
    }
    
    h1 {
        font-family: "Playwrite FR Moderne", sans-serif;
        line-height: 1.5;
    }
    .introAppli {
        line-height: 1.5;
    }
</style>
