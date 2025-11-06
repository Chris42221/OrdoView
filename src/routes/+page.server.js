// src/routes/+page.server.js
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  const res = await fetch('https://www.valvesoftware.com/about/stats');
  if (!res.ok) {
    // Versuche, die upstream-Antwort zu lesen (falls vorhanden) und gebe nützliche Debug-Informationen zurück.
    let body = null;
    try {
      body = await res.text();
    } catch (e) {
      // ignore
    }
    const msg = `Fehler beim Abrufen der API: ${res.status} ${res.statusText}${body ? ' — ' + body : ''}`;
    throw error(502, msg);
  }
  const json = await res.json();
  return { stats: json }; // wird als `data` an +page.svelte geliefert
}