 function meteo(){
        let request = new XMLHttpRequest();
           
        ville = "https://www.prevision-meteo.ch/services/json/" + document.getElementById("laVille").value;

        let ul = document.querySelector('ul');

        console.log(ville)

        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                let response = JSON.parse(this.responseText);
                console.log(response.city_info.name);
                let lat = response.city_info.latitude
                let lon = response.city_info.longitude
                ul.innerHTML=`<li>Ville : ${response.city_info.name}</li>
                            <li>Pays : ${response.city_info.country}</li>
                            <li>Date : ${response.current_condition.date}</li>
                            <li>Heure : ${response.current_condition.hour}</li>
                            <li>Temperature : ${response.current_condition.tmp}°C <img src=${response.current_condition.icon} alt=${response.current_condition.condition_key}></li> `

                            map = new google.maps.Map(document.getElementById("map_id"), {
                                zoom: 12,
                                center: new google.maps.LatLng(Number(lat), Number(lon)),
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                                });
            }
        }
    request.open("GET", ville, true)
    request.send()
}
