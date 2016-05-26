/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.factory('webService', ['$http', '$httpParamSerializer', '$filter', function ($http, $httpParamSerializer, $filter) {

        function getWebSections() {
            $http.defaults.useXDomain = true;
            var promise = $http({
                method: 'GET',
                url: 'http://karholdings.ca/karmobile/web.htm?action=getWebSections'
            });
            return promise;
        }
        function getProfiles() {
            $http.defaults.useXDomain = true;
            var promise = $http({
                method: 'GET',
                url: 'http://karholdings.ca/karmobile/web.htm?action=getProfiles'
            });
            return promise;
        }
        function getProfileText() {
            $http.defaults.useXDomain = true;
            var promise = $http({
                method: 'GET',
                url: 'http://karholdings.ca/karmobile/web.htm?action=getProfileText'
            });
            return promise;
        }
        function getSites() {
            $http.defaults.useXDomain = true;
            var promise = $http({
                method: 'GET',
                url: 'http://karholdings.ca/karmobile/web.htm?action=getSites'
            });
            return promise;
        }
        return {
            getWebSections: getWebSections,
            getProfiles: getProfiles,
            getProfileText: getProfileText,
            getSites: getSites
        };
    }]);

