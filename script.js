
function consultarClima() {

    const ciudad = document.getElementById('ciudad').value;

    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=${API_KEY}`;

    fetch(url)
    .then(response => response.ok ?  response.json(): Promise.reject(response))
    .then(response =>{
        gradosCelsius = response.main.temp - 273.15
        const cuerpoTablaClima = document.createElement("tr");
        cuerpoTablaClima.innerHTML= `<td>${ciudad}</td><td>${gradosCelsius.toFixed(2)}C°</td><td>${response.weather[0].description}</td>`
        console.log(response)
        document.getElementById("cuerpo-tabla").appendChild(cuerpoTablaClima)
    })
    .catch(error => console.log('Error al consultar el clima', error)) 
    
}


const consultarClimas = () =>{
    const ciudades = document.getElementById('ciudades').value.split(',').map(ciudad => ciudad.trim());

    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65';

    
    Promise.all(ciudades.map(ciudad => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=${API_KEY}`;
        return fetch(url).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la respuesta de la API');
          }
        });
      }))
      .then(response => {
        // Mostrar resultados en la tabla
        const cuerpoTablaClima = document.getElementById("cuerpo-tabla");
        
        response.forEach(response => {
            gradosCelsius = response.main.temp - 273.15
          cuerpoTablaClima.appendChild(document.createElement("tr")).innerHTML=`<td>${response.name}</td><td>${gradosCelsius.toFixed(2)}C°</td><td>${response.weather[0].description}</td>`;
        });
      })
      .catch(error => {
        console.error('Error al consultar el clima', error);
      });
    }
  
    function limpiarTabla() {
      const tabla = document.getElementsByTagName('tbody');
      for(let i = 0; i<tabla.length; i++)
      {
          tabla[i].innerHTML = "";
      }
}






