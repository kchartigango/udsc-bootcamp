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
    zoom: 3 // starting zoom
});

map.on('load', () => {
 
    map.addSource('ttc-stops', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/smith-lg/ggr472-wk6-demo/main/data/can-provterr.geojson', //Link to raw github files when in development stage. Update to pages on deployment
        'generateId': true //Create a unique ID for each feature
    });
 
    map.addLayer({
        'id': 'provterr-fill',
        'type': 'fill',
        'source': 'ttc-stops',
        'paint': {
            'fill-color': '#627BC1',
            'fill-opacity': 0.5,
            'fill-outline-color': 'white'
        },
    });
 
});