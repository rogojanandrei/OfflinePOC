(function () {
    "use strict";

    angular
        .module("offline.chart",
            [
                "pascalprecht.translate", "angular-template-cache-resolver"
                //,"angularUtils.directives.dirPagination"
            ])
        .config(configModule);

    configModule.$inject = [
        "$translateProvider",
        "cacheResolverProvider"
    ];

    function configModule($translateProvider, cacheResolverProvider) {

        resolveCache();

        function resolveCache() {
            cacheResolverProvider.setContains("Scripts/app/components");
        }
    }

})();
