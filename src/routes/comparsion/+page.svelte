<script>
	/** @type {import('./$types').PageProps} */
	let { data, form } = $props(); //Im form befinden sich die Daten von der API
</script>


<form method="POST">
	<label>
		SteamID
		<input name="Steamid1" type="text" required >
	</label>
	<button>Suchen</button>

	<label>
		OwnedGames Option
		<input type="checkbox" name="Steamid1OwnedGamesIncludeFreeGames" value="true">
		<input type="checkbox" name="Steamid1OwnedGamesIncludeFreeSubs" value="true">
	</label>
</form>

<!--
Der Ihanlt in den ifs kann geändert werden
-->

{#if !form?.success&&!form?.error}
	<p>Enter your SteamID in the input field</p>
{/if}

{#if form?.success}
<p>{form?.User1DataJson?.stats.response.players[0].steamid}</p>
<p>{form?.User1DataJson?.stats.response.players[0].realname}</p>
<p>{form?.User1DataJson?.stats.response.players[0].personaname}</p>
<p>{form?.User1DataJson?.stats.response.players[0].loccountrycode}</p>
<p>{form?.User1DataJson?.level.response.player_level}</p>
<a href={form?.User1DataJson?.stats.response.players[0].profileurl}>Profileurl</a>
<br>
<img src="{form?.User1DataJson?.stats.response.players[0].avatarmedium}" alt="Profilbild">
{/if}

{#if form?.success}
{#each form?.User1DataJson?.friendsdata as friend}
	<p>Steamid: {friend.response.players[0].steamid} | 
		Name: {friend.response.players[0].realname}, {friend.response.players[0].personaname} | 
		<a href={friend.response.players[0].profileurl} >
			<img src={friend.response.players[0].avatarmedium} alt="Profilbild">
		</a>
	</p>
{/each}
{/if}

{#if form?.success}
<p>Games:{form?.User1DataJson?.ownedgames.response.game_count}</p>
{#each form?.User1DataJson?.ownedgames.response.games as game}
	<p>Game: {game.name}</p>
{/each}
{/if}

{#if form?.success}
<p>Badges: {form?.User1DataJson?.badgeslength}</p>
{/if}

{#if form?.success&&form?.User1DataJson?.grouplist.response.success}
<p>Groups: {form?.User1DataJson?.grouplist.response.groups.length}</p>
{/if}

{#if form?.success}
<p>Recent Played Games:</p>
{#each form?.User1DataJson?.recentplayedgames.response.games as game}
	<p>Game: {game.name}</p>
{/each}
{/if}



{#if form?.error}
<p>Invalide Inputs :(</p>
{/if}