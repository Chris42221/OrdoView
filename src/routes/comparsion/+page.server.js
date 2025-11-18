import {KEY} from "$env/static/private"
/** @satisfies {import('./$types').Actions} */
import { error } from '@sveltejs/kit';
export const actions = {
	default: async (event) => {
		const test = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${KEY}&steamids=${}`);
        if(!test.ok){
            let body = null;
            try {
                body = await test.text();
             } catch (e) {
                // ignore
            }
            const msg = `Fehler beim Abrufen der API: ${test.status} ${test.statusText}${body ? ' — ' + body : ''}`;
            throw error(502, msg);
        }

        const User1Data = await test.json()

        const User1DataJson = {stats: User1Data}

        console.log(User1Data);
        
        return {stats: User1DataJson};
	}
};