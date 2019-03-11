
let contact = new Contact();
contact.contactTable();


function initMap() {
    var input = document.getElementById('address');
    if(!input) return;
    const dropdown = new google.maps.places.Autocomplete(input);
}