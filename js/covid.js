window.onload = iniciar;

function iniciar(){
    let boton = document.getElementById('btnCargar');
    boton.addEventListener('click', clickBoton)
}

async function cargarUrl(url){
    let response = await fetch(url)
    return response.json()
}

async function clickBoton(){
    let pais = document.getElementById('selectPais').value;
    let fecha = document.getElementById('inputFecha').value;

    if(!fecha){
        fecha = new Date()
        var dd = String(fecha.getDate()).padStart(2, '0');
        var mm = String(fecha.getMonth() + 1).padStart(2, '0');
        var yyyy = fecha.getFullYear();
        fecha = yyyy + '-' + mm + '-' + dd;
    }

    let json = await cargarUrl(`https://api.covid19tracking.narrativa.com/api/${fecha}/country/${pais}`)
    let estadisticas = json.dates[fecha].countries[pais]
    
    let confirmados = String(estadisticas.today_confirmed).replace(/(.)(?=(\d{3})+$)/g,'$1,')
    let hoy = String(estadisticas.today_new_confirmed).replace(/(.)(?=(\d{3})+$)/g,'$1,')

    document.getElementById('today_confirmed').innerHTML = confirmados
    document.getElementById('today_deaths').innerHTML = estadisticas.today_deaths
    document.getElementById('today_hospitalised_patients_with_symptoms').innerHTML = estadisticas.today_hospitalised_patients_with_symptoms
    document.getElementById('today_intensive_care').innerHTML = estadisticas.today_intensive_care
    document.getElementById('today_new_confirmed').innerHTML = hoy
    document.getElementById('today_new_deaths').innerHTML = estadisticas.today_new_deaths
    document.getElementById('today_new_hospitalised_patients_with_symptoms').innerHTML = estadisticas.today_new_hospitalised_patients_with_symptoms
    document.getElementById('today_new_intensive_care').innerHTML = estadisticas.today_new_intensive_care
    document.getElementById('today_new_open_cases').innerHTML = estadisticas.today_new_open_cases
    document.getElementById('today_new_recovered').innerHTML = estadisticas.today_new_recovered
    document.getElementById('today_new_total_hospitalised_patients').innerHTML = estadisticas.today_new_total_hospitalised_patients
}