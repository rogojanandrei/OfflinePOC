window.addEventListener('offline',
    function (e) {
        document.getElementById("logo").setAttribute("src", "/TestManifest/Content/images/logo_offline.png");
    },
    false);

window.addEventListener('online',
    function (e) {
        document.getElementById("logo").setAttribute("src", "/TestManifest/Content/images/logo_online.png");
    },
    false);
