import {KEY} from "$env/static/private"
/** @satisfies {import('./$types').Actions} */

export const actions = {
	default: async (event) => {

        let User1DataJson;

        //Übernimmt die Angaben aus dem Input
        const form = await event.request.formData();
        const steamid1 = form.get("steamid1")

        //Stellt die Anfrage an Steam
		const steamid1data = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${KEY}&steamids=${steamid1}`);
        if(!steamid1data.ok){
            throw new Error(`Response status: ${steamid1data.status}`);
        };

        const steamid1level = await fetch(`http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${KEY}&steamid=${steamid1}`);
        if(!steamid1level.ok){
            return { User1DataJson, success: false, error: true};
            throw new Error(`Response status: ${steamid1level.status}`);
        }

        const steamid1friendlist = await fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${KEY}&steamid=${steamid1}`)
        if(!steamid1friendlist.ok){
            return { User1DataJson, success: false, error: true};
            throw new Error(`Response status: ${steamid1friendlist.status}`)
        }

        //Wandelt die Daten in JSON um
        const User1Data = await steamid1data.json();
        const User1Level = await steamid1level.json();
        const User1FriendList = await steamid1friendlist.json();

            //Gibt für jeden Freund in der FreundesListe die Daten aus
            const User1FreindsDataArray = [];
            for (let index = 0; index < User1FriendList.friendslist.friends.length; index++) {
                const friend = User1FriendList.friendslist.friends[index].steamid;
                const steamid1friendsdata = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${KEY}&steamids=${friend}`);
                if(!steamid1friendsdata.ok){
                    throw new Error(`Response status: ${steamid1friendsdata.status}`);
                }

                const User1FreindsData = await steamid1friendsdata.json();
                User1FreindsDataArray.push(User1FreindsData);
            }
            console.log(User1FreindsDataArray);
            console.log(User1FreindsDataArray.length);


        User1DataJson = { stats: User1Data, level: User1Level, friendlist: User1FriendList, friendsdata: User1FreindsDataArray};


        console.log(User1DataJson);

            //Überprüft ob im Input eine gültige ID eingegeben wurde
            const contentLengthHeader = steamid1data.headers.get('content-length');
            const contentLength = contentLengthHeader ? Number(contentLengthHeader) : NaN;
            if(contentLength <= 47){
                return { User1DataJson, success: false, error: true};
            }

        //Gibt die Daten als JSON zurück abrufbar als form
        return { User1DataJson, success: true , error: false}; 
	}
};