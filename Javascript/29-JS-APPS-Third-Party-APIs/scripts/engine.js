define(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyABndy6yDZMbQOxz1QibrPstN6MV3mTXuk', 'jquery'], function () {

    function updateUI(city) {
        var cityListRoot = document.getElementById('cityList');
        var newLiElement = document.createElement('li');

        newLiElement.innerHTML = city.results[0].formatted_address + ' <br/>' +
            '<span class="details">Latitude: ' + city.results[0].geometry.location.lat + ' | Longitude: ' + city.results[0].geometry.location.lng + '<span>';
        newLiElement.addEventListener('click', function () {
            // TODO: Do more stuff here
            console.log('city clicked');
            var pos = new google.maps.LatLng(x, y);
            this.map
        });

        cityListRoot.appendChild(newLiElement);
    }

    function initCityInput() {
        var addCityBtn = document.getElementById('addCityBtn');
        var selfEngine = this;
        addCityBtn.addEventListener('click', function () {
            var cityInputValue = document.getElementById('cityInput').value;
            selfEngine.addCity(cityInputValue);
            console.log('Btn clicked');
        });
    }
    
    var Engine = (function () {
        function Engine() {
            this.map;
            this.cities = [];
        }

        Engine.prototype = {
            init: function () {
                var mapOptions = {
                    center: new google.maps.LatLng(42.7000, 23.3333),
                    zoom: 6
                };
                this.map = new google.maps.Map(document.getElementById("mapRoot"), mapOptions);
                google.maps.event.addDomListener(window, 'load', this.init);
                initCityInput.call(this, '');
                return this;
            },
            addCity: function (city) {
                var selfEngine = this;
                $.getJSON( "https://maps.googleapis.com/maps/api/geocode/json?address="+city, function( data ) {
                    if(data.status === "OK"){
                        selfEngine.cities.push(data);
                        updateUI(data);
                        console.log(data);
                    }
                });
            }
        };

        return Engine
    }());
    return Engine
});