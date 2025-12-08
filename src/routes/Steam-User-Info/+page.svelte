<script>
	/** @type {import('./$types').PageProps} */

	let { data, form } = $props(); //Im form befinden sich die Daten von der API
</script>


<form method="POST">
	<label>
		SteamID
		<input id="Steamid1" name="Steamid1" type="text" required >
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

{#if form?.error}
<p>Invalide Inputs (┬┬﹏┬┬)</p>
{/if}

{#if form?.success}
	<div id="carouselExample" class="carousel slide">
	<div class="carousel-inner">
		<!---->
		<div class="carousel-item active">
			<div class="card mb-3 bg-secondary"
			style="
			max-width: 1620px;
			max-height: 500px;
			height: 500px;
			">
			<div class="row g-0">
				<div class="col-md-4">
				<img src="{form?.User1DataJson?.stats.response.players[0].avatarmedium}" alt="Profilbild">
				</div>
				<div class="col-md-8">
				<div class="card-body">
					<h5 class="card-title">Steam User Info</h5>
					<a href={form?.User1DataJson?.stats.response.players[0].profileurl} target="_blank"><p class="card-text fs-5">{form?.User1DataJson?.stats.response.players[0].steamid}</p></a>
					<p class="card-text fs-5">{form?.User1DataJson?.stats.response.players[0].personaname}</p>
					<p class="card-text"><small class="text-body-secondary">{form?.User1DataJson?.stats.response.players[0].realname}</small></p>
					<p class="card-text fs-5">Location: {form?.User1DataJson?.stats.response.players[0].loccountrycode}</p>
					<p class="card-text fs-5">Level: {form?.User1DataJson?.level.response.player_level}</p>
					<p class="card-text fs-5">Badges: {form?.User1DataJson?.badgeslength}</p>
					{#if form?.success&&form?.User1DataJson?.grouplist.response.success}
						<p class="card-text fs-5">Groups: {form?.User1DataJson?.grouplist.response.groups.length}</p>
					{/if}

				</div>
				</div>
			</div>
			</div>	
		</div>
		<!---->
		<div class="carousel-item">
			<div class="card mb-3 bg-secondary" 
			style="
			max-width: 1620px;
			max-height: 500px;
			height: 500px;
			overflow-y: scroll
			">
			<div class="row g-0">
				<div class="col-md-8">
				<div class="card-body">		
					<div class="row">
						<div class="row">
						<div class="col-4">
						</div>
							<div class="col-8">
								<div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example">

										{#each form?.User1DataJson?.friendsdata as friend (friend.response.players[0].steamid)}
											<h4 id="simple-list-item-{form?.User1DataJson?.friendsdata.indexOf(friend)}">
												<p>Name: {friend.response.players[0].personaname}</p>
											</h4>
											<p>
												Steamid: {friend.response.players[0].steamid} | 
												Name: {friend.response.players[0].realname} , {friend.response.players[0].personaname} | 
												<a href={friend.response.players[0].profileurl} target="_blank">
													<img src={friend.response.players[0].avatarmedium} alt="Profilbild">
												</a>
											</p>
										{/each}
								</div>
							</div>
						</div>
				</div>
				</div>
			</div>
			</div>
		</div>
		</div>
		<!---->
		<div class="carousel-item">
			<div class="card mb-3 bg-secondary" 
			style="
			max-width: 1620px;
			max-height: 500px;
			height: 500px;
			overflow-y: scroll
			">
			<div class="row g-0">
				<div class="col-md-8">
				<div class="card-body">		
					<div class="row">
						<div class="row">
						<div class="col-4">
						</div>
							<div class="col-8">
								<div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example">
									<p class="card-text">Games: {form?.User1DataJson?.ownedgames.response.game_count}</p>	
										{#each form?.User1DataJson?.ownedgames.response.games as game}
											<h4 id="simple-list-item-{form?.User1DataJson?.friendsdata.indexOf(game)}">
												<p>Name: {game.name}</p>
											</h4>
											<p>
											</p>
										{/each}
								</div>
							</div>
						</div>
				</div>
				</div>
			</div>
			</div>
		</div>
		</div>
		<!---->
		<div class="carousel-item">
			<div class="card mb-3 bg-secondary" 
			style="
			max-width: 1620px;
			max-height: 500px;
			height: 500px;
			">
			<div class="row g-0">
				<div class="col-md-8">
					<div class="card-body">		
						<div class="row">
							{#each form?.User1DataJson?.recentplayedgames.response.games as game}
								<div class="card w-75 mb-3 bg-secondary" 
										style="
										
										">
									<div class="card-body">
										<h5 class="card-title">{game.name}</h5>
										<table>
											<tbody>
												<tr>
													<td>
														<p class="card-text">Playtime last  2Weeks: </p>
													</td>
													<td>
														<p class="card-text">{game.playtime_2weeks/60}h</p>
													</td>
												</tr>
												<tr>
													<td>
														<p class="card-text">Playtime: </p>
													</td>
													<td>
														<p class="card-text">{game.playtime_forever/60}h</p>
													</td>
												</tr>
												<tr>
													<td>
														<p class="card-text">Release Date: </p>
													</td>
													<td>
														<p class="card-text">{form?.User1DataJson?.recentplayedgamesarray[form?.User1DataJson?.recentplayedgames.response.games.indexOf(game)][game.appid]?.data?.release_date.date}</p>
													</td>
												</tr>
												<tr>
													<td>
														<img src="{form?.User1DataJson?.recentplayedgamesarray[form?.User1DataJson?.recentplayedgames.response.games.indexOf(game)][game.appid]?.data?.capsule_image}" 
														alt="{form?.User1DataJson?.recentplayedgamesarray[form?.User1DataJson?.recentplayedgames.response.games.indexOf(game)][game.appid]?.data?.name} capsule image">
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>	
		</div>
		<!---->
				<div class="carousel-item">
			<div class="card mb-3 bg-secondary" 
			style="
			max-width: 1620px;
			max-height: 500px;
			height: 500px;
			overflow-y: scroll
			">
			<div class="row g-0">
				<div class="col-md-8">
				<div class="card-body">		
					<div class="row">
						<div class="row">
						<div class="col-4">
						</div>
							<div class="col-8">
								<div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example">
										{#each form?.User1DataJson?.wishlist.response.items as game}
											<h4 id="simple-list-item-{form?.User1DataJson?.wishlist.response.items.indexOf(game)}">
												<p>Name: {game.appid}</p>
												<p>{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.type}</p>
												<p>{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.name}</p>
												<p>{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.price_overview?.final_formatted}</p>
												<a href="https://store.steampowered.com/app/{game.appid}" target="_blank">
													<img src="{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.capsule_image}" 
													alt="{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.name} capsule image">
												</a>
											</h4>
										{/each}
								</div>
							</div>
						</div>
				</div>
				</div>
			</div>
			</div>
		</div>
		</div>
	</div>
	<button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
		<span class="carousel-control-prev-icon" aria-hidden="true"></span>
		<span class="visually-hidden">Previous</span>
	</button>
	<button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
		<span class="carousel-control-next-icon" aria-hidden="true"></span>
		<span class="visually-hidden">Next</span>
	</button>
	</div>
{/if}