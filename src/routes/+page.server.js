// src/routes/+page.server.js
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  const resStats = await fetch('https://www.valvesoftware.com/about/stats');

  const formData = await Request.formData();
  const resClientStats = await fetch(`https://steamcommunity.com/actions/SearchApps/${}`);

  if (!resStats.ok) {
    // Versuche, die upstream-Antwort zu lesen (falls vorhanden) und gebe nützliche Debug-Informationen zurück.
    let body = null;
    try {
      body = await resStats.text();
    } catch (e) {
      // ignore
    }
    const msg = `Fehler beim Abrufen der API: ${resStats.status} ${resStats.statusText}${body ? ' — ' + body : ''}`;
    throw error(502, msg);
  }
  if (!resClientStats.ok){
    let body = null;
    try{
      body = await resClientStats.text();
    }catch(e){
      console.log(e);
    }
  }

  const statsJson = await resStats.json();
  const clientStatsJson = await resClientStats.json();


  const json = { stats: statsJson, games: clientStatsJson };
  console.log(json);

  return { stats: json}; // wird als `data` an +page.svelte geliefert
}