// src/routes/+page.server.js
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  const resStats = await fetch('https://www.valvesoftware.com/about/stats');

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

  const statsJson = await resStats.json();


  const json = { stats: statsJson, };
  console.log(json);

  return { stats: json}; // wird als `data` an +page.svelte geliefert
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	SearchApps: async (event) => {
		const form = await event.request.formData();
    const appname = form.get("AppName");

    console.log(appname)
    const appnameconvertet = appname?.slice();

    console.log(appnameconvertet)


    const getapp = await fetch(`https://steamcommunity.com/actions/SearchApps/team%20fortress%202`);
	}
};