var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var APP = {
    //urls for Navigation Links
    urls: {
        people: 'https://swapi.dev/api/people',
        films: 'https://swapi.dev/api//films/'
    }
};
var res; //To store Url for fetch function
var actorname; //To Store User Input e.g Searching for a .
var filmurl;
var found = false;
//export the getData fn. for testing.
(module).exports = {
    getData: getData
};
//getdata fn for fetching apis according to the requested url
function getData(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch(url)
                    .then(function (data) { return data.json(); })];
        });
    });
}
//getvalue fn. gets the user input from the web page then call on the checkvalue fn. 
function getvalue() {
    return __awaiter(this, void 0, void 0, function () {
        var domelement;
        return __generator(this, function (_a) {
            actorname = document.getElementById('actorname').value; //3'yart mn value ---> node value
            res = Promise.resolve(getData(APP.urls.people));
            domelement = document.getElementById('divactorinfo');
            domelement.value = "";
            checkvalue();
            return [2 /*return*/];
        });
    });
}
//checkvalue fn. loops through all actor names. once it finds the actor in the api. it gets the actor's url and calls on displayactor info fn.
function checkvalue() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.then(function (data) {
                for (var i in data.results) {
                    if (data.results[i].name.toLowerCase() == actorname.toLowerCase()) { //checks if actorname matches an actor in the api
                        res = getData(data.results[i].url); //fetches the actor's url
                        found = true;
                        displayactorinfo(); //call on the fn. which displays the actor's info on the webpage.
                    }
                }
                if (found == false) { //if actor was not found on that page. get the next page and keep searching.
                    if (data['next'] != null) {
                        //res = Promise.resolve(getData(data['next']) )
                        res = getData(data['next']);
                        checkvalue();
                    }
                    else {
                        //if actorn was not found in all pages.
                        var box = document.querySelector('.overlay');
                        box.classList.remove('active');
                        alert("Actor was not found");
                    }
                }
            });
            return [2 /*return*/];
        });
    });
}
//make sure document is defined in order not to get a TypeError. in the browser's console.
if (typeof document !== 'undefined') {
    var doc = document.body; // define document.body for Typescript
    //Event Listeners
    doc.addEventListener('click', function handler(event) {
        if (event.target.id == 'search') { //if search button is clicked. call on getvalue fn.
            var box = document.querySelector('.overlay');
            box.classList.add('active'); //add loading on page
            getvalue();
        }
        if (event.target.id == 'films') { //if films tab is clicked call on showfilms fn.
            var box = document.querySelector('.overlay');
            box.classList.add('active');
            showfilms();
        }
        else if (event.target.id == 'people') { //if people tab is clicked. fetch actors url & call on displaypeople fn.
            var box = document.querySelector('.overlay');
            box.classList.add('active'); //add loader
            var domelement = document.getElementById('divpeople');
            domelement.innerText = ""; //clear people's div on web page.
            res = getData("https://swapi.dev/api/people/"); //fetch actors url
            displaypeople();
        }
        else if (event.target.id.includes('api/films') == true) { //if any of the films titles is clicked on the web page. 
            var box = document.querySelector('.overlay');
            box.classList.add('active'); // add loader
            filmurl = event.target.id; //I already assigned the id of each film tab to the film's url on the showfilm fn. (scroll to check it out)
            Movieurl(); //call on Movieurl fn.
        }
    });
}
//display films on web page & Also assign the id of each film tab to the film's url.
function showfilms() {
    //make sure all divs are cleared...
    var domelement1 = document.getElementById('divfilminfo');
    domelement1.innerText = "";
    var domelement2 = document.getElementById('divpeople');
    domelement2.innerText = "";
    var domelement3 = document.getElementById('divfilms');
    domelement3.innerText = "";
    var domelement4 = document.getElementById('divactorinfo');
    domelement4.innerText = "";
    res = getData("https://swapi.dev/api/films/"); //fetch the films in the api
    var list = document.getElementById('divfilms');
    res.then(function (data) {
        for (var i in data.results) { //loops through each film
            var link = document.createElement('a'); //create a link with the film title and assign the link's id to the film's url
            link.innerHTML = data.results[i].title + "<br/>"; //set link name to the film title
            link.setAttribute('id', data.results[i].url); //set link's id to the film url
            list.appendChild(link); //append in the div of films
        }
        var box = document.querySelector('.overlay');
        box.classList.remove('active');
    });
}
//fn to decide which url to use while fetching (the Url of the selected film )
function Movieurl() {
    res = getData('https://swapi.dev/api//films/'); //fetch all films
    res.then(function (data) {
        for (var i in data.results) {
            if (filmurl == data.results[i].url) //check if the pressed film's link matches the url of one of the films in the api
             {
                res = getData(data.results[i].url); //fetch the url of the selected film
            }
        }
        displayfilminfo(); //call on the fn which displays the film's details
    });
}
//fn to display each film's details
function displayfilminfo() {
    return __awaiter(this, void 0, void 0, function () {
        var domelement1, domelement2, domelement3, domelement4, firstlist, box;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    domelement1 = document.getElementById('divfilminfo');
                    domelement1.innerText = "";
                    domelement2 = document.getElementById('divpeople');
                    domelement2.innerText = "";
                    domelement3 = document.getElementById('divfilms');
                    domelement3.innerText = "";
                    domelement4 = document.getElementById('divactorinfo');
                    domelement4.innerText = "";
                    firstlist = document.getElementById('divfilminfo');
                    box = document.querySelector('.overlay');
                    box.classList.add('active'); //add loader
                    res.then(function (data) {
                        var info1 = document.createElement('p'); //create a paragraph on webpage.
                        info1.innerHTML += 'Title: ' + data.title + "<br/>"; //add's the film title & append on the list on the webpage 
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Episode ID: ' + data.episode_id + "<br/>"; //add the film's episode id
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Opening Crawl: ' + data.opening_crawl + "<br/>";
                        ; //add the film's opening crawl.
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Director: ' + data.director + "<br/>"; //add the film's director
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Producer: ' + data.producer + "<br/>"; //add the producer
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Release Date: ' + data.release_date + "<br/>"; //add the release date.
                        firstlist.appendChild(info1);
                        var info2 = document.createElement('p');
                        info2.innerHTML += 'Characters:' + "<br/>";
                        firstlist.appendChild(info2);
                        for (var i in data.characters) { //add all characters in the film
                            res = getData(data.characters[i]);
                            res.then(function (data) {
                                //console.log(newdata.url);
                                info2.innerHTML += data.name + "<br/>";
                                firstlist.appendChild(info2);
                            });
                        }
                        info1.innerHTML += 'Data Created: ' + data.created + "<br/>"; //created data
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Data Edited: ' + data.edited + "<br/>"; //edited data
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'URL: ' + data.url + "<br/>"; //add url of film
                        firstlist.appendChild(info1);
                        var info3 = document.createElement('p');
                        info3.innerHTML += 'Planets:' + "<br/>";
                        firstlist.appendChild(info3);
                        for (var i in data.planets) { //add all planets in the film
                            res = getData(data.planets[i]);
                            res.then(function (data) {
                                info3.innerHTML += data.name + "<br/>";
                                firstlist.appendChild(info3);
                            });
                        }
                        var info4 = document.createElement('p');
                        info4.innerHTML += 'Starships:' + "<br/>";
                        firstlist.appendChild(info4);
                        for (var i in data.starships) { //add starships in the film
                            res = getData(data.starships[i]);
                            res.then(function (data) {
                                info4.innerHTML += data.name + "<br/>";
                                firstlist.appendChild(info4);
                            });
                        }
                        var info5 = document.createElement('p');
                        info5.innerHTML += 'Vehicles:' + "<br/>";
                        firstlist.appendChild(info5);
                        for (var i in data.vehicles) { //add all vehicles in the film
                            res = getData(data.vehicles[i]);
                            res.then(function (data) {
                                info5.innerHTML += data.name + "<br/>";
                                firstlist.appendChild(info5);
                            });
                        }
                        var info6 = document.createElement('p');
                        info6.innerHTML += 'Species:' + "<br/>";
                        firstlist.appendChild(info6);
                        for (var i in data.species) { //add all species in the film
                            res = getData(data.species[i]);
                            res.then(function (data) {
                                info6.innerHTML += data.name + "<br/>";
                                firstlist.appendChild(info6);
                            });
                        }
                    });
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3000); })];
                case 1:
                    _a.sent(); //wait for all data to be displayed on the web page before removing the loader
                    box.classList.remove('active'); //remove the loader
                    return [2 /*return*/];
            }
        });
    });
}
//fn to display the actor's info
function displayactorinfo() {
    //make sure all divs are cleared first
    var domelement1 = document.getElementById('divfilminfo');
    domelement1.innerText = "";
    var domelement2 = document.getElementById('divpeople');
    domelement2.innerText = "";
    var domelement3 = document.getElementById('divfilms');
    domelement3.innerText = "";
    var domelement4 = document.getElementById('divactorinfo');
    domelement4.innerText = "";
    var firstlist = document.getElementById('divactorinfo');
    res.then(function (data) {
        var info = document.createElement('p'); //create paragraph & append the values on the list.
        info.innerHTML += 'Name: ' + data.name + "<br/>"; //add actor's name
        firstlist.appendChild(info);
        info.innerHTML += 'Height: ' + data.height + "<br/>"; //add height
        firstlist.appendChild(info);
        info.innerHTML += 'Mass: ' + data.mass + "<br/>";
        ; //add mass
        firstlist.appendChild(info);
        info.innerHTML += 'Hair Color: ' + data.hair_color + "<br/>"; //add hair color
        firstlist.appendChild(info);
        info.innerHTML += 'Skin Color: ' + data.skin_color + "<br/>"; //add skin color
        firstlist.appendChild(info);
        info.innerHTML += 'Eye Color: ' + data.eye_color + "<br/>"; //add eye color
        firstlist.appendChild(info);
        info.innerHTML += 'Birth Year: ' + data.birth_year + "<br/>"; //add birthyear
        firstlist.appendChild(info);
        info.innerHTML += 'Gender: ' + data.gender + "<br/>"; //add gender
        firstlist.appendChild(info);
        var info7 = document.createElement('p');
        info7.innerHTML += 'Homeworld:' + "<br/>";
        firstlist.appendChild(info7);
        res = getData(data.homeworld); //fetch homeworld;s url to get value
        res.then(function (data) {
            info7.innerHTML += data.name + "<br/>";
            firstlist.appendChild(info7);
        });
        var info5 = document.createElement('p');
        info5.innerHTML += 'Films:' + "<br/>";
        firstlist.appendChild(info5);
        for (var i in data.films) { //films in which the actor has appeared
            res = getData(data.films[i]);
            res.then(function (data) {
                info5.innerHTML += data.title + "<br/>";
                firstlist.appendChild(info5);
            });
        }
        var info2 = document.createElement('p');
        info2.innerHTML += 'Species:' + "<br/>";
        firstlist.appendChild(info2);
        for (var i in data.species) { //add species
            res = getData(data.species[i]);
            res.then(function (data) {
                info2.innerHTML += data.name + "<br/>";
                firstlist.appendChild(info2);
            });
        }
        var info3 = document.createElement('p');
        info3.innerHTML += 'Vehicles:' + "<br/>";
        firstlist.appendChild(info3);
        for (var i in data.vehicles) { //add vehicles
            res = getData(data.vehicles[i]); //fetch each vehicle's url to get it's name
            res.then(function (data) {
                info3.innerHTML += data.name + "<br/>";
                firstlist.appendChild(info3);
            });
        }
        var info4 = document.createElement('p');
        info4.innerHTML += 'Starships:' + "<br/>";
        firstlist.appendChild(info4);
        for (var i in data.starships) { //add starships
            res = getData(data.starships[i]); //fetch each starship's url to get it's name
            res.then(function (data) {
                info4.innerHTML += data.name + "<br/>";
                firstlist.appendChild(info4);
            });
        }
        info.innerHTML += 'Created: ' + data.created + "<br/>"; //add data created
        firstlist.appendChild(info);
        info.innerHTML += 'Edited: ' + data.edited + "<br/>"; //add data edited
        firstlist.appendChild(info);
        info.innerHTML += 'URL: ' + data.url + "<br/>"; //add data's url
        firstlist.appendChild(info);
        //console.dir(data);
        var box = document.querySelector('.overlay');
        box.classList.remove('active'); //remove the loader
    });
}
//fn to display all actors in the api
function displaypeople() {
    //make sure all divs are cleared first.
    var domelement1 = document.getElementById('divfilminfo');
    domelement1.innerText = "";
    var domelement3 = document.getElementById('divfilms');
    domelement3.innerText = "";
    var domelement4 = document.getElementById('divactorinfo');
    domelement4.innerText = "";
    var list = document.getElementById('divpeople');
    res.then(function (data) {
        for (var i in data.results) {
            var info = document.createElement('p');
            info.innerHTML = data.results[i].name; //add each actor's name to the paragraph
            list.appendChild(info); //append the actor's name to the list
        }
        if (data['next'] != null) // loops through all pages to display all actors in the api
         {
            res = getData(data['next']);
            displaypeople(); //recursive call on the fn while fetching the next page in the api
        }
        else {
            var box = document.querySelector('.overlay');
            box.classList.remove('active'); //remove loader
        }
    });
}
