﻿(ng => {
    ng.module("nazarii.filebrowser", ["ngRoute", "angular-loading-bar"])
        .controller("empty", () => { })
        .directive("nazariiFileBrowser", Nazarii.FileBrowser.Directives.fileBrowserDirective)
        .service("FileService", Nazarii.FileBrowser.Services.DefaultFileService);
})(angular);