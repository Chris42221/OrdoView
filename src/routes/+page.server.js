// src/routes/+page.server.js
import { error, redirect } from '@sveltejs/kit';

// @ts-ignore
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

  const groupvanityinfo = await fetch('https://store.steampowered.com/events/ajaxgetnewscurators');
  if(!groupvanityinfo.ok){
    throw new Error(`Response status: ${groupvanityinfo.status}`);
  }

  const statsJson = await resStats.json();
  const groupvanityinfoJson = await groupvanityinfo.json();


  const json = { stats: statsJson, groupinfo: groupvanityinfoJson};
  console.log(json);

  return { stats: json}; // wird als `data` an +page.svelte geliefert
}


/** @satisfies {import('./$types').Actions} */
export const actions = {
	SearchApps: async (event) => {
		const form = await event.request.formData();
    const appname = form.get("AppName")?.toString();

    console.log(appname);

    const appnameconverted = appname?.replace(" ", "%20");
   
    const getapp = await fetch(`https://steamcommunity.com/actions/SearchApps/${appnameconverted}`);
    if(!getapp.ok){
      throw new Error(`Response status: ${getapp.status}`);
    }

    const GetAppResults= await getapp.json();
    console.log(GetAppResults);

    const AppSearchResults = {
      getappresults: GetAppResults
    }

    return{AppSearchResults, success: true,};
	},
  GetAppData: async (event)=>{
    const form = await event.request.formData();
    const appid = form.get("AppID");

    console.log(appid);

    //Leitet die AppID weiter und den User zur seite in /GetAppData
    redirect(307, '/GetAppData');
    
  }
};