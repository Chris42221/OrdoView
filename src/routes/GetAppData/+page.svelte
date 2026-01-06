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
     <div class="container-fluid px-2 px-md-4 mt-4">
        <div class="card inv">
            <!-- Game Header -->
            <div class="card-body mx-2 mx-md-3 mb-3 ad">
                <div class="row g-3">
                    <div class="col-12 col-md-4 col-lg-3">
                        <img src="{form?.appinformation.GetAppInformation[form?.appid].data.header_image}" class="img-fluid rounded" alt="{form?.appinformation.GetAppInformation[form?.appid].data.name}">
                    </div>
                    <div class="col-12 col-md-8 col-lg-9">
                        <h4 class="card-title mb-3 da">{form?.appinformation.GetAppInformation[form?.appid].data.name}</h4>
                        <div class="mb-3">
                            <a href='https://store.steampowered.com/app/{form?.appinformation.GetAppInformation[form?.appid].data.steam_appid}' target="_blank" class="btn btn-primary btn-sm">🛒 Steam Store</a>
                        </div>
                        <div class="mb-3">
                            {#each form?.appinformation.GetAppInformation[form?.appid].data.genres as genre}
                                <span class="badge bg-info me-1 mb-1 da" style="border-radius: 15px; padding: 5px 12px; font-size: 0.8em;">{genre.description}</span>
                            {/each}
                        </div>
                        <div class="row g-2">
                            <div class="col-12 col-sm-6">
                                <p class="card-text mb-1 da"><strong>App ID:</strong> {form?.appinformation.GetAppInformation[form?.appid].data.steam_appid}</p>
                            </div>
                            <div class="col-12 col-sm-6">
                                <p class="card-text mb-1 da"><strong>Release Date:</strong> {form?.appinformation.GetAppInformation[form?.appid].data.release_date.date}</p>
                            </div>
                            {#if form?.appinformation.GetAppInformation[form?.appid].data.price_overview}
                                <div class="col-12">
                                    <p class="card-text mb-1 da"><strong>Price:</strong> <span class="text-success fw-bold">{form?.appinformation.GetAppInformation[form?.appid].data.price_overview.final_formatted}</span></p>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Screenshots Carousel -->
            {#if form?.appinformation.GetAppInformation[form?.appid].data.screenshots}
                <div class="card mx-2 mx-md-3 mb-3 ad">
                    <div class="card-header">
                        <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#screenshotsCollapse">
                            Screenshots
                        </button>
                    </div>
                    <div class="collapse show" id="screenshotsCollapse">
                        <div class="card-body p-2 p-md-3">
                            <div id="screenshotCarousel" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner rounded">
                                    {#each form?.appinformation.GetAppInformation[form?.appid].data.screenshots as screenshot, index}
                                        <div class="carousel-item {index === 0 ? 'active' : ''}">
                                            <img src="{screenshot.path_full}" class="d-block w-100 rounded" style="height: 500px; object-fit: cover;" alt="Screenshot {index + 1}">
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
            <div class="card mx-2 mx-md-3 mb-3 ad">
                <div class="card-header">
                    <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#descriptionCollapse">
                        Description
                    </button>
                </div>
                <div class="collapse show" id="descriptionCollapse">
                    <div class="card-body p-2 p-md-3">
                        <p class="card-text lh-base da">{form?.appinformation.GetAppInformation[form?.appid].data.short_description}</p>
                    </div>
                </div>
            </div>
            
            <!-- Achievements Card -->
            {#if form?.appinformation.GetAppInformation[form?.appid].data.achievements}
                <div class="card mx-2 mx-md-3 mb-3 ad">
                    <div class="card-header">
                        <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#achievementsCollapse">
                            Achievements ({form?.appinformation.GetAppInformation[form?.appid].data.achievements.total})
                        </button>
                    </div>
                    <div class="collapse show" id="achievementsCollapse">
                        <div class="card-body p-2 p-md-3">
                            <div class="row g-2 g-md-3">
                                {#each form?.appinformation.GetAppInformation[form?.appid].data.achievements.highlighted as achievement}
                                    <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                                        <div class="text-center p-2 border rounded bg-lightad ad2">
                                            <img src="{achievement.path}" class="mb-2" style="width: 48px; height: 48px;" alt="{achievement.name}">
                                            <p class="small mb-0 text-truncate da" title="{achievement.name}">{achievement.name}</p>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
            
            <!-- System Requirements Card -->
            <div class="card mx-2 mx-md-3 mb-3 ad">
                <div class="card-header">
                    <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#requirementsCollapse">
                        System Requirements
                    </button>
                </div>
                <div class="collapse show" id="requirementsCollapse">
                    <div class="card-body p-2 p-md-3">
                        <div class="row g-3">
                            <div class="col-12 col-lg-6">
                                <h6 class="text-primary da">Minimum:</h6>
                                <div class="small ad ad2 p-2 rounded">{@html form?.appinformation.GetAppInformation[form?.appid].data.pc_requirements.minimum}</div>
                            </div>
                            <div class="col-12 col-lg-6">
                                <h6 class="text-success da">Recommended:</h6>
                                <div class="small ad ad2 p-2 rounded">{@html form?.appinformation.GetAppInformation[form?.appid].data.pc_requirements.recommended}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- DLCs Card -->
            {#if form?.appinformation.GetDLCInformation && form?.appinformation.GetDLCInformation.length > 0}
                <div class="card mx-2 mx-md-3 mb-3 ad">
                    <div class="card-header">
                        <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#dlcsCollapse">
                            DLCs
                        </button>
                    </div>
                    <div class="collapse show" id="dlcsCollapse">
                        <div class="card-body p-2 p-md-3">
                            <div class="row g-2 g-md-3">
                                {#each form?.appinformation.GetAppInformation[form?.appid].data.dlc as dlcId, index}
                                    <div class="col-12 col-sm-6 col-lg-4">
                                        <div class="card h-100 shadow-sm ad ad2">
                                            <a href='https://store.steampowered.com/app/{dlcId}' target="_blank" class="text-decoration-none">
                                                <img src="{form?.appinformation.GetDLCInformation[index][dlcId].data.capsule_image}" class="card-img-top" style="height: 150px; object-fit: cover;" alt="{form?.appinformation.GetDLCInformation[index][dlcId].data.name}">
                                            </a>
                                            <div class="card-body">
                                                <h6 class="card-title da">{form?.appinformation.GetDLCInformation[index][dlcId].data.name}</h6>
                                                <p class="card-text da"><small class="text-muted">ID: {dlcId}</small></p>
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
                <div class="card m-3 ad">
                    <div class="card-header">
                        <button class="btn btn-link p-0 text-decoration-none text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#supportCollapse">
                            Support Information
                        </button>
                    </div>
                    <div class="collapse show" id="supportCollapse">
                        <div class="card-body">
                            {#if form?.appinformation.GetAppInformation[form?.appid].data.support_info.url}
                                <p class="card-text da"><strong>Support Website:</strong> <a href="{form?.appinformation.GetAppInformation[form?.appid].data.support_info.url}" target="_blank">{form?.appinformation.GetAppInformation[form?.appid].data.support_info.url}</a></p>
                            {/if}
                            {#if form?.appinformation.GetAppInformation[form?.appid].data.support_info.email}
                                <p class="card-text da"><strong>Support Email:</strong> <a href="mailto:{form?.appinformation.GetAppInformation[form?.appid].data.support_info.email}">{form?.appinformation.GetAppInformation[form?.appid].data.support_info.email}</a></p>
                            {/if}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>


{/if}
