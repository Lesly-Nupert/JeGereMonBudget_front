<script>
    // Routeur optimisé pour Single Page Application (SPA)
    import { link } from "svelte-spa-router";
</script>

<footer>
    <p>&copy; 2024 MonBudget - <a class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="#/noticeLegacy">Mentions légales</a> - <a  class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" use:link href="#/contactUs">Contact</a></p>
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