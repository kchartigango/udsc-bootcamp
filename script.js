// Variables
// const placename = "Toronto"; // Value cannot be reassigned
// let year = 2024; //Value can be reassigned if needed

// Arrays
// let coords = [-79, 43]

// coords[0];

// If statements
// if (year > 2020) {
//     console.log("Year is greater than 2020");
// } else{
//     console.log("Year is less than 2020");
// }

// For loops
// for (let i = 0; i < 5; i++) { // 3 args: Initial value i, condition to be met for iteration of loop, increment value i
//     console.log("Loop " + (i + 1));
// }

// Functions
// function message(home) {
//     return "I live in " + home;
// }

// let mytext = message(placename);
// console.log(mytext);

//Access HTML elements
// const myButton = document.getElementById("my-button");
// const updateText = document.getElementById("my-text");
// let clickCount = 0;

// myButton.addEventListener("click", () => {
//     clickCount++;
//     updateText.textContent = "You clicked me! " + clickCount + " times";
// });

// const map = new maplibregl.Map({
//     container: 'map', // container id
//     style: 'https://demotiles.maplibre.org/style.json', // style URL
//     center: [0, 0], // starting position [lng, lat]
//     zoom: 1 // starting zoom
// });

// const map = new maplibregl.Map({
//     container: 'map', // container id
//     style:  'https://api.maptiler.com/maps/basic-v2/style.json?key=ZZmXLp70IeXZpwoYYAmO', // style URL
//     center: [-105, 58], // starting position [lng, lat]
//     zoom: 3 // starting zoom
// });

// const map = new maplibregl.Map({
//     container: 'map', // container id
//     style:  'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json', // style URL
//     center: [-105, 58], // starting position [lng, lat]
//     zoom: 3 // starting zoom
// });

const map = new maplibregl.Map({
    container: 'map', // container id
    style:  'https://api.maptiler.com/maps/basic-v2/style.json?key=ZZmXLp70IeXZpwoYYAmO', // style URL
    center: [-79.397578, 43.664368], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.on('load', () => {

    map.addSource('ttc-routes', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kchartigango/udsc-bootcamp/main/ttc_routes.geojson',
        'generateId': true
    });

    map.addLayer({
        'id': 'ttc-line',
        'type': 'line',
        'source': 'ttc-routes',
        'paint': {
            'line-width': 1,
            'line-color': 'blue',
        },
    });

    map.addSource('ttc-stops', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kchartigango/udsc-bootcamp/main/ttc_stops.geojson', //Link to raw github files when in development stage. Update to pages on deployment
        'generateId': true //Create a unique ID for each feature
    });
 
    map.addLayer({
        'id': 'ttc-point',
        'type': 'circle',
        'source': 'ttc-stops',
        'paint': {
            'circle-radius': 6,
            'circle-color': 'purple',
            'circle-stroke-width': 1.5,
            'circle-stroke-color': 'white'
        },
    });

    map.addSource('lake-ontario', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kchartigango/udsc-bootcamp/main/lake-ontario.geojson',
        'generateId': true
    });

    map.addLayer({
        'id': 'lake-polygon',
        'type': 'fill',
        'source': 'lake-ontario',
        'paint': {
            'fill-color': '#30949D',
            'fill-opacity': 0.7,
            'fill-outline-color': 'lightblue'
        },
    });
});

map.on('mouseenter', 'ttc-point', () => {
    map.getCanvas().style.cursor = 'pointer'; //This changes the cursor to pointer style when mouse is over a TTC stop
});

map.on('mouseleave', 'ttc-point', () => {
    map.getCanvas().style.cursor = ''; //This returns cursor to its original style when mouse leaves the TTC stop
});

map.on('click', 'ttc-point', (e) => {
    new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<b>Station name:</b> ' + e.features[0])
        .addTo(map)

    // map.on('click', 'collect-hex-fill', (e) => {
    //     new mapboxgl.Popup() //Declaring a new popup object with each click on the point
    //         .setLngLat(e.lngLat)
    //         .setHTML("<b>Collision count:</b> " + e.features[0].properties.COUNT) //Using click event properties to add text to the popup box
    //         .addTo(map); //Show the popup on the web map
    
    //         // .setHTML("<b>Collision count:</b> " + e.features[0].properties.COUNT + "<br>" +
    //         //     "<b>Neighborhood:</b> " + collisiongeojson.features[0].properties.NEIGHBOURHOOD_158) //Using click event properties to add text to the popup box
    // });

})