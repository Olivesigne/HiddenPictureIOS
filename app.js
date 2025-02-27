let map = L.map('map').setView([45, 4], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

function sendLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            L.marker([lat, lon]).addTo(map).bindPopup("Tu es ici").openPopup();

            let response = await fetch("https://hiddenpicture.olivesigne.com/update_location", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    latitude: lat,
                    longitude: lon,
                    username: "ton_username"
                })
            });

            let result = await response.json();
            alert(result.response);
        });
    } else {
        alert("La géolocalisation n'est pas supportée");
    }
}
