const SERVER_URL = "https://olivesigne.com/hiddenpicture";
let username = localStorage.getItem("username");
let map;
let markers = {};

if (username) {
    document.getElementById("usernameForm").style.display = "none";
    initMap();
    setInterval(sendLocation, 10000);
    setInterval(getLocations, 10000);
}

function saveUsername() {
    username = document.getElementById("username").value;
    if (username.trim() !== "") {
        localStorage.setItem("username", username);
        document.getElementById("usernameForm").style.display = "none";
        initMap();
        setInterval(sendLocation, 10000);
        setInterval(getLocations, 10000);
    }
}

function initMap() {
    map = L.map("map").setView([45.0, 5.0], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
}

async function sendLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            console.log(`Envoi: ${latitude}, ${longitude}`);
            
            const response = await fetch(`${SERVER_URL}/update_location`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    latitude,
                    longitude,
                }),
            });
            console.log(await response.json());
        });
    }
}

async function getLocations() {
    const response = await fetch(`${SERVER_URL}/get_locations`);
    const data = await response.json();

    Object.values(markers).forEach((marker) => map.removeLayer(marker));

    data.forEach((user) => {
        const marker = L.marker([user.latitude, user.longitude])
            .addTo(map)
            .bindPopup(user.username);
        markers[user.username] = marker;
    });

    console.log("Localisations mises à jour !");
}
