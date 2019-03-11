
class GeoCode{

    constructor(params) {
        
    }

    autoComplete(input, lat, lng){
          if(!input) return;
          const dropdown = google.maps.places.Autocomplete(input);
    }
}