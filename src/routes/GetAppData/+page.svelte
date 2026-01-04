<script>
    export let form;
</script>  

<!--
Sobald der User auf der Seite weitergeleitet wurde wird die AppID durch das form an +page.Server.js gesendet
was dann die API anfrage durchführt
-->
<form action="/gamedata" method="POST">
</form>

<h1>GetAppData</h1>


<!--
Zeigt die Daten der API an
-->
{#if form?.success && form?.appid && typeof form?.appid === 'string'}
    <p>{form?.appinformation.GetAppInformation[form?.appid].data.name}</p>
    <p>{form?.appinformation.GetAppInformation[form?.appid].data.steam_appid}</p>
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
{/if}
