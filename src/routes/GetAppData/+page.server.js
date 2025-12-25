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

		const appinformation = {
			GetAppInformation: AppData
		}

		console.log(appinformation);

		return{appinformation,appid: appID , success: true};
	}
};

