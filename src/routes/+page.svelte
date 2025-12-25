<script>
	export let data;
	export let form;

  const jsonStats = data.stats;
</script>

<form method="POST" action="?/SearchApps">
	<label>
		<p class="da">Games: </p>
		<input id="AppName" name="AppName" type="text">
		<button type="submit">Search</button>
	</label>
</form>

<!--
Die jsonStats.users_online Zeigt die Aktuellen Online User als Zahl an zb 33,333,333 und die jsonStats.users_ingame Zeigt die User inGame an als Zahl zb 9,999,999
-->
<h2>Spieler online: {jsonStats.stats.users_online}</h2>
<h2>Spieler inGame: {jsonStats.stats.users_ingame}</h2>

{#if form?.success}
	{#each form?.AppSearchResults.getappresults as app}
		<form action="?/GetAppData" method="POST">
			<input type="text" name="AppID" id="AppID" value={app.appid} readonly>
			<button type="submit">
			<img src="{app.logo}" alt="gamelogo">
		</button>
		</form>
	{/each}
{/if}
