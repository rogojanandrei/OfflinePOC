window.addEventListener("offline",
    function(e) {
        var img = document.getElementById("logo");
        img.setAttribute("src", img.getAttribute("data-offline"));
    },
    false);

window.addEventListener("online",
    function(e) {
        var img = document.getElementById("logo");
        img.setAttribute("src", img.getAttribute("data-online"));
    },
    false);