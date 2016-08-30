app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    // Now set up the states
    $stateProvider
            .state('home', {
                url: "/",
                cache: false,
                templateUrl: "pages/home.html"
            })
            .state('about', {
                url: "/about",
                cache: false,
                templateUrl: "pages/about.html",
                controller: 'ProfileController'
            })
            .state('contact', {
                url: "/contact",
                cache: false,
                templateUrl: "pages/contact.html",
                controller: "ContactController"
            })
            .state('construction', {
                url: "/construction",
                cache: false,
                templateUrl: "pages/construction.html"
            })
            .state('network', {
                url: "/network",
                cache: false,
                templateUrl: "pages/network.html",
                controller: "NetworkController"
            })
            .state('services', {
                url: "/services",
                cache: false,
                templateUrl: "pages/services.html"
            })
            .state('businessPartners', {
                url: "/businessPartners",
                cache: false,
                templateUrl: "pages/businessPartners.html",
                controller: "BusinessPartnerController"
            })

            ;
});
