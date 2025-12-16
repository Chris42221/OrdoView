<script>
	/** @type {import('./$types').PageProps} */

	let { data, form } = $props(); //Im form befinden sich die Daten von der API
</script>


<form method="POST" class="white-text">

  	<label class="white-text">
		<p>show games owned through free games:
		<input type="checkbox" name="Steamid1OwnedGamesIncludeFreeGames" value="true"></p>
    <p>show games owned through free subscriptions:
		<input type="checkbox" name="Steamid1OwnedGamesIncludeFreeSubs" value="true"></p>
	</label>

  <br>
  <br>

	<label class="white-text">
		<p>SteamID
		<input id="Steamid1" name="Steamid1" type="text" required ></p>
	</label>
	<button>Search</button>
  

{#if !form?.success && !form?.error}
  <p class="text-light">Enter your SteamID in the input field</p>
{/if}


</form>

<!--
Der Ihanlt in den ifs kann geändert werden
-->



{#if form?.error}
  <p class="text-danger fs-4">Invalid Inputs (┬┬﹏┬┬)</p>
{/if}

{#if form?.success}
  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
      <!-- User Info Card -->
      <div class="carousel-item active">
        <div class="card mb-3 bg-dark text-white" style="max-width: 1620px; max-height: 500px; height: 500px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="{form?.User1DataJson?.stats.response.players[0].avatarmedium}" class="img-fluid rounded-start" alt="ProfilePicture">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title text-info">Steam User Info</h5>
                <a href="{form?.User1DataJson?.stats.response.players[0].profileurl}" target="_blank">
                  <p class="card-text fs-5">{form?.User1DataJson?.stats.response.players[0].steamid}</p>
                </a>
                <p class="card-text fs-5">{form?.User1DataJson?.stats.response.players[0].personaname}</p>
                <p class="card-text text-muted">{form?.User1DataJson?.stats.response.players[0].realname}</p>
                <p class="card-text fs-5">Location: {form?.User1DataJson?.stats.response.players[0].loccountrycode}</p>
                <p class="card-text fs-5">Level: {form?.User1DataJson?.level.response.player_level}</p>
                <p class="card-text fs-5">Badges: {form?.User1DataJson?.badgeslength}</p>
                {#if form?.success && form?.User1DataJson?.grouplist.response.success}
                  <p class="card-text fs-5">Groups: {form?.User1DataJson?.grouplist.response.groups.length}</p>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Friends List -->
      <div class="carousel-item">
        <div class="card mb-3 bg-dark text-white" style="max-width: 1620px; max-height: 500px; height: 500px; overflow-y: scroll;">
          <div class="card-body">
            <h5 class="card-title">Friends List</h5>
            <div class="list-group">
              {#each form?.User1DataJson?.friendsdata as friend (friend.response.players[0].steamid)}
                <a href="{friend.response.players[0].profileurl}" class="list-group-item list-group-item-action bg-dark text-light" target="_blank">
                  <div class="d-flex justify-content-between align-items-center">
                    <img src="{friend.response.players[0].avatarmedium}" alt="ProfilePicture" class="img-fluid rounded-circle" style="width: 40px; height: 40px;">
                    <div class="ms-3">
                      <p class="m-0 fs-5">{friend.response.players[0].personaname}</p>
                      <small>{friend.response.players[0].realname}</small>
                    </div>
                  </div>
                </a>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Games List -->
      <div class="carousel-item">
        <div class="card mb-3 bg-dark text-white" style="max-width: 1620px; max-height: 500px; height: 500px; overflow-y: scroll;">
          <div class="card-body">
            <h5 class="card-title">Games Owned</h5>
            {#each form?.User1DataJson?.ownedgames.response.games as game}
              <div class="card mb-3 bg-secondary">
                <div class="card-body">
                  <h6 class="card-title">{game.name}</h6>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Recently Played Games -->
      <div class="carousel-item">
        <div class="card mb-3 bg-dark text-white" style="max-width: 1620px; max-height: 500px; height: 500px;">
          <div class="card-body">
            <h5 class="card-title">Recently Played Games</h5>
            <div class="row">
              {#each form?.User1DataJson?.recentplayedgames.response.games as game}
                <div class="col-md-6 mb-3">
                  <div class="card bg-secondary">
                    <div class="card-body">
                      <h6 class="card-title">{game.name}</h6>
                      <table class="table table-dark">
                        <tbody>
                          <tr>
                            <td>Playtime last 2 Weeks:</td>
                            <td>{game.playtime_2weeks / 60}h</td>
                          </tr>
                          <tr>
                            <td>Total Playtime:</td>
                            <td>{game.playtime_forever / 60}h</td>
                          </tr>
                          <tr>
                            <td>Release Date:</td>
                            <td>{form?.User1DataJson?.recentplayedgamesarray[form?.User1DataJson?.recentplayedgames.response.games.indexOf(game)][game.appid]?.data?.release_date.date}</td>
                          </tr>
                          <tr>
                            <td>
                              <img src="{form?.User1DataJson?.recentplayedgamesarray[form?.User1DataJson?.recentplayedgames.response.games.indexOf(game)][game.appid]?.data?.capsule_image}" alt="{game.name} Capsule" class="img-fluid">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Wishlist -->
      <div class="carousel-item">
        <div class="card mb-3 bg-dark text-white" style="max-width: 1620px; max-height: 500px; height: 500px; overflow-y: scroll;">
          <div class="card-body">
            <h5 class="card-title">Wishlist</h5>
            {#each form?.User1DataJson?.wishlist.response.items as game}
              <div class="card mb-3 bg-secondary">
                <div class="card-body">
                	<h6 class="card-title">{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.name}</h6>
					<p>{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.type}</p>
					<p>{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.name}</p>
					<p>{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.price_overview?.final_formatted}</p>
                	<a href="https://store.steampowered.com/app/{game.appid}" target="_blank">
                    	<img src="{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.capsule_image}" alt="{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.name} Capsule Image" class="img-fluid">
                	</a>
                </div>
              </div>
            {/each}
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
