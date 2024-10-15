let lat = null;
let lng = null;
let w = null;
let w2 = null;
let response = null;
let address = null;
let down= null;
let up =null;

const codeMap = {
    1000: { description: "Clear", icon: "images/WS/clear_day.svg" },
    1001: { description: "Partly Cloudy", icon: "images/WS/partly_cloudy.svg" },
    1100: { description: "Mostly Clear", icon: "images/WS/mostly_clear_day.svg" },
    1101: { description: "Mostly Cloudy", icon: "images/WS/mostly_cloudy.svg" },
    2000: { description: "Fog", icon: "images/WS/fog.svg" },
    4000: { description: "Drizzle", icon: "images/WS/drizzle.svg" },
    4001: { description: "Light Rain", icon: "images/WS/rain_light.svg" },
    5000: { description: "Rain", icon: "images/WS/rain.svg" },
    5001: { description: "Heavy Rain", icon: "images/WS/rain_heavy.svg" },
    6000: { description: "Snow", icon: "images/WS/snow.svg" },
    6001: { description: "Light Snow", icon: "images/WS/snow_light.svg" },
    7000: { description: "Freezing Rain", icon: "images/WS/freezing_rain.svg" },
    8000: { description: "Thunderstorm", icon: "images/WS/tstorm.svg" },
    7000: { description: "Wind", icon: "images/WS/wind.svg" },
    7001: { description: "Light Wind", icon: "images/WS/light_wind.svg" },
    7002: { description: "Strong Wind", icon: "images/WS/strong_wind.svg" }
};

function showSection(sectionId) {
      document.getElementById(sectionId).style.display = "block";
    }

function originalContent(){
	const p = document.getElementById('dynamic1');
	p.innerHTML = "";
	p.style.display = "none";
	const c = document.getElementById('dynamic2');
	c.innerHTML = "";
	c.style.display = "none";
	const z = document.getElementById('dynamic3');
	z.innerHTML = "";
	z.style.display = "none";
	const d = document.getElementById('dynamic4');
	d.innerHTML = "";
	d.style.display = "none";
	const table = document.getElementById("wT");
	if (table){
		table.remove();
	}

}

function ipLoc(){
	return fetch(`/api/location`)
		.then(response => response.json())
		.then(data => {
			//const loc = document.createElement("p");
			//loc.innerText = `${data.ip}, ${data.city}`;
			//section.appendChild(loc);
			address = data.city + ", " + data.region + ", " + data.country;
			lat = data.loc.split(",")[0];
			lng = data.loc.split(",")[1];
		})
}

function geoLoc(){
	address = document.getElementById("street").value + ", " + document.getElementById("city").value + ", " + document.getElementById("state").value;
	return fetch(`/api/geocode?address=${encodeURIComponent(address)}`)
		.then(response => response.json())
		.then(data => {
			if(data.error){
				document.getElementById("street").value = "error";
			}
			else{
				const loc1 = data[0].geometry.location;
				lat = loc1.lat;
				lng = loc1.lng; 
				//console.log("lat", data[0].geometry.location);
				//console.log("lat", lat);
			}
		})
}


function getLocation(){
	const g = document.getElementById("street").value;
	const u = document.getElementById("city").value;
	const q = document.getElementById("state").value
	const check = document.getElementById("aI")
	if(check.checked){
		return ipLoc();
	}
	else if(g&&u&&q){
		return geoLoc();
	}
	else{
		return Peomise.reject("No valid input");
	}
}

