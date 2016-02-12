(function (ng) {
    ng.module("nazarii.filebrowser", ["ngRoute"])
        .controller("empty", function () { })
        .directive("nazariiFileBrowser", Nazarii.FileBrowser.Directives.fileBrowserDirective)
        .service("FileService", Nazarii.FileBrowser.Services.DefaultFileService);
})(angular);
