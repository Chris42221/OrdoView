<script>
	/** @type {import('./$types').PageProps} */

	let { data, form } = $props(); //Im form befinden sich die Daten von der API
</script>


<form method="POST" class="container mt-4">
    <div class="card bg-dark text-light">
        <div class="card-header">
            <h4 class="mb-0">Steam User Search</h4>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="Steamid1OwnedGamesIncludeFreeGames" value="true" id="freeGames" title="Include games that were obtained for free (e.g., free-to-play games, promotional giveaways)">
                        <label class="form-check-label text-info" for="freeGames">
                            Include Free Games
                        </label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="Steamid1OwnedGamesIncludeFreeSubs" value="true" id="freeSubs" title="Include games from free subscriptions (e.g., Steam free weekends, beta access)">
                        <label class="form-check-label text-info" for="freeSubs">
                            Include Free Subscriptions
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="Steamid1" class="form-label text-light">Steam ID</label>
                <input id="Steamid1" name="Steamid1" type="text" class="form-control bg-secondary text-light border-info" placeholder="Enter your Steam ID" required>
            </div>
            
            <button type="submit" class="btn btn-info btn-lg w-100">Search Steam Profile</button>
            
            {#if !form?.success && !form?.error}
                <div class="alert alert-info mt-3" role="alert">
                    <i class="bi bi-info-circle"></i> Enter your SteamID in the input field above to get started
                </div>
            {/if}
            
            {#if form?.error}
                <div class="alert alert-danger mt-3" role="alert">
                    <i class="bi bi-exclamation-triangle"></i> Invalid Inputs (┬┬﹏┬┬)
                </div>
            {/if}
        </div>
    </div>
</form>

<!--
Der Ihanlt in den ifs kann geändert werden
-->

{#if form?.success}
  <div class="container-fluid px-2 px-md-4">
    <div class="position-relative mx-auto" style="max-width: 1600px;">
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <!-- User Info Card -->
          <div class="carousel-item active">
            <div class="card mb-3 da ad text-white" style="height: 500px;">
              <div class="row g-0 h-100">
                <div class="col-12 col-md-4 d-flex align-items-center justify-content-center p-3">
                  <img src="{form?.User1DataJson?.stats.response.players[0].avatarmedium}" class="img-fluid rounded" style="max-width: 150px;" alt="ProfilePicture">
                </div>
                <div class="col-12 col-md-8">
                  <div class="card-body p-3 h-100 overflow-auto">
                    <h5 class="card-title text-info mb-3">Steam User Info</h5>
                    <div class="row g-2">
                      <div class="col-12">
                        <a href="{form?.User1DataJson?.stats.response.players[0].profileurl}" target="_blank" class="text-decoration-none">
                          <p class="card-text fs-6 mb-2">ID: {form?.User1DataJson?.stats.response.players[0].steamid}</p>
                        </a>
                      </div>
                      <div class="col-12 col-sm-6">
                        <p class="card-text fs-6 mb-2">Name: {form?.User1DataJson?.stats.response.players[0].personaname}</p>
                      </div>
                      <div class="col-12 col-sm-6">
                        <p class="card-text text-muted mb-2">{form?.User1DataJson?.stats.response.players[0].realname || 'N/A'}</p>
                      </div>
                      <div class="col-12 col-sm-6">
                        <p class="card-text fs-6 mb-2">Location: {form?.User1DataJson?.stats.response.players[0].loccountrycode || 'N/A'}</p>
                      </div>
                      <div class="col-12 col-sm-6">
                        <p class="card-text fs-6 mb-2">Level: {form?.User1DataJson?.level.response.player_level}</p>
                      </div>
                      <div class="col-12 col-sm-6">
                        <p class="card-text fs-6 mb-2">Badges: {form?.User1DataJson?.badgeslength}</p>
                      </div>
                      {#if form?.success && form?.User1DataJson?.grouplist.response.success}
                        <div class="col-12 col-sm-6">
                          <p class="card-text fs-6 mb-2">Groups: {form?.User1DataJson?.grouplist.response.groups.length}</p>
                        </div>
                      {/if}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Friends List -->
          <div class="carousel-item">
            <div class="card mb-3 da ad text-white" style="height: 500px; overflow: hidden;">
              <div class="card-body p-2 p-md-3">
                <h5 class="card-title mb-3">Friends List</h5>
                <div style="height: 400px; overflow-y: auto;">
                  <div class="list-group">
                    {#each form?.User1DataJson?.friendsdata as friend (friend.response.players[0].steamid)}
                      <a href="{friend.response.players[0].profileurl}" class="list-group-item list-group-item-action ad ad2 da text-light mb-2" target="_blank">
                        <div class="d-flex align-items-center">
                          <img src="{friend.response.players[0].avatarmedium}" alt="ProfilePicture" class="rounded-circle me-3" style="width: 40px; height: 40px; flex-shrink: 0;">
                          <div class="flex-grow-1 min-w-0">
                            <p class="m-0 fs-6 text-truncate">{friend.response.players[0].personaname}</p>
                            <small class="text-muted text-truncate d-block">{friend.response.players[0].realname || 'No real name'}</small>
                          </div>
                        </div>
                      </a>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Games List -->
          <div class="carousel-item">
            <div class="card mb-3 da ad text-white" style="height: 500px; overflow: hidden;">
              <div class="card-body p-2 p-md-3">
                <h5 class="card-title mb-3">Games Owned</h5>
                <div style="height: 400px; overflow-y: auto;">
                  <div class="row g-2">
                    {#each form?.User1DataJson?.ownedgames.response.games as game}
                      <div class="col-12 col-sm-6 col-lg-4">
                        <div class="card ad ad2">
                          <div class="card-body p-2">
                            <a href="https://store.steampowered.com/app/{game.appid}" target="_blank" class="text-decoration-none">
                              <h6 class="card-title small text-truncate">{game.name}</h6>
                            </a>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recently Played Games -->
          <div class="carousel-item">
            <div class="card mb-3 da ad text-white" style="height: 500px; overflow: hidden;">
              <div class="card-body p-2 p-md-3">
                <h5 class="card-title mb-3">Recently Played Games</h5>
                <div style="height: 400px; overflow-y: auto;">
                  <div class="row g-2">
                    {#each form?.User1DataJson?.recentplayedgames.response.games as game}
                      <div class="col-12 col-md-6 mb-3">
                        <div class="card position-relative" style="background-image: url('{form?.User1DataJson?.recentplayedgamesarray[form?.User1DataJson?.recentplayedgames.response.games.indexOf(game)][game.appid]?.data?.capsule_image}'); background-size: cover; background-position: center; min-height: 200px;">
                          <div class="position-absolute top-0 start-0 w-100 h-100" style="border-radius: inherit;"></div>
                          <div class="card-body position-relative p-2 p-md-3" style="z-index: 1;">
                            <h6 class="card-title text-white mb-2 mb-md-3">{game.name}</h6>
                            <div class="table-responsive">
                              <table class="table table-sm text-white">
                                <tbody>
                                  <tr class="ad2">
                                    <td class="border-0 p-1">Playtime last 2 Weeks:</td>
                                    <td class="border-0 p-1">{Math.round(game.playtime_2weeks / 60 * 10) / 10}h</td>
                                  </tr>
                                  <tr class="ad2">
                                    <td class="border-0 p-1">Total Playtime:</td>
                                    <td class="border-0 p-1">{Math.round(game.playtime_forever / 60 * 10) / 10}h</td>
                                  </tr>
                                  <tr class="ad2">
                                    <td class="border-0 p-1">Release Date:</td>
                                    <td class="border-0 p-1 small">{form?.User1DataJson?.recentplayedgamesarray[form?.User1DataJson?.recentplayedgames.response.games.indexOf(game)][game.appid]?.data?.release_date.date}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Wishlist -->
          <div class="carousel-item">
            <div class="card mb-3 da ad text-white" style="height: 500px; overflow: hidden;">
              <div class="card-body p-2 p-md-3">
                <h5 class="card-title mb-3">Wishlist</h5>
                <div style="height: 400px; overflow-y: auto;">
                  {#each form?.User1DataJson?.wishlist.response.items as game}
                    <div class="card mb-3 ad ad2">
                      <div class="card-body p-2 p-md-3">
                        <div class="row g-2 align-items-center">
                          <div class="col-12 col-sm-8">
                            <p class="da mb-1 fw-bold">{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.name}</p>
                            {#if form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.price_overview?.final_formatted}
                              <p class="da mb-0 text-success">{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.price_overview?.final_formatted}</p>
                            {:else}
                              <p class="da mb-0 text-info">Free / TBA</p>
                            {/if}
                            
                          </div>
                          <div class="col-12 col-sm-4 text-center text-sm-end">
                            <a href="https://store.steampowered.com/app/{game.appid}" target="_blank">
                              <img src="{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.capsule_image}" alt="{form?.User1DataJson?.wishlistarray[form?.User1DataJson?.wishlist.response.items.indexOf(game)][game.appid]?.data?.name} Capsule Image" class="img-fluid" style="max-width: 120px;">
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <button class="carousel-control-prev position-absolute d-none d-md-block" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" style="left: -60px; top: 50%; transform: translateY(-50%); height: 60px; width: 40px;">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next position-absolute d-none d-md-block" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style="right: -60px; top: 50%; transform: translateY(-50%); height: 60px; width: 40px;">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      
      <!-- Mobile Navigation -->
      <div class="d-md-none mt-3">
        <div class="d-flex justify-content-center gap-2">
          <button class="btn btn-outline-light btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            ← Previous
          </button>
          <button class="btn btn-outline-light btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            Next →
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
