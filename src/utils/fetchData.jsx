export const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '584cceb2a3msh2a45aebf78a8b5ap1f311ajsn84e757754edd',
		'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
	}
};

export const fetchData= async (url,options)=>{
    const response = await fetch(url,options);
    console.log(response.status);
    const data = response.json();
    return data;
}