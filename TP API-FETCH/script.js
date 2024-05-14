async function obtenerTemperatura(ciudad) {
    const nombreUsuario = 'sistemtc_piriz_gustavo';
    const contraseña = 'y436jDzEX2';
    const url = `https://api.meteomatics.com/${nombreUsuario}:${contraseña}/weather?parameter=temperature_2m&lat=34&lon=-58&validdate=latest&format=json`;

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        const datosClima = await respuesta.json();
        const temperatura = datosClima.data[0].coordinates[0].dates[0].temperature_2m;
        return temperatura;
    } catch (error) {
        console.log(error);
    }
}

const lugaresTuristicos = [
    { nombre: 'Cataratas', imagen: 'img1.jpg' },
    { nombre: 'Perito_Moreno', imagen: 'img2.jpg' },
    { nombre: 'BS_AS', imagen: 'img3.jpg' },
    // Agrega más lugares turísticos si es necesario
];

const contenedorLugares = document.getElementById('lugares-turisticos');

async function cargarLugares() {
    for (const lugar of lugaresTuristicos) {
        const temperatura = await obtenerTemperatura(lugar.nombre);
        contenedorLugares.innerHTML += `
            <div class="col-md-4 imagen-container">
                <img src="${lugar.imagen}" alt="${lugar.nombre}" class="img-fluid">
                <p>Temperatura: ${temperatura}°C</p>
            </div>
        `;
    }
}

cargarLugares();

