var config = {
	"title": "Fotopfad Fritzlar",
	"start": {
		// "maxZoom": 16,
		"center": [50.93551,6.953081],
		"zoom": 13,
		"attributionControl": true,
		"zoomControl": false,
		"data": "data",
		"id":"06634005"
	},
	"fritzlar": {
		"title": "Fotopfad Fritzlar"
	}
};

document.title = config.title;
document.getElementById('brand').innerHTML = config.fritzlar.title;