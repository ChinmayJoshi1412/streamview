export const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
		'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST
	}
};

export const fetchData= async (url,options)=>{
    const response = await fetch(url,options);
    console.log(response.status);
    const data = response.json();
    return data;
}