document.getElementById("g_info").addEventListener("click", function generalInfo() {
	showSection("dynamic1");
	//showSection('dynamic2');
	const section = document.getElementById("dynamic1");
	getLocation()
		.then(() => {
			//console.log("lat", lat);
			fetch(`weather?lat=${lat}&lng=${lng}`)
				.then(response => response.json())
				.then(data => {
					//console.log("lat", lat);
					w = data;
					//console.log("w", w)

				})

			.then(() =>{

				fetch(`weather2?lat=${lat}&lng=${lng}`)
				.then(response => response.json())
				.then(data => {
					//console.log("lat", lat);
					w2 = data;
					//console.log("w", w2)

				})
				.then(() => {
					//console.log(w);
					const c = document.createElement("div");
	    			c.style.display = "flex";
	    			c.style.justifyContent = "space-around"; 
	    			c.style.alignItems = "flex-start"; 
					const header = document.createElement("h2");
					header.innerText = "Daily Weather Details";
					section.appendChild(header);
					const p1 = document.createElement("p");
					p1.innerText = address;
					section.appendChild(p1);
					const i1 = document.createElement("img");
					i1.src = codeMap[w.data.timelines[0].intervals[0].values.weatherCode].icon;
					i1.style.width = "50px";
					i1.style.height = "50px";
					section.appendChild(i1);
					const p2 = document.createElement("p");
					p2.innerText = w.data.timelines[0].intervals[0].values.temperature;
					section.appendChild(p2);
					it1 = document.createElement("div");
					it1.style.display = "flex";
					it1.style.alignItems= "center"
					it1.style.flexDirection = "column";
					const p3 = document.createElement("p");
					p3.innerText = "Humidity";
					it1.appendChild(p3);
					const i2 = document.createElement("img");
					i2.src = "images/Humidity.png";
					i2.style.width = "50px";
					i2.style.height = "50px";
					it1.appendChild(i2);
					const p4 = document.createElement("p");
					p4.innerText = w.data.timelines[0].intervals[0].values.humidity + "%";
					it1.appendChild(p4);
					c.appendChild(it1);
					it2 = document.createElement("div");
					it2.style.display = "flex";
					it2.style.alignItems= "center"
					it2.style.flexDirection = "column";
					const p5 = document.createElement("p");
					p5.innerText = "Pressure";
					it2.appendChild(p5);
					const i3 = document.createElement("img");
					i3.src = "images/Pressure.png";
					i3.style.width = "50px";
					i3.style.height = "50px";
					it2.appendChild(i3);
					const p6 = document.createElement("p");
					p6.innerText =  w.data.timelines[0].intervals[0].values.pressureSeaLevel + "inHg";
					it2.appendChild(p6);
					c.appendChild(it2);
					it3 = document.createElement("div");
					it3.style.display = "flex";
					it3.style.alignItems= "center"
					it3.style.flexDirection = "column";
					const p7 = document.createElement("p");
					p7.innerText = "Wind Speed";
					it3.appendChild(p7);
					const i4 = document.createElement("img");
					i4.src = "images/Wind_Speed.png";
					i4.style.width = "50px";
					i4.style.height = "50px";
					it3.appendChild(i4);
					const p8 = document.createElement("p");
					p8.innerText = w.data.timelines[0].intervals[0].values.windSpeed + "mph";
					it3.appendChild(p8);
					c.appendChild(it3);
					it4 = document.createElement("div");
					it4.style.display = "flex";
					it4.style.alignItems= "center"
					it4.style.flexDirection = "column";
					const p9 = document.createElement("p");
					p9.innerText = "Visibility";
					it4.appendChild(p9);
					const i5 = document.createElement("img");
					i5.src = "images/visibility.png";
					i5.style.width = "50px";
					i5.style.height = "50px";
					it4.appendChild(i5);
					const p10 = document.createElement("p");
					p10.innerText =  w.data.timelines[0].intervals[0].values.visibility + "mi";
					it4.appendChild(p10);
					c.appendChild(it4);
					it6 = document.createElement("div");
					it6.style.display = "flex";
					it6.style.alignItems= "center"
					it6.style.flexDirection = "column";
					const p40 = document.createElement("p");
					p40.innerText = "Cloud Cover";
					it6.appendChild(p40);
					const i7 = document.createElement("img");
					i7.src = "images/Cloud_Cover.png";
					i7.style.width = "50px";
					i7.style.height = "50px";
					it6.appendChild(i7);
					const p42 = document.createElement("p");
					p42.innerText =  w.data.timelines[0].intervals[0].values.cloudCover + "%";
					it6.appendChild(p42);
					c.appendChild(it6);
					it5 = document.createElement("div");
					it5.style.display = "flex";
					it5.style.alignItems= "center"
					it5.style.flexDirection = "column";
					const p11 = document.createElement("p");
					p11.innerText = "UV Level";
					it5.appendChild(p11);
					const i6 = document.createElement("img");
					i6.src = "images/UV_level.png";
					i6.style.width = "50px";
					i6.style.height = "50px";
					it5.appendChild(i6);
					const p12 = document.createElement("p");
					p12.innerText =  w.data.timelines[0].intervals[0].values.uvIndex;
					it5.appendChild(p12);
					c.appendChild(it5);
					section.appendChild(c);
					
					const section2 = document.getElementById("dynamic2");
					const table = document.createElement("table")
					table.style.width = "80%";
					table.id = "wT";
					table.style.borderCollapse = "collapse";

					const thead = document.createElement("thead");
					const hr = document.createElement("tr");
					hr.style.backgroundColor = "blue";

					const headers = ["Date", "Status", "Temp High", "Temp Low", "Wind Speed"];
					headers.forEach(ht => {
						const th = document.createElement("th");
						th.innerText = ht;
						th.style.border = "none";
						hr.appendChild(th);
					}); 
					thead.appendChild(hr);
					table.appendChild(thead);
					const tbody = document.createElement("tbody");

	                w.data.timelines[0].intervals.forEach(interval => {
	                const date = new Date(interval.startTime);
	                const options = {weekday:"long",year:"numeric",month:"long",day:"numeric"};
	                const formattedD = date.toLocaleDateString("en-US", options);
	                const row = document.createElement("tr");
	                //row.addEventListener("click", function(){
				     //   	showInfo();
				     //   })                
	                const dateCell = document.createElement("td");
	                dateCell.innerText = formattedD;
	                dateCell.style.border="none";
	                dateCell.style.backgroundColor = "white";
	                row.appendChild(dateCell);

	                const maxTempCell = document.createElement("td");
	                maxTempCell.innerText = codeMap[interval.values.weatherCode].description; 
	                maxTempCell.style.border = "none";
	                maxTempCell.style.backgroundColor = "white";
	                row.appendChild(maxTempCell);

	                const minTempCell = document.createElement("td");
	                minTempCell.innerText = interval.values.temperatureMax;
	                minTempCell.style.border = "none";
	                minTempCell.style.backgroundColor = "white";
	                row.appendChild(minTempCell);

	                const humidityCell = document.createElement("td");
	                humidityCell.innerText = interval.values.temperatureMin; 
	                humidityCell.style.border = "none";
	                humidityCell.style.backgroundColor = "white";
	                row.appendChild(humidityCell);

	                const windSpeedCell = document.createElement("td");
	                windSpeedCell.innerText = interval.values.windSpeed; 
	                windSpeedCell.style.border = "none";
	                windSpeedCell.style.backgroundColor = "white";
	                row.appendChild(windSpeedCell);

	                tbody.appendChild(row);
	                });
	                table.appendChild(tbody);
				    document.body.appendChild(table);
				    document.body.addEventListener("click", function(event){
				    	const targetR = event.target.closest("tr");
				    	if(targetR){
				    		const rI = Array.from(targetR.parentNode.children).indexOf(targetR);
				    		table.remove()
				    		const o = document.getElementById("dynamic1");
				    		o.style.display = "none";
				    		showInfo(rI);
				    	}
				    })
})
})
		})
	})




