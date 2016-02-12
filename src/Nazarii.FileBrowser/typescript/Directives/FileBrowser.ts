/// <reference path="../tstypings/angular.d.ts" />
/// <reference path="../services/fileservice.ts" />
module Nazarii.FileBrowser.Directives {
    import FileService = Nazarii.FileBrowser.Services.IFileService;

    export function fileBrowserDirective($location: angular.ILocationService, $timeout: angular.ITimeoutService, fileService: FileService): angular.IDirective {
        return {
            restrict: "E",
            templateUrl: "index.tpl.html",
            link($scope: any) {
                const createReadablePath = (path) => {
                    var s = path.replace("/root/", "");
                    return `${s.slice(0, 1).toUpperCase()}:${s.slice(1)}`.replace(/\//g, "\\");
                };

                $scope.$on("$locationChangeSuccess", () => {
                    $scope.update();
                });

                $scope.moveUp = () => {
                    var loc = $location.path().split("/");
                    // Remove two last characters from path.
                    loc.pop(); loc.pop();
                    $location.path(loc.join("/"));
                }

                var setError = e => {
                    $scope.error = e;
                    $timeout(() => $scope.error = null, 2000);
                }

                $scope.update = () => {
                    var path = $location.path() || "./";
                    $scope.directoryInfo = null;
                    fileService.getDirectory(path)
                        .then(a => {
                            $scope.directory = a;
                            $scope.readablePath = createReadablePath($scope.directory.fullPath);
                            $location.path($scope.directory.fullPath);
                        }, setError);

                    fileService.getDirectoryInfo(path)
                        .then(a => {
                            $scope.directoryInfo = a;
                            $scope.error = null;
                        }, setError);
                }
                $scope.update();
            }
        };
    }

    fileBrowserDirective.$inject = ["$location", "$timeout", "FileService"];
}