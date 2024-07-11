<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";
</script>

<footer>
    <p>&copy; 2024 MonBudget - <a href="#/noticeLegacy">Mentions légales</a> - <a use:link href="#/contactUs">Contactez-moi</a></p>
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