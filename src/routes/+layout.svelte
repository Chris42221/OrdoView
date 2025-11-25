<script>
	import favicon from '$lib/assets/favicon.svg';
    import "../app.css"
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/">OrdoView</a>
	<a href="/imprint">Imprint</a>
	<a href="/privacy-policy">Privacy Policy</a>
	<a href="/comparsion">Comparsion</a>
</nav>

{@render children?.()}