function showInfo(rI){
	showSection("dynamic3");
	const ds = document.getElementById("dynamic1");
	ds.innerHTML = "";
	const ds1 = document.getElementById("dynamic2");
	ds1.innerHTML = "";
	console.log("argh", w)
	const s2 = document.getElementById("dynamic3");
	const h1 = document.createElement("h2");
	h1.innerText = "Daily Weather Details"
	s2.appendChild(h1);
	const p13 = document.createElement("p");
	p13.innerText = w.data.timelines[0].intervals[rI].startTime;
	s2.appendChild(p13);
	const p14 = document.createElement("p");
	p14.innerText = codeMap[w.data.timelines[0].intervals[rI].values.weatherCode].description;
	const i1 = document.createElement("img");
	i1.src = codeMap[w.data.timelines[0].intervals[0].values.weatherCode].icon;
	i1.style.width = "50px";
	i1.style.height = "50px";
	s2.appendChild(p14);
	s2.appendChild(i1);
	const p15 = document.createElement("p");
	p15.innerText = w.data.timelines[0].intervals[rI].values.temperatureMax + "/" + w.data.timelines[0].intervals[rI].values.temperatureMin;
	s2.appendChild(p15);
	const p16 = document.createElement("p");
	p16.innerText = "Precipitation: " + w.data.timelines[0].intervals[rI].values.precipitationType;
	s2.appendChild(p16);
	const p17 = document.createElement("p");
	p17.innerText = "Chance of Rain: " + w.data.timelines[0].intervals[rI].values.precipitationProbability;
	s2.appendChild(p17);
	const p18 = document.createElement("p");
	p18.innerText = "Wind Speed: " + w.data.timelines[0].intervals[rI].values.windSpeed + " mph";
	s2.appendChild(p18);
	p18.innerText = "Humidity: " + w.data.timelines[0].intervals[rI].values.humidity+"%";
	s2.appendChild(p18);
	const p19 = document.createElement("p");
	p19.innerText = "Visbility: " + w.data.timelines[0].intervals[rI].values.visibility + " mi";
	s2.appendChild(p19);
	const p20 = document.createElement("p");
	p15.innerText = "Sunrise/Sunset: " + w.data.timelines[0].intervals[rI].values.sunriseTime + "/" + w.data.timelines[0].intervals[rI].values.sunsetTime;
	s2.appendChild(p20);
	const h3 = document.createElement("h2");
	h3.innerText = "Weather Charts";
	s2.appendChild(h3);

	const down = document.createElement("img");
	down.src = "images/point-down-512.png"
	down.style.width = "50px";
	down.style.height = "50px";
	const up = document.createElement("img");
	up.src = "images/point-up-512.png"
	up.style.width = "50px";
	up.style.height = "50px";
	down.addEventListener("click", function(){
		down.remove();
		s2.appendChild(up);
		showGraph();
		})
	up.addEventListener("click", function(){
		up.remove();
		s2.appendChild(down);
		const o = document.getElementById("dynamic4");
		o.style.display = "none";
		})
	s2.appendChild(down);
}


