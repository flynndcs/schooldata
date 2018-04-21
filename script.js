var geocoder;
var map;

var submitButton = document.getElementById("main-button");

function initMap() {
	var centerTexas = {lat: 31.504, lng: -99.127};
	var map = new google.maps.Map(document.getElementById("content"), {
		zoom: 5,
		center: centerTexas
	});
	
	geocodeData(geocoder, map);

}

function geocodeData(geocoder, resultsMap) {
	var jsonData;
	geocoder = new google.maps.Geocoder();
	fetch('https://api.myjson.com/bins/goowz')
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			jsonData = json;
			
			
		})
		.then(function(){
			submitButton.addEventListener('click', function(){
				var address;
				for (var i = 0; i < jsonData.length; i++) {
					address = 	jsonData[i]["School Street Address"] + " " +
								jsonData[i]["School City"] + " " +
								jsonData[i]["School State"];
					console.log(address);
					geocoder.geocode({'address': address}, function(results, status) {
						if (status === "OK") {
						resultsMap.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map: resultsMap,
							position: results[0].geometry.location
						});
						} 
					});
				}
			})
		})
};


