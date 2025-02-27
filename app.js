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

            let response = await fetch("https://30775bf6-aed9-4d20-807e-1f4d00170c25-00-1m8w4x9z10ikb.riker.replit.dev/update_location", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    latitude: lat,
                    longitude: lon,
                    username: "nico"
                })
            });

            let result = await response.json();
            alert(result.response);
        });
    } else {
        alert("La géolocalisation n'est pas supportée");
    }
}
