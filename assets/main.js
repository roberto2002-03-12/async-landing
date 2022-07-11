const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCW620WgcVunpJuh2ROAAj5w&part=snippet%2Cid&order=date&maxResults=50';

//esto sirve para indicar donde se van a insertar los datos
const content = null || document.getElementById('content');

//obtener credenciales y definir metodo para utilizar la api
const options = {
    method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5d1bcab3e0mshaf15f4ee483df38p1d7b46jsn18b643f55a97',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

//función de obtener data dependiendo de la url de api
async function fetchData(urlApi) {
    //declarar la URL de la api en la función y las opciones
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}
// syntaxis para hacer una función que se ejecute sola sin llamarla
/*
(() => {

})();
*/

(async () => {
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `
        <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
        `).slice(0, 8).join('')}
        `;
        //declarar la vista en el html
        content.innerHTML = view;
        // .slice(0, 4).join('') con esto colocamos un maximo de videos
    } catch {
        let view = `
        <div class="group relative">
            <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="/src/img/error.png" alt="sucedio un error" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    sucedio un error
                </h3>
            </div>
        </div>
        `;

        content.innerHTML = view;
    }
})();