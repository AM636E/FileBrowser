var Nazarii;
(function (Nazarii) {
    var FileBrowser;
    (function (FileBrowser) {
        var Services;
        (function (Services) {
            var DefaultFileService = (function () {
                function DefaultFileService($http, $q) {
                    this.$http = $http;
                    this.$q = $q;
                }
                DefaultFileService.prototype.getDirectoryInfo = function (path) {
                    var d = this.$q.defer();
                    this.$http.get("api/file/info?path=" + path)
                        .then(function (a) { return d.resolve(a.data); }, function (e) { return d.reject(e); });
                    return d.promise;
                };
                DefaultFileService.prototype.getDirectory = function (path) {
                    var d = this.$q.defer();
                    this.$http.get("api/file/get?path=" + path)
                        .then(function (a) { return d.resolve(a.data); }, function (e) { return d.reject(e); });
                    return d.promise;
                };
                DefaultFileService.$inject = ["$http", "$q"];
                return DefaultFileService;
            })();
            Services.DefaultFileService = DefaultFileService;
        })(Services = FileBrowser.Services || (FileBrowser.Services = {}));
    })(FileBrowser = Nazarii.FileBrowser || (Nazarii.FileBrowser = {}));
})(Nazarii || (Nazarii = {}));
