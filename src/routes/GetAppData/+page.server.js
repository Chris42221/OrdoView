/** @type {import('./$types').Actions} */
export const actions = {
	//Die Function wird durchs Forum ausgelöst
	default: async ({ request }) => {
		//Nimmt die AppID aus dem Inputfeld von der Gesuchten App in der Suche
		const formData = await request.formData();
		const appID = formData.get("AppID");

		const appdata = await fetch(`https://store.steampowered.com/api/appdetails/?appids=${appID}`);
		if(!appdata.ok){
			throw new Error(`Response status: ${appdata.status}`);
		}

		const AppData = await appdata.json();

		// @ts-ignore	
		const dlcs = AppData[appID].data.dlc;

		//|| dlcs.length >= 0
		const DLCDataArry = [];
		if(dlcs && dlcs.length > 0){
		console.log("-----------------");
		console.log(dlcs.length);
		for(var i = 0; i < dlcs.length; i++){
			const dlcdata = await fetch(`https://store.steampowered.com/api/appdetails/?appids=${dlcs[i]}`);
				if(!dlcdata.ok){
					throw new Error(`Response status: ${dlcdata.status}`);
                }
			const DLCData = await dlcdata.json();
			DLCDataArry.push(DLCData);
		}
		console.log("-----------------");
		console.log(DLCDataArry);
		}


		

		const appinformation = {
			GetAppInformation: AppData,
			GetDLCInformation: DLCDataArry,
		}

		console.log(appinformation);

		return{appinformation,appid: appID , success: true};
	}
};

