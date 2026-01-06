<script>
	import favicon from '$lib/assets/logo.png';
    import "../app.css";
    import 'bootstrap/dist/css/bootstrap.min.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark ad border-bottom border-body ad">
  <div class="container-fluid">

    <!-- Logo -->
    <a class="navbar-brand d-flex align-items-center" href="/">
      <img src="{favicon}" alt="logo" width="50" id="logo" class="me-2">
      
    </a>

    <!-- Toggle Button for Mobile -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Collapsible Links -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/imprint">Imprint</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/privacy-policy">Privacy Policy</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Steam-User-Info">Steam-User-Info</a>
        </li>
      </ul>
    </div>

  </div>
</nav>

{@render children?.()}
