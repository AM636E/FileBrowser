module Nazarii.FileBrowser.Services {
    export interface IDirectoryInfo {
        smallDirectories: number;
        middleDirectories: number;
        largeDirectories: number;
    }

    export interface IDirectory {
        name: string;
        children?: IDirectory[];
    }

    export interface IFileService {
        getDirectoryInfo(path: string): angular.IPromise<IDirectoryInfo>;
        getDirectory(path: string): angular.IPromise<IDirectory>;
    }

    export class DefaultFileService implements IFileService {
        private $http: angular.IHttpService;
        private $q: angular.IQService;
        static $inject = ["$http", "$q"];
        constructor($http: angular.IHttpService, $q: angular.IQService) {
            this.$http = $http;
            this.$q = $q;
        }

        getDirectoryInfo(path: string): angular.IPromise<IDirectoryInfo> {
            var d = this.$q.defer();
            this.$http.get<IDirectory>(`api/file/info?path=${path}`)
                .then(a => d.resolve(a.data), e => d.reject(e));

            return d.promise;
        }

        getDirectory(path: string): angular.IPromise<IDirectory> {
            var d = this.$q.defer();
            this.$http.get<IDirectory>(`api/file/get?path=${path}`)
                .then(a => d.resolve(a.data), e => d.reject(e));

            return d.promise;
        }
    }
}