<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";
</script>

<main class="text-white text-center">
    <i class="iconEuro bi bi-currency-euro text-warning" aria-hidden="true"></i>

    <h1 class="fs-1 text-primary m-4">Bienvenue dans JeGereMonBudget !</h1>

    <p class="introAppli fs-4 mb-5">
        JeGereMonBudget - Une application pour suivre facilement ses revenus et ses
        dépenses
    </p>

    <a
        use:link
        href="#/login"
        class="btn btn-primary"
        aria-label="Accès au formulaire de connexion">Se connecter</a
    >

    <a
        use:link
        href="#/signup"
        class="btn btn-primary"
        aria-label="Accès au formulaire d'inscription">S'inscrire</a
    >
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
    a {
        width: 200px;
        border-radius: 100px;
        padding: 10px;
        margin: 20px;
    }
    a:hover {
        border-color: #ffc107;
        color: black;
        font-weight: bold;
        transition: background 400ms ease-in-out;
        background-image: linear-gradient(45deg, #ffc107 30%, transparent 70%);
    }
</style>
