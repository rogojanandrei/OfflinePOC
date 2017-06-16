(function () {

    // 'global' variable to store reference to the database
    var db;
    var dbName = "offlineDb";
    databaseOpen(function () {
        alert("The database has been opened");
    });

    function databaseOpen(callback) {
        // Open a database, specify the name and version
        var version = 1;
        var request = indexedDB.open(dbName, version);

        request.onsuccess = function (e) {
            db = e.target.result;
            callback();
        };
        request.onerror = databaseError;
    }

    function databaseError(e) {
        console.error('An IndexedDB error has occurred', e);
    }

}());