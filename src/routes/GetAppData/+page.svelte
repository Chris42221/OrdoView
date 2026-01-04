<script>
    export let form;
</script>  

<!--
Sobald der User auf der Seite weitergeleitet wurde wird die AppID durch das form an +page.Server.js gesendet
was dann die API anfrage durchführt
-->
<form action="/gamedata" method="POST">
</form>

<!--
Zeigt die Daten der API an
-->
{#if form?.success && form?.appid && typeof form?.appid === 'string'}
    <h1>{form?.appinformation.GetAppInformation[form?.appid].data.name}</h1>
    <h3>{form?.appinformation.GetAppInformation[form?.appid].data.steam_appid}</h3>
    <p>{form?.appinformation.GetAppInformation[form?.appid].data.about_the_game}</p>
    <p>{form?.appinformation.GetAppInformation[form?.appid].data.pc_requirements.minimum}</p>
    <p>{form?.appinformation.GetAppInformation[form?.appid].data.pc_requirements.recommended}</p>
    <p>{form?.appinformation.GetAppInformation[form?.appid].data.release_date.date}</p>
    <p><img src={form?.appinformation.GetAppInformation[form?.appid].data.capsule_image}
        alt={form?.appinformation.GetAppInformation[form?.appid].data.capsule_image}></p>

    {#if form?.appinformation.GetAppInformation[form?.appid].data.price_overview}
        <p>{form?.appinformation.GetAppInformation[form?.appid].data.price_overview.final_formatted}</p>
    {/if}

    {#each form?.appinformation.GetAppInformation[form?.appid].data.dlc as dlcId, index}
        <p>DLC ID: {dlcId}</p>
        <p>DLC Name: {form?.appinformation.GetDLCInformation[index][dlcId].data.name}</p>
        <p><img src={form?.appinformation.GetDLCInformation[index][dlcId].data.capsule_image}
             alt={form?.appinformation.GetDLCInformation[index][dlcId].data.capsule_image}></p>
    {/each}

    

    <div class="container mt-4 nbg-transparent">
        <div class="card">
            <!-- Game Header -->
            <div class="card-body d-flex">
                <img src="{form?.appinformation.GetAppInformation[form?.appid].data.header_image}" class="me-3" style="width: 300px; height: auto;" alt="{form?.appinformation.GetAppInformation[form?.appid].data.name}">
                <div class="flex-grow-1">
                    <h5 class="card-title">{form?.appinformation.GetAppInformation[form?.appid].data.name}</h5>
                    <div class="mb-2">
                        {#each form?.appinformation.GetAppInformation[form?.appid].data.genres as genre}
                            <span class="badge bg-info me-1 mb-1" style="border-radius: 15px; padding: 5px 12px;">{genre.description}</span>
                        {/each}
                    </div>
                    <p class="card-text"><strong>App ID:</strong> {form?.appinformation.GetAppInformation[form?.appid].data.steam_appid}</p>
                    <p class="card-text"><strong>Release Date:</strong> {form?.appinformation.GetAppInformation[form?.appid].data.release_date.date}</p>
                    {#if form?.appinformation.GetAppInformation[form?.appid].data.price_overview}
                        <p class="card-text"><strong>Price:</strong> {form?.appinformation.GetAppInformation[form?.appid].data.price_overview.final_formatted}</p>
                    {/if}
                </div>
            </div>
            
            <!-- Screenshots Carousel -->
            {#if form?.appinformation.GetAppInformation[form?.appid].data.screenshots}
                <div class="card m-3">
                    <div class="card-header">
                        <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#screenshotsCollapse">
                            Screenshots
                        </button>
                    </div>
                    <div class="collapse show" id="screenshotsCollapse">
                        <div class="card-body">
                            <div id="screenshotCarousel" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    {#each form?.appinformation.GetAppInformation[form?.appid].data.screenshots as screenshot, index}
                                        <div class="carousel-item {index === 0 ? 'active' : ''}">
                                            <img src="{screenshot.path_full}" class="d-block w-100" style="height: 400px; object-fit: cover;" alt="Screenshot {index + 1}">
                                        </div>
                                    {/each}
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#screenshotCarousel" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#screenshotCarousel" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
            
            <!-- Description Card -->
            <div class="card m-3">
                <div class="card-header">
                    <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#descriptionCollapse">
                        Description
                    </button>
                </div>
                <div class="collapse show" id="descriptionCollapse">
                    <div class="card-body">
                        <p class="card-text">{form?.appinformation.GetAppInformation[form?.appid].data.short_description}</p>
                    </div>
                </div>
            </div>
            
            <!-- Achievements Card -->
            {#if form?.appinformation.GetAppInformation[form?.appid].data.achievements}
                <div class="card m-3">
                    <div class="card-header">
                        <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#achievementsCollapse">
                            Achievements ({form?.appinformation.GetAppInformation[form?.appid].data.achievements.total})
                        </button>
                    </div>
                    <div class="collapse show" id="achievementsCollapse">
                        <div class="card-body">
                            <div class="row">
                                {#each form?.appinformation.GetAppInformation[form?.appid].data.achievements.highlighted as achievement}
                                    <div class="col-md-3 mb-3">
                                        <div class="text-center">
                                            <img src="{achievement.path}" class="mb-2" style="width: 64px; height: 64px;" alt="{achievement.name}">
                                            <p class="small">{achievement.name}</p>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
            
            <!-- System Requirements Card -->
            <div class="card m-3">
                <div class="card-header">
                    <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#requirementsCollapse">
                        System Requirements
                    </button>
                </div>
                <div class="collapse show" id="requirementsCollapse">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Minimum:</h6>
                                <div class="small">{@html form?.appinformation.GetAppInformation[form?.appid].data.pc_requirements.minimum}</div>
                            </div>
                            <div class="col-md-6">
                                <h6>Recommended:</h6>
                                <div class="small">{@html form?.appinformation.GetAppInformation[form?.appid].data.pc_requirements.recommended}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- DLCs Card -->
            {#if form?.appinformation.GetDLCInformation && form?.appinformation.GetDLCInformation.length > 0}
                <div class="card m-3">
                    <div class="card-header">
                        <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#dlcsCollapse">
                            DLCs
                        </button>
                    </div>
                    <div class="collapse show" id="dlcsCollapse">
                        <div class="card-body">
                            <div class="row">
                                {#each form?.appinformation.GetAppInformation[form?.appid].data.dlc as dlcId, index}
                                    <div class="col-md-4 mb-3">
                                        <div class="card">
                                            <img src="{form?.appinformation.GetDLCInformation[index][dlcId].data.capsule_image}" class="card-img-top" alt="{form?.appinformation.GetDLCInformation[index][dlcId].data.name}">
                                            <div class="card-body">
                                                <h6 class="card-title">{form?.appinformation.GetDLCInformation[index][dlcId].data.name}</h6>
                                                <p class="card-text"><small class="text-muted">ID: {dlcId}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
            
            <!-- Support Information Card -->
            {#if form?.appinformation.GetAppInformation[form?.appid].data.support_info}
                <div class="card m-3">
                    <div class="card-header">
                        <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#supportCollapse">
                            Support Information
                        </button>
                    </div>
                    <div class="collapse show" id="supportCollapse">
                        <div class="card-body">
                            {#if form?.appinformation.GetAppInformation[form?.appid].data.support_info.url}
                                <p class="card-text"><strong>Support Website:</strong> <a href="{form?.appinformation.GetAppInformation[form?.appid].data.support_info.url}" target="_blank">{form?.appinformation.GetAppInformation[form?.appid].data.support_info.url}</a></p>
                            {/if}
                            {#if form?.appinformation.GetAppInformation[form?.appid].data.support_info.email}
                                <p class="card-text"><strong>Support Email:</strong> <a href="mailto:{form?.appinformation.GetAppInformation[form?.appid].data.support_info.email}">{form?.appinformation.GetAppInformation[form?.appid].data.support_info.email}</a></p>
                            {/if}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>


{/if}
