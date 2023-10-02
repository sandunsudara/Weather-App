let lat = "";
let lng = "";
var map = "";
let tempLocation = "";
let forecast = "";




function firstLoad() {
    navigator.geolocation.getCurrentPosition(success, error);
    function success(pos) {
        console.log(pos.coords);
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        btnFindAction(lat, lng);
    }
    function error(err) {
        if (err.code === 1) {
            alert("Please allow location access");
        }
        else {
            alert("cannot get current location");
        }
    }
    const flexSwitchCheckDefault=$("#flexSwitchCheckDefault");
    console.log(flexSwitchCheckDefault);
}

function removeElments() {
    const remove = $(".forecast");
    remove.remove();
}

function getForecast() {
    console.log(tempLocation);
    forecast = $("#nextForecast");
    $.ajax({
        method: "GET",
        url: "https://api.weatherapi.com/v1/forecast.json?key=737aa0e9159b46fba87151915232509&q=" + tempLocation + "&days=5",
        success: (resp) => {
            console.log(resp);
            resp.forecast.forecastday.forEach(element => {
                forecast.append(`
            <div class="forecast">
            <div class="date">
        <p>`+ element.date + `</p>
      </div>
      <hr>
      <div class="forecastData">
        <table>
          <tr>
            <td>Avg Temperature</td>
            <td>&ensp;:&ensp;</td>
            <td>`+ element.day.avgtemp_c + `</td>
          </tr>
  
          <tr>
            <td>Avg Humidity</td>
            <td>&ensp;:&ensp;</td>
            <td>`+ element.day.avghumidity + `</td>
          </tr>
  
          <tr >
            <td>Max wind speed</td>
            <td>&ensp;:&ensp;</td>
            <td>`+ element.day.maxwind_mph + `</td>
          </tr>
          <tr>
            <td>UV</td>
            <td>&ensp;:&ensp;</td>
            <td>`+ element.day.uv + `</td>
          </tr>
        </table>
      </div>
      <div id="imageF"><img src="`+ element.day.condition.icon + `" style=\"width: 125px; height: 125px;\"></div></div>`);
            });



        }
    });

}


function btnFindAction(lat, lng) {
    let location = $("#serachFiled").val();
    const locationName = $("#locationName");
    const temp = $("#temp");
    const humidity = $("#humidity");
    const pressure = $("#pressure");
    const windSpeed = $("#speed");
    const cloud = $("#cloud");
    const uv = $("#uv");
    const lastUT = $("#lastUT");
    console.log(locationName.text);
    if (location == "") {
        location = lat + "," + lng;
    }
    tempLocation = location;
    $.ajax({
        method: "GET",
        url: "https://api.weatherapi.com/v1/current.json?key=737aa0e9159b46fba87151915232509&q=" + location,
        success: (resp) => {
            console.log(resp);
            locationName.text(resp.location.name);
            temp.text(resp.current.temp_c + "°C");
            humidity.text(resp.current.humidity + "%");
            pressure.text(resp.current.pressure_mb + "mb");
            windSpeed.text(resp.current.wind_kph + "kph");
            uv.text(resp.current.uv);
            cloud.text(resp.current.cloud);
            lastUT.text("Last Update : " + resp.current.last_updated);
            lat = resp.location.lat;
            lng = resp.location.lon;
            setLocationInMap(lat, lng);
        }

    });
    const flexSwitchCheckDefault=$("#flexSwitchCheckDefault");
    console.log(flexSwitchCheckDefault);
    removeElments();
    getForecast();
}

function setLocationInMap(lat, ing) {
    if (map) {
        map.off();
        map.remove();
    }
    map = L.map('map').setView([lat, ing], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const marker = L.marker([lat, ing]).addTo(map);
    marker.setLatLng([lat, ing]).update();
    map.setView([lat, ing]);
}

