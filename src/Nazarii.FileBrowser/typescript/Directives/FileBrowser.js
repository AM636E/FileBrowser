/// <reference path="../tstypings/angular.d.ts" />
/// <reference path="../services/fileservice.ts" />
var Nazarii;
(function (Nazarii) {
    var FileBrowser;
    (function (FileBrowser) {
        var Directives;
        (function (Directives) {
            function fileBrowserDirective($location, $timeout, fileService) {
                return {
                    restrict: "E",
                    templateUrl: "index.tpl.html",
                    link: function ($scope) {
                        var createReadablePath = function (path) {
                            var s = path.replace("/root/", "");
                            return (s.slice(0, 1).toUpperCase() + ":" + s.slice(1)).replace(/\//g, "\\");
                        };
                        $scope.$on("$locationChangeSuccess", function () {
                            $scope.update();
                        });
                        $scope.moveUp = function () {
                            var loc = $location.path().split("/");
                            // Remove two last characters from path.
                            loc.pop();
                            loc.pop();
                            $location.path(loc.join("/"));
                        };
                        var setError = function (e) {
                            $scope.error = e;
                            $timeout(function () { return $scope.error = null; }, 2000);
                        };
                        $scope.update = function () {
                            var path = $location.path() || "./";
                            $scope.directoryInfo = null;
                            fileService.getDirectory(path)
                                .then(function (a) {
                                $scope.directory = a;
                                $scope.readablePath = createReadablePath($scope.directory.fullPath);
                                $location.path($scope.directory.fullPath);
                            }, setError);
                            fileService.getDirectoryInfo(path)
                                .then(function (a) {
                                $scope.directoryInfo = a;
                                $scope.error = null;
                            }, setError);
                        };
                        $scope.update();
                    }
                };
            }
            Directives.fileBrowserDirective = fileBrowserDirective;
            fileBrowserDirective.$inject = ["$location", "$timeout", "FileService"];
        })(Directives = FileBrowser.Directives || (FileBrowser.Directives = {}));
    })(FileBrowser = Nazarii.FileBrowser || (Nazarii.FileBrowser = {}));
})(Nazarii || (Nazarii = {}));
