/** @satisfies {import('./$types').Actions} */
export const actions = {
	searchapps: async (event) => {
		const form = await event.request.formData();
    const appname = form.get("AppName")?.toString();

    console.log(appname);

    const appnameconverted = appname?.replace(" ", "%20");

    const getapp = await fetch(`https://store.steampowered.com/api/appdetails/?appids=${appnameconverted}`);
    if(!getapp.ok){
      throw new Error(`Response status: ${getapp.status}`);
    }

    const GetAppResults= await getapp.json();
    console.log(GetAppResults);

    const AppSearchResults = {
      getappresults: GetAppResults
    }

    return{AppSearchResults, success: true,};
	}
};