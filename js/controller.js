/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller('CarouselCtrl', ['$scope', 'webService',
    function ($scope, webService) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 1;
        //$scope.slides = [];
        var currIndex = 0;
//        slides.push({
//            image: 'images/cStore.jpg',
//            text: 'C-Store',
//            id: currIndex++
//        });
//        slides.push({
//            image: 'images/construction.jpg',
//            text: 'Gas Station Construction',
//            id: currIndex++
//        });
//        slides.push({
//            image: 'images/VIKING.jpg',
//            text: 'Gas Station Operation',
//            id: currIndex++
//        });
        $scope.slides = [];
        webService.getCarousalImages().then(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                $scope.slides.push({
                    image: 'https://karholdings.ca/carousalImages/' + res.data[i].FILE_NME,
                    text: res.data[i].FILE_DESC,
                    id: res.data[i].CAROUSAL_ATTACHMENT_ID,
                    active: 1
                });
            }
        });
    }]);
app.controller('topMenuController', function ($scope) {
    $scope.activeClass = 'Home';
    $scope.setActiveClass = function (link) {
        $scope.activeClass = link;
    };
});
app.controller('HomeController', function ($scope) {
    
    $scope.text = "Home";
    $scope.clas = 'row hide';
    $scope.lineInView = function ($el) {
        if ($el) {
            $scope.clas = 'row animated fadeInDown';
        } else {
            $scope.clas = 'row hide';
        }
    };

    $scope.servicesCls = 'row ';
    $scope.applyServiceAnimation = function ($el) {
        if ($el) {
            $scope.servicesCls = 'row animated fadeIn';
        } else {
            $scope.servicesCls = 'row hide';
        }
    };
});





app.controller('ProfileController', ['$scope', '$location', 'webService', '$sce',
    function ($scope, $location, webService, $sce) {
        $scope.go = function (url) {
            $location.path(url);
        };
        webService.getProfileText().then(function (res) {
            $scope.profileText = $sce.trustAsHtml(res.data.PROFILE_TXT);
            $scope.clas = 'lead animated fadeIn';
        });
        $scope.isCollapsed = true;
        webService.getWebSections().then(function (res) {
            var sections = [];
            webService.getProfiles().then(function (prof) {
                for (var i = 0; i < res.data.length; i++) {
                    var subArr = [];
                    for (var j = 0; j < prof.data.length; j++) {
                        if (prof.data[j].SECTION_TITLE === res.data[i].TITLE) {
                            subArr.push({PERSON_NME: prof.data[j].PERSON_NME, EMAIL: prof.data[j].EMAIL,
                                CONTACT_NO: prof.data[j].CONTACT_NO, DESIGNATION: prof.data[j].DESIGNATION, PROFILE_PIC: prof.data[j].PROFILE_PIC
                                , WEB_PROFILE_ID: prof.data[j].WEB_PROFILE_ID, DESCRIPTION: prof.data[j].DESCRIPTION});
                        }
                    }
                    var obj = {TITLE: res.data[i].TITLE, profiles: subArr};
                    sections.push(obj);
                }
                $scope.data = sections;
            });
        });
    }]);

