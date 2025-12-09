<script>
	import favicon from '$lib/assets/logo.png';
    import "../app.css"
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<img src="{favicon}" alt="logo" width="100" id="logo">
	<a href="/">OrdoView</a>
	<a href="/imprint">Imprint</a>
	<a href="/privacy-policy">Privacy Policy</a>
	<a href="/Steam-User-Info">Steam-User-Info</a>
</nav>

{@render children?.()}
