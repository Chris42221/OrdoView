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
Wenn ein Error da steht einfach Ignorieren
-->

{#if form?.success}
<p>{form?.User1DataJson.stats.response.players[0].steamid}</p>
<p>{form?.User1DataJson.stats.response.players[0].realname}</p>
<p>{form?.User1DataJson.stats.response.players[0].personaname}</p>
<p>{form?.User1DataJson.stats.response.players[0].loccountrycode}</p>
<p>{form?.User1DataJson.level.response.player_level}</p>
<a href={form?.User1DataJson.stats.response.players[0].profileurl}>Profileurl</a>
<br>
<img src="{form?.User1DataJson.stats.response.players[0].avatarmedium}" alt="Profilbild">
{/if}

{#if form?.success}
{#each form?.User1DataJson.friendsdata as friend}
	<p>Steamid: {friend.response.players[0].steamid} | 
		Name: {friend.response.players[0].realname}, {friend.response.players[0].personaname} | 
		<a href={friend.response.players[0].profileurl} >
			<img src={friend.response.players[0].avatarmedium} alt="Profilbild">
		</a>
	</p>
{/each}
{/if}

{#if form?.error}
<p>Invalide Inputs :(</p>
{/if}