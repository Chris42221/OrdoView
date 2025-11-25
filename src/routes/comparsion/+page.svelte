<script>
	/** @type {import('./$types').PageProps} */
	let { data, form } = $props(); //Im form befinden sich die Daten von der API
</script>


<form method="POST">
	<label>
		SteamID
		<input name="steamid1" type="steamid1" required >
	</label>
	<button>Suchen</button>
</form>

<!--
Der Ihanlt in den ifs kann geändert werden
-->

{#if form?.success}
<p>{form?.User1DataJson.stats.response.players[0].steamid}</p>
<p>{form?.User1DataJson.stats.response.players[0].personaname}</p>
<a href={form?.User1DataJson.stats.response.players[0].profileurl}>Profileurl</a>
<br>
<img src="{form?.User1DataJson.stats.response.players[0].avatarmedium}" alt="Profilbild">
{/if}

{#if form?.error}
<p>Invalide Inputs :(</p>
{/if}