<script>
    import { online } from 'svelte/reactivity/window';

  export let data; // enthält { stats }

  const jsonStats = data.stats;
</script>

<form method="POST" action="?/SearchApps">
	<label>
		Password
		<input name="AppName" type="AppName">
	</label>
	<button>Log in</button>
</form>

<!--
Die jsonStats.users_online Zeigt die Aktuellen Online User als Zahl an zb 33,333,333 und die jsonStats.users_ingame Zeigt die User inGame an als Zahl zb 9,999,999
-->
<h2>Spieler online: {jsonStats.stats.users_online}</h2>
<h2>Spieler inGame: {jsonStats.stats.users_ingame}</h2>

