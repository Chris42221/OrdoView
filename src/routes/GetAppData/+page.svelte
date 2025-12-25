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
{/if}
