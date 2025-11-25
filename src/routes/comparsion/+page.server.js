import {KEY} from "$env/static/private"
/** @satisfies {import('./$types').Actions} */

export const actions = {
	default: async (event) => {

        //Übernimmt die Angaben aus dem Input
        const form = await event.request.formData();
        const steamid1 = form.get("steamid1")

        //Stellt die Anfrage an Steam
		const test = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${KEY}&steamids=${steamid1}`);
        if(!test.ok){
            throw new Error(`Response status: ${test.status}`);
        };

        //Wandelt die Daten in JSON um
        const User1Data = await test.json();
        const User1DataJson = {stats: User1Data};

        console.log(User1DataJson);

            //Überprüft ob im Input eine gültige ID eingegeben wurde
            const contentLengthHeader = test.headers.get('content-length');
            const contentLength = contentLengthHeader ? Number(contentLengthHeader) : NaN;
            if(contentLength <= 47){
                return { User1DataJson, success: false, error: true};
            }

        //Gibt die Daten als JSON zurück abrufbar als form
        return { User1DataJson, success: true , error: false}; 
	}
};