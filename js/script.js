(function () {
    //Submit Button Event Handler
    $("#submit").click(function() {
        //Get the value of the user has entered in the search bar and store it
        const searchLocation = $("#searchBar").val();
        //Call the geocode function and pass in the value
        geocode(searchLocation);
        //Clear out the search bar
        $("#searchBar").val("");
    });
})();

//Function to connect to the Dark Sky API and get weather data
function getWeatherInfo(latitude, longitude, city, state) {
    //https://api.darksky.net/forecast/b70ee804cdb8e47bdd3db974fe7de27e/37.8267,-122.4233
    //Base-URL/APIKey/Latitude, Longitude

    $.ajax("https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude + "," + longitude, { dataType: "jsonp"})
    .done(function(data) {
        console.log(data);

        //See if you can get the following data from the JSON

        //1. Get the current temperature
        
        //2. Get the probability of precipitation

        //3. Get the high and low temp for the current day (first element in the data array in the daily object)

    })
    .fail(function(error) {
        console.log(error);
    })
    .always(function() {
        console.log("Weather call complete!")
    })
}

//Function to connect to the MapQuest Geocoding API and get geocoding data
function geocode(location) {
    //Base-URL + APIkey + &location= + Address
    $.ajax("http://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + location)
    .done(function(data) {
        //Get the lat and lng from the response
        let locations = data.results[0].locations[0];

        let lat = locations.latLng.lat;
        let lng = locations.latLng.lng;

        //get the city and state so we can display
        let city = locations.adminArea5;
        let state = locations.adminArea3;

        //Pass the lat and lng to our getWeatherInfo function
        getWeatherInfo(lat, lng, city, state);

    })
    .fail(function(error) {
        console.log(error);
    })
    .always(function() {
        console.log("Geocoding call finished");
    })
}