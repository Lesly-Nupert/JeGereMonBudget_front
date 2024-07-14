<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";
</script>

<footer>
    <p>
        <a
            use:link
            class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            href="#/legalNotice"
            aria-label="Voir les mentions légales">Mentions légales</a
        >
        -
        <a
            class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            use:link
            href="#/contactUs"
            aria-label="Contactez-nous">Contact</a
        >
        -
        <a
            use:link
            href="#/"
            class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            aria-label="Retour à l'accueil"
            title="Accueil"
        ><i class="bi bi-house-door"></i></a
        >
        <span class="d-block">
            &copy; 2024 JeGereMonBudget 
        </span>
    </p>
</footer>

<style>
    footer {
        background-color: #333;
        color: white;
        text-align: center;
    }
    footer a {
        color: white;
    }
</style>
