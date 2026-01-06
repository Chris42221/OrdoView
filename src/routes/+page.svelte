<script>
	export let data;
	export let form;

  const jsonStats = data.stats;
</script>

<div class="container-fluid">
	<!-- Steam Stats - Top Row -->
	<div class="row">
		<div class="col-6">
			<div class="card bg-info text-dark m-2">
				<div class="card-body text-center">
					<h6 class="card-title">Players Online</h6>
					<h4 class="card-text">{jsonStats.stats.users_online}</h4>
				</div>
			</div>
		</div>
		<div class="col-6">
			<div class="card bg-success text-white m-2">
				<div class="card-body text-center">
					<h6 class="card-title">Players In-Game</h6>
					<h4 class="card-text">{jsonStats.stats.users_ingame}</h4>
				</div>
			</div>
		</div>
	</div>

	<!-- Search Form -->
	<div class="row justify-content-center mt-4">
		<div class="col-md-6">
			<div class="card bg-dark text-light">
				<div class="card-header text-center">
					<h4 class="mb-0">Game Search</h4>
				</div>
				<div class="card-body">
					<form method="POST" action="?/SearchApps">
						<div class="mb-3">
							<label for="AppName" class="form-label">Game Name</label>
							<input id="AppName" name="AppName" type="text" class="form-control bg-secondary text-light border-info" placeholder="Enter game name" required>
						</div>
						<button type="submit" class="btn btn-info w-100">Search Games</button>
					</form>
				</div>
			</div>
		</div>
	</div>

		<!-- Search Results -->
	{#if form?.success}
		<div class="row justify-content-center mt-4">
			<div class="col-md-6">
				<div class="card bg-dark text-light">
					<div class="card-header">
						<h5 class="mb-0">Search Results</h5>
					</div>
					<div class="card-body p-0" style="max-height: 150px; overflow-y: auto;">
						<div class="list-group list-group-flush">
							{#each form?.AppSearchResults.getappresults as app}
								<div class="list-group-item bg-dark text-light border-secondary">
									<div class="d-flex align-items-center">
										<img src="{app.logo}" alt="{app.name}" class="me-3" style="width: 160px; height: 60px; object-fit: cover;">
										<div class="flex-grow-1">
											<h6 class="mb-1">{app.name}</h6>
											<small class="text-muted">App ID: {app.appid}</small>
										</div>
										<form action="?/GetAppData" method="POST">
											<input type="hidden" name="AppID" value="{app.appid}">
											<button type="submit" class="btn btn-info btn-sm">View</button>
										</form>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Group Vanity Info - Bottom Section -->
	{#if data?.stats.groupinfo}
		<div class="position-fixed bottom-0 start-0 end-0 ad border-top border-secondary" style="z-index: 1000;">
			<div class="p-3">
				<h5 class="text-light mb-3">Steam Curators</h5>
				<div id="curatorCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
					<div class="carousel-inner">
						{#each data.stats.groupinfo.groupvanityinfo as group, index}
							<div class="carousel-item {index === 0 ? 'active' : ''}">
								<div class="d-flex justify-content-center">
									<div class="card text-light" style="min-width: 400px; background-image: url('{group.creator_page_bg_url}'); background-size: cover; background-position: center;">
										<div class="card-body p-3" style="background: rgba(0,0,0,0.7);">
											<div class="d-flex align-items-center">
												<img src="{group.avatar_full_url}" alt="{group.group_name}" class="me-3 rounded-circle" style="width: 60px; height: 60px;">
												<div class="flex-grow-1">
													<h5 class="mb-1">{group.group_name}</h5>
													<p class="mb-1"><small class="text-muted">Clan ID: {group.clanAccountID}</small></p>
													<p class="mb-0"><small class="text-info">{group.member_count.toLocaleString()} members</small></p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}




</div>
