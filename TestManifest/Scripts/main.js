window.addEventListener('offline',
    function (e) {
        document.getElementById("logo").setAttribute("src", "/Content/images/logo_offline.png");
    },
    false);

window.addEventListener('online',
    function (e) {
        document.getElementById("logo").setAttribute("src", "/Content/images/logo_online.png");
        if (localStorage.getItem("data") !== undefined || 
            localStorage.getItem("data") !== null) {
            //ajax call
            var data = [{ name: "Guatemala", percentage: 36 },
                        { name: "Kenia", percentage: 50 },
                        { name: "Ethiopia", percentage: 80 }];
            localStorage.setItem("data", JSON.stringify(data));
        }
    },
    false);
