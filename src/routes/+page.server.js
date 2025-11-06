// src/routes/+page.server.js
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  const res = await fetch('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=DEIN_KEY');
  if (!res.ok) {
    throw error(502, 'Fehler beim Abrufen der API');
  }
  const json = await res.json();
  return { stats: json }; // wird als `data` an +page.svelte geliefert
}