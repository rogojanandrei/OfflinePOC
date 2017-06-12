$(document).ready(function () {
    updateUIStatus(navigator.onLine);
    getData();
});

window.addEventListener("offline",
    function(e) {
        updateUIStatus(false);
    },
    false);

window.addEventListener("online",
    function(e) {
        updateUIStatus(true);
    },
    false);

function updateUIStatus(online) {
    var img = document.getElementById("logo");

    if (online) {
        img.setAttribute("src", img.getAttribute("data-online"));
        
    } else
        img.setAttribute("src", img.getAttribute("data-offline"));
}

function getData() {
    if (localStorage.getItem("data") !== undefined ||
           localStorage.getItem("data") !== null) {
        //ajax call
        var data = [{ name: "Guatemala", percentage: 36 },
                    { name: "Kenia", percentage: 50 },
                    { name: "Ethiopia", percentage: 80 }];
        localStorage.setItem("data", JSON.stringify(data));
    }
}

function bindChart() {
    
}