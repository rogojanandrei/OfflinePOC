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