app.controller('NetworkController', ['$scope', '$location', 'webService', 'uiGmapGoogleMapApi',
    function ($scope, $location, webService, GoogleMapApi) {
        $scope.go = function (url) {
            $location.path(url);
        };
//        GoogleMapApi.then(function (maps) {
//            maps.visualRefresh = true;
//        });
        $scope.markers = [];

        $scope.marker = {
            id: 0,
            coords: {
                latitude: 53.4303002,
                longitude: -113.4736503
            }, show: false,
            options: {
                draggable: false,
                title: 'Head Office, KAR HOLDINGS. 2415 ELLWOOD DRIVE EDMONTON, ALBETA'
            }
        };


        webService.getSites().then(function (res) {
            $scope.sites = res.data;
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].SITE_COORDINATES !== '') {
                    var arr = res.data[i].SITE_COORDINATES.split(',');
                    var ret = {
                        latitude: arr[0],
                        longitude: arr[1],
                        title: res.data[i].SITE_NME,
                        icon: res.data[i].SITE_NME === 'EDMONTON OFFICE 105' ? 'images/blue_marker.png' : null,
                        id: 'm' + i,
                        options: {
                            title: res.data[i].SITE_NME === 'EDMONTON OFFICE 105' ? 'Head Office' : res.data[i].SITE_NME
                                    //animation: google.maps.Animation.BOUNCE
                        },
                        events: {
                            click: function (marker, eventName, model, arguments) {
                                $scope.map.window.model = model;
                                $scope.map.window.show = true;
                                $scope.map.window.options.content = '<div class="text-center"><img  src="images/icon.png" width="30" height="30" alt="KAR Holdings">&nbsp;<h5>' + marker.title + '</h5></div>';
                            }
                        }
                    };
                    $scope.markers.push(ret);
                }
            }
        });
        $scope.map = {
            center: {
                latitude: 53.9340789,
                longitude: -100.7248796
            }, pan: true,
            zoom: 4,
            bounds: {},
            window: {
                marker: {},
                show: false,
                closeClick: function () {
                    this.show = false;
                },
                options: {content: ''} // define when map is ready
            }
        };
        $scope.options = {
            scrollwheel: true
        };
    }]);

app.controller('ContactController', ['$scope', 'uiGmapGoogleMapApi', 'webService',
    function ($scope, GoogleMapApi, webService) {
        $scope.map = {center: {latitude: 53.4303002, longitude: -113.4736503}, zoom: 16};
        $scope.marker = {};
        GoogleMapApi.then(function (maps) {
            $scope.marker = {
                id: 100,
                coords: {
                    latitude: 53.4303002,
                    longitude: -113.4736503
                },
                options: {
                    draggable: false,
                    title: 'Head Office, KAR HOLDINGS. 2415 ELLWOOD DRIVE EDMONTON, ALBETA'
                }
            };
            var innerHtm = '<h5>HEAD OFFICE</h5><p class="lead">KAR HOLDINGS</p><p class="text-info">2415 ELLWOOD DRIVE<br/>EDMONTON,ALBETA<br/>T6X 0J6 CANADA</p><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span> 780-485-0055<br/><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> <a href="mailto:#">karedmonton@karholdings.ca</a><br/><span class="glyphicon glyphicon-globe" aria-hidden="true"></span> <a href="http://www.karholdings.ca">www.karholdings.ca</a>';
            $scope.windowOptions = {
                visible: false,
                forceClick: true,
                content: innerHtm
            };

            $scope.closeClick = function () {
                $scope.windowOptions.visible = false;
            };

            $scope.title = "Head Office, KAR HOLDINGS. 2415 ELLWOOD DRIVE EDMONTON, ALBETA";

            maps.visualRefresh = true;
        });
        $scope.contact = {senderName: '', senderEmail: '', senderText: ''};
        $scope.alert = {type: 'success', msg: 'your Message sent successfully.', show: false};
        $scope.closeAlert = function () {
            $scope.alert = {type: 'success', msg: 'your Message sent successfully.', show: false};
        };
        $scope.sentContactEmail = function (contact) {
            if (contact.senderName !== '' && contact.senderEmail !== '' && contact.senderText !== '') {
                webService.sendEmail(contact.senderName, contact.senderEmail, contact.senderText).then(function (res) {
                    if (res.data.msg === 'sent') {
                        $scope.alert = {type: 'success', msg: 'your Message sent successfully.', show: true};
                    } else {
                        $scope.alert = {type: 'danger', msg: 'Your Message did not sent. Please check your email address and try again.', show: true};
                    }
                });
            } else {
                $scope.alert = {type: 'warn', msg: 'Please fill all fields and than try again.', show: true};
            }
        };
    }]);
