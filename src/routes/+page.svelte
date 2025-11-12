<script>
  export let data; // enthält { stats }

    let gamename = 0;

  const jsonStats = data;
</script>

<!--
Die jsonStats.users_online Zeigt die Aktuellen Online User als Zahl an zb 33,333,333 und die jsonStats.users_ingame Zeigt die User inGame an als Zahl zb 9,999,999
-->
<p>{jsonStats.stats.stats.users_online}</p>
<p>{jsonStats.stats.stats.users_ingame}</p>

<p>{jsonStats.stats.games.applist.apps[1].}</p>

<input bind:value={gamename} />
<button type="submit">Senden</button>

