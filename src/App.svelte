<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";

  // * Importation du routeur et des route
  import Router, { location } from "svelte-spa-router";
  import routes from "./routes";
  import { beforeUpdate } from "svelte";
  
  beforeUpdate(() => {
    $location === "/"
      ? document.body.classList.add("homepage")
      : document.body.classList.remove("homepage");  
  });

</script>

<Header />
<Router {routes} />
<Footer />