function showGraph(){
	showSection("dynamic4");
	const chart = document.getElementById("tCharty");
    chart.innerHTML = ""; // Clear any existing charts
    const maxTs = w.data.timelines[0].intervals.map(interval => interval.values.temperatureMax);
    const minTs = w.data.timelines[0].intervals.map(interval => interval.values.temperatureMin);

    const Ts = w2.data.timelines[0].intervals.map(interval => interval.values.temperature);
    const Ps = w2.data.timelines[0].intervals.map(interval => interval.values.pressure);
    const Hs = w2.data.timelines[0].intervals.map(interval => interval.values.humidity);
    //const Ss = w2.data.timelines[0].intervals.map(interval => interval.values.windSpeed);

    const startDate = new Date(); 
	const timeLabels = [];

	for (let i = 0; i < 120; i++) { 
    const currentHour = new Date(startDate.getTime() + (i * 60 * 60 * 1000)); 
    timeLabels.push(currentHour.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })); 
	}
    Highcharts.chart('tCharty', {
       chart: {
           type: 'line'
       },
       title: {
           text: 'Temperature Overview'
       },
       xAxis: {
           categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', "Day 6"]
       },
       yAxis: {
           title: {
               text: 'Temperature (°C)'
           }
       },
       series: [{
           name: 'Min',
           data: minTs 
       }, {
           name: 'Max',
           data: maxTs 
       }]
   });

   Highcharts.chart('hCharty', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Hourly Weather Overview'
    },
    xAxis: {
        categories: timeLabels 
    },
    yAxis: [{
        title: {
            text: 'Temperature'
        },
    }, {
        title: {
            text: 'Pressure',
            opposite: true 
        }
    }, {
        title: {
            text: 'Humidity',
            opposite: true 
        }
    }],
    series: [{
        name: 'Temperature',
        type: 'line',
        data: Ts
    }, {
        name: 'Pressure',
        type: 'line',
        data: Ps,
        yAxis: 1 
    }, {
        name: 'Humidity',
        type: 'column',
        data: Hs,
        yAxis: 2 
    
    }],
	});
}
