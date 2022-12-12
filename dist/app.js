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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
    },
    //Urls for each film.
    urlsfilms: {
        films: 'https://swapi.dev/api//films/',
        film1: 'https://swapi.dev/api//films/1/',
        film2: 'https://swapi.dev/api//films/2/',
        film3: 'https://swapi.dev/api//films/3/',
        film4: 'https://swapi.dev/api//films/4/',
        film5: 'https://swapi.dev/api//films/5/',
        film6: 'https://swapi.dev/api//films/6/',
    },
};
var m = undefined;
var filmnumber = undefined; //Decide which film.
var res; //To store Url for fetch fn.
var actorname; //To Store User Input e.g Searching for a film.
var filmurl;
var found = false;
var data;
function getData(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)
                        .then(function (data) { return data.json(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getvalue() {
    return __awaiter(this, void 0, void 0, function () {
        var domelement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actorname = document.getElementById('actorname').value; //3'yart mn value ---> node value
                    return [4 /*yield*/, getData('https://swapi.dev/api/people')];
                case 1:
                    //console.log("www.ok/"+michael)
                    res = _a.sent();
                    domelement = document.getElementById('divactorinfo');
                    domelement.value = "";
                    checkvalue();
                    return [2 /*return*/];
            }
        });
    });
}
function checkvalue() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.then(function (data) {
                for (var i in data.results) {
                    if (data.results[i].name.toLowerCase() == actorname.toLowerCase()) {
                        res = getData(data.results[i].url);
                        //debugger
                        found = true;
                        displayactorinfo();
                    }
                }
                if (found == false) {
                    if (data['next'] != null) {
                        res = getData(data['next']);
                        checkvalue();
                    }
                    else {
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
//Event Listeners
document.body.addEventListener('click', function handler(event) {
    if (event.target.id == 'search') {
        var box = document.querySelector('.overlay');
        box.classList.add('active');
        //document.querySelector('.overlay').classList.add('active');
        getvalue();
    }
    if (event.target.id == 'films') {
        var box = document.querySelector('.overlay');
        box.classList.add('active');
        //document.querySelector('.overlay').classList.add('active');
        showfilms();
    }
    else if (event.target.id == 'people') {
        var box = document.querySelector('.overlay');
        box.classList.add('active');
        //document.querySelector('.overlay').classList.add('active');
        var domelement = document.getElementById('divpeople');
        domelement.innerText = "";
        //document.getElementById('divpeople').innerHTML=""; //To make sure results are not repeated.
        res = getData("https://swapi.dev/api/people/");
        displaypeople();
    }
    else if (event.target.id.includes('api/films') == true) {
        var box = document.querySelector('.overlay');
        box.classList.add('active');
        //document.querySelector('.overlay').classList.add('active');
        filmurl = event.target.id;
        Movieurl();
    }
});
function showfilms() {
    var domelement1 = document.getElementById('divfilminfo');
    domelement1.innerText = "";
    var domelement2 = document.getElementById('divpeople');
    domelement2.innerText = "";
    var domelement3 = document.getElementById('divfilms');
    domelement3.innerText = "";
    var domelement4 = document.getElementById('divactorinfo');
    domelement4.innerText = "";
    // document.getElementById('divfilminfo').innerText="";
    // document.getElementById('divfilms').innerHTML="";
    // document.getElementById('divpeople').innerText="";
    //document.getElementById('divactorinfo').innerText="";
    res = getData("https://swapi.dev/api/films/");
    var list = document.getElementById('divfilms');
    res.then(function (data) {
        for (var i in data.results) {
            var link = document.createElement('a');
            link.innerHTML = data.results[i].title + "<br/>";
            link.setAttribute('id', data.results[i].url);
            list.appendChild(link);
        }
        var box = document.querySelector('.overlay');
        box.classList.remove('active');
    });
}
function Movieurl() {
    res = getData('https://swapi.dev/api//films/');
    res.then(function (data) {
        for (var i in data.results) {
            if (filmurl == data.results[i].url) {
                res = getData(data.results[i].url);
            }
        }
        displayfilminfo();
    });
}
//Filmsonly
function displayfilms() {
    var firstlist = document.getElementById('main');
    firstlist.innerText = "";
    res = getData(APP.urls.films);
    res.then(function (data) {
        for (var i in data.results) {
            var info = document.createElement('p');
            info.innerHTML = data.results[i].title;
            firstlist.appendChild(info);
            console.dir(data);
        }
    });
}
//filminfoonly
function displayfilminfo() {
    return __awaiter(this, void 0, void 0, function () {
        var domelement1, domelement2, domelement3, domelement4, firstlist, info6, box;
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
                    info6 = document.createElement('p');
                    box = document.querySelector('.overlay');
                    box.classList.add('active');
                    //document.querySelector('.overlay').classList.add('active');
                    res.then(function (data) {
                        var info1 = document.createElement('p');
                        info1.innerHTML += 'Title: ' + data.title + "<br/>";
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Episode ID: ' + data.episode_id + "<br/>";
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Opening Crawl: ' + data.opening_crawl + "<br/>";
                        ;
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Director: ' + data.director + "<br/>";
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Producer: ' + data.producer + "<br/>";
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Release Date: ' + data.release_date + "<br/>";
                        firstlist.appendChild(info1);
                        var info2 = document.createElement('p');
                        info2.innerHTML += 'Characters:' + "<br/>";
                        firstlist.appendChild(info2);
                        for (var i in data.characters) {
                            res = getData(data.characters[i]);
                            res.then(function (datanew) {
                                //console.log(newdata.url);
                                info2.innerHTML += datanew.name + "<br/>";
                                firstlist.appendChild(info2);
                            });
                        }
                        info1.innerHTML += 'Data Created: ' + data.created + "<br/>";
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'Data Edited: ' + data.edited + "<br/>";
                        firstlist.appendChild(info1);
                        info1.innerHTML += 'URL: ' + data.url + "<br/>";
                        firstlist.appendChild(info1);
                        //characters
                        var info3 = document.createElement('p');
                        info3.innerHTML += 'Planets:' + "<br/>";
                        firstlist.appendChild(info3);
                        for (var i in data.planets) {
                            res = getData(data.planets[i]);
                            res.then(function (datanew) {
                                info3.innerHTML += datanew.name + "<br/>";
                                firstlist.appendChild(info3);
                            });
                        }
                        var info4 = document.createElement('p');
                        info4.innerHTML += 'Starships:' + "<br/>";
                        firstlist.appendChild(info4);
                        for (var i in data.starships) {
                            res = getData(data.starships[i]);
                            res.then(function (datanew) {
                                info4.innerHTML += datanew.name + "<br/>";
                                firstlist.appendChild(info4);
                            });
                        }
                        var info5 = document.createElement('p');
                        info5.innerHTML += 'Vehicles:' + "<br/>";
                        firstlist.appendChild(info5);
                        for (var i in data.vehicles) {
                            res = getData(data.vehicles[i]);
                            res.then(function (datanew) {
                                info5.innerHTML += datanew.name + "<br/>";
                                firstlist.appendChild(info5);
                            });
                        }
                        info6 = document.createElement('p');
                        info6.innerHTML += 'Species:' + "<br/>";
                        firstlist.appendChild(info6);
                        for (var i in data.species) {
                            res = getData(data.species[i]);
                            res.then(function (datanew) {
                                info6.innerHTML += datanew.name + "<br/>";
                                firstlist.appendChild(info6);
                            });
                        }
                    });
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3000); })];
                case 1:
                    _a.sent();
                    //const box = document.querySelector('.overlay') as HTMLDivElement ; 
                    box.classList.remove('active');
                    return [2 /*return*/];
            }
        });
    });
}
//actorinfo
function displayactorinfo() {
    var domelement1 = document.getElementById('divfilminfo');
    domelement1.innerText = "";
    var domelement2 = document.getElementById('divpeople');
    domelement2.innerText = "";
    var domelement3 = document.getElementById('divfilms');
    domelement3.innerText = "";
    //search is repeated
    // let domelement4 = (<HTMLDivElement>document.getElementById('divactorinfo'));
    // domelement4.innerText ="";
    // document.getElementById('divpeople').innerHTML ="";
    // document.getElementById('divfilms').innerHTML ="";
    // document.getElementById('divfilminfo').innerHTML ="";
    var firstlist = document.getElementById('divactorinfo');
    res.then(function (data) {
        var info = document.createElement('p');
        info.innerHTML += 'Name: ' + data.name + "<br/>";
        firstlist.appendChild(info);
        info.innerHTML += 'Height: ' + data.height + "<br/>";
        firstlist.appendChild(info);
        info.innerHTML += 'Mass: ' + data.mass + "<br/>";
        ;
        firstlist.appendChild(info);
        info.innerHTML += 'Hair Color: ' + data.hair_color + "<br/>";
        firstlist.appendChild(info);
        info.innerHTML += 'Skin Color: ' + data.skin_color + "<br/>";
        firstlist.appendChild(info);
        info.innerHTML += 'Eye Color: ' + data.eye_color + "<br/>";
        firstlist.appendChild(info);
        info.innerHTML += 'Birth Year: ' + data.birth_year + "<br/>";
        firstlist.appendChild(info);
        info.innerHTML += 'Gender: ' + data.gender + "<br/>";
        firstlist.appendChild(info);
        info.innerHTML += 'Homeworld: ' + data.homeworld + "<br/>";
        firstlist.appendChild(info);
        info.innerHTML += 'Films:' + "<br/>";
        firstlist.appendChild(info);
        for (var i in data.films) {
            info.innerHTML += data.films[i] + "<br/>";
            firstlist.appendChild(info);
        }
        info.innerHTML += 'Species:' + "<br/>";
        firstlist.appendChild(info);
        for (var i in data.species) {
            info.innerHTML += data.species[i] + "<br/>";
            firstlist.appendChild(info);
        }
        info.innerHTML += 'Vehicles:' + "<br/>";
        firstlist.appendChild(info);
        for (var i in data.vehicles) {
            info.innerHTML += data.vehicles[i] + "<br/>";
            firstlist.appendChild(info);
        }
        info.innerHTML += 'Starships:' + "<br/>";
        firstlist.appendChild(info);
        for (var i in data.starships) {
            info.innerHTML += data.starships[i] + "<br/>";
            firstlist.appendChild(info);
        }
        info.innerHTML += 'Created: ' + data.created + "<br/>";
        firstlist.appendChild(info);
        info.innerHTML += 'Edited: ' + data.edited + "<br/>";
        firstlist.appendChild(info);
        info.innerHTML += 'URL: ' + data.url + "<br/>";
        firstlist.appendChild(info);
        console.dir(data);
        var box = document.querySelector('.overlay');
        box.classList.remove('active');
        //document.querySelector('.overlay').classList.remove('active'); 
    });
}
//peopleonly
function displaypeople() {
    var domelement1 = document.getElementById('divfilminfo');
    domelement1.innerText = "";
    //let domelement2 = (<HTMLDivElement>document.getElementById('divpeople'));
    //domelement2.innerText ="";
    var domelement3 = document.getElementById('divfilms');
    domelement3.innerText = "";
    var domelement4 = document.getElementById('divactorinfo');
    domelement4.innerText = "";
    // document.getElementById('divfilms').innerHTML="";
    // document.getElementById('divfilminfo').innerHTML="";
    // document.getElementById('divactorinfo').innerHTML="";
    var list = document.getElementById('divpeople');
    //list.innerHTML= "";
    res.then(function (data) {
        for (var i in data.results) {
            var info = document.createElement('p');
            info.innerHTML = data.results[i].name;
            list.appendChild(info);
        }
        if (data['next'] != null) {
            res = getData(data['next']);
            displaypeople();
        }
        else {
            //await new Promise(resolve => setTimeout(resolve, 1000));
            var box = document.querySelector('.overlay');
            box.classList.remove('active');
            // document.querySelector('.overlay').classList.remove('active');
        }
    });
}
//# sourceMappingURL=app.js.map