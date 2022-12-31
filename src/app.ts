
const APP = {

  //urls for Navigation Links
  urls: {
   people :'https://swapi.dev/api/people',
   films :'https://swapi.dev/api//films/'
  },

 };

let res:any; //To store Url for fetch function
let actorname:string //To Store User Input e.g Searching for an actor.
let filmurl:string; //A variable that contains the selected film's URL.
let found = false; //Variable used in the checkvalue fn. which finds the Actor we're searching for in the list of Actors in the API.

//export the getData fn. for testing.
(module).exports={
  getData
}

//getdata fn for fetching apis according to the requested url
async function getData(url:string) {

  return fetch(url)
  .then(data => {return data.json();})

}




//getvalue fn. gets the user input from the web page then call on the checkvalue fn. 
async function getvalue(){
  actorname= (<HTMLInputElement>document.getElementById('actorname')).value; 
  
  res = Promise.resolve(getData(APP.urls.people));
  
  let domelement = (<HTMLInputElement>document.getElementById('divactorinfo'));
  domelement.value ="";
  
  checkvalue();

}


//checkvalue fn. loops through all actor names. once it finds the actor in the api. it gets the actor's url and calls on displayactor info fn.
async function checkvalue(){

res.then((data:any) =>{ 
    
for (let i in data.results){
  
 if(data.results[i].name.toLowerCase() == actorname.toLowerCase() ){ //checks if actorname matches an actor in the api
  
  res = getData(data.results[i].url); //fetches the actor's url
   
    found = true;
   
    displayactorinfo(); //call on the fn. which displays the actor's info on the webpage.
  
  }
}

if (found == false){ //if actor was not found on that page. get the next page and keep searching.

    if (data['next'] != null)
{
  //res = Promise.resolve(getData(data['next']) )
  res = getData(data['next'])
  
  checkvalue();

}

else {
  //if actor was not found in all pages. display msg (Actor was not found)
  const box = document.querySelector('.overlay') as HTMLDivElement ; 
  box.classList.remove('active');

  alert ("Actor was not found")
}
  }
 }
) 
 }
     

//make sure document is defined in order not to get a TypeError. in the browser's console.
if (typeof document !== 'undefined') {
 
const doc = document.body as HTMLElement; // define document.body for Typescript


//Event Listeners
doc.addEventListener( 'click', function handler( event )   {
 

 if((event.target as Element).id =='search'){ //if search button is clicked. call on getvalue fn.
  
  const box = document.querySelector('.overlay') as HTMLDivElement ; 
  box.classList.add('active'); //add loading on page
  getvalue();
 }

  if( (event.target as Element).id == 'films' ) {//if films tab is clicked call on showfilms fn.

      
    const box = document.querySelector('.overlay') as HTMLDivElement ; 
    box.classList.add('active');
      showfilms();
     
  }

  else if((event.target as Element).id== 'people') {//if people tab is clicked. fetch actors url & call on displaypeople fn.
    const box = document.querySelector('.overlay') as HTMLDivElement ; 
    box.classList.add('active');//add loader

    let domelement = (<HTMLDivElement>document.getElementById('divpeople'));
    domelement.innerText ="";//clear people's div on web page.

    res =  getData("https://swapi.dev/api/people/") //fetch actors url
    displaypeople();

    
    }
  
    //I decided to name each film's HTML element on the webpage with the film's url.
  
  else if ((event.target as Element).id.includes('api/films') == true) {//if any of the films titles is clicked on the web page. 
  

      
    const box = document.querySelector('.overlay') as HTMLDivElement ; 
    box.classList.add('active');// add loader

    filmurl = (event.target as Element).id; //As Mentioned before; I already assigned the id of each film tab to the film's url on the showfilm fn. (Line 181)
    Movieurl(); //call on Movieurl fn.
     
  }
 }
  


  
  
  
);

}


//display films on web page & Also assign the id of each film tab to the film's url.
 function showfilms(){
  
  //make sure all divs are cleared... in order not to duplicate data on the webpage
  let domelement1 = (<HTMLDivElement>document.getElementById('divfilminfo'));
  domelement1.innerText ="";

  let domelement2 = (<HTMLDivElement>document.getElementById('divpeople'));
  domelement2.innerText ="";
  
  let domelement3 = (<HTMLDivElement>document.getElementById('divfilms'));
  domelement3.innerText ="";
  
  let domelement4 = (<HTMLDivElement>document.getElementById('divactorinfo'));
  domelement4.innerText ="";


  res =  getData("https://swapi.dev/api/films/")//fetch the films in the api


  let list = (<HTMLDivElement>document.getElementById('divfilms'))
  res.then((data:any) =>{ 
    

  for (let i in data.results){//loops through each film

    let link = document.createElement('a'); //create a link with the film title and assign the link's id to the film's url
    link.innerHTML= data.results[i].title + "<br/>";//set link name to the film title
    link.setAttribute('id',data.results[i].url);//set link's id to the film url
    list.appendChild(link);//append in the div of films
  }
  const box = document.querySelector('.overlay') as HTMLDivElement ; 
  box.classList.remove('active');
  }
  )

}

//fn to decide which url to use while fetching (the Url of the selected film )
 function Movieurl(){


  res =  getData('https://swapi.dev/api//films/');//fetch all films
  res.then((data:any) =>{



    for (let i in data.results)
    {

      if(filmurl == data.results[i].url)//check if the pressed film's link matches the url of one of the films in the api
      {

        res= getData(data.results[i].url);//fetch the url of the selected film
        
      }
    }
    displayfilminfo();//call on the fn which displays the film's details
  }
   )
}

   //fn to display each film's details
   
async function displayfilminfo(){
  //make sure all divs are cleared first.

  let domelement1 = (<HTMLDivElement>document.getElementById('divfilminfo'));
  domelement1.innerText ="";

  let domelement2 = (<HTMLDivElement>document.getElementById('divpeople'));
  domelement2.innerText ="";
  
  let domelement3 = (<HTMLDivElement>document.getElementById('divfilms'));
  domelement3.innerText ="";
  
  let domelement4 = (<HTMLDivElement>document.getElementById('divactorinfo'));
  domelement4.innerText ="";


  let firstlist = (<HTMLDivElement>document.getElementById('divfilminfo'))
  
  const box = document.querySelector('.overlay') as HTMLDivElement ; 
  box.classList.add('active');//add loader

   res.then((data:any) =>{

  
    
      let info1 = document.createElement('p');//create a paragraph on webpage.
      

      info1.innerHTML += 'Title: ' + data.title + "<br/>";//add's the film title & append on the list on the webpage 
      firstlist.appendChild(info1);

      info1.innerHTML += 'Episode ID: ' +data.episode_id +"<br/>";//add the film's episode id
      firstlist.appendChild(info1);

      info1.innerHTML += 'Opening Crawl: '  + data.opening_crawl +"<br/>";;//add the film's opening crawl.
      firstlist.appendChild(info1);
      
      info1.innerHTML += 'Director: '+ data.director + "<br/>";//add the film's director
      firstlist.appendChild(info1);
  

      info1.innerHTML += 'Producer: ' + data.producer+ "<br/>";//add the producer
      firstlist.appendChild(info1);
     
      info1.innerHTML += 'Release Date: '+ data.release_date + "<br/>";//add the release date.
      firstlist.appendChild(info1);
      
      let info2 = document.createElement('p')
      info2.innerHTML += 'Characters:'+ "<br/>";
      firstlist.appendChild(info2);


      
      for(let i in data.characters){//add all characters in the film
      
       
        res = getData(data.characters[i])
        
        res.then((data:any) =>{
        
         //console.log(newdata.url);
        info2.innerHTML += data.name + "<br/>";
        firstlist.appendChild(info2);

       })
  }

      info1.innerHTML += 'Data Created: ' +data.created + "<br/>";//created data
      firstlist.appendChild(info1);
     
      info1.innerHTML += 'Data Edited: ' + data.edited + "<br/>"; //edited data
      firstlist.appendChild(info1);

      info1.innerHTML += 'URL: '+data.url + "<br/>";//add url of film
      firstlist.appendChild(info1);
      
      let info3 = document.createElement('p')
      info3.innerHTML += 'Planets:'+ "<br/>";
      firstlist.appendChild(info3);

      for(let i in data.planets){//add all planets in the film

        res = getData(data.planets[i]);

        res.then((data:any) =>{
        info3.innerHTML += data.name + "<br/>";
        firstlist.appendChild(info3);

       }
        )
      }

      let info4 = document.createElement('p')
      
      info4.innerHTML += 'Starships:'+ "<br/>";
      firstlist.appendChild(info4);

      for(let i in data.starships){//add starships in the film

        res = getData(data.starships[i]);

        res.then((data:any) =>{
          info4.innerHTML += data.name + "<br/>";
          firstlist.appendChild(info4);
  
         }
          )
      }


      
      let info5 = document.createElement('p')
      info5.innerHTML += 'Vehicles:'+ "<br/>";
      firstlist.appendChild(info5);

      for(let i in data.vehicles){//add all vehicles in the film

        res = getData(data.vehicles[i]);

        res.then((data:any) =>{
        info5.innerHTML += data.name + "<br/>";
        firstlist.appendChild(info5);
       }
        )
      }


      let info6 = document.createElement('p')
      
      info6.innerHTML += 'Species:'+ "<br/>";
      firstlist.appendChild(info6);

      for(let i in data.species){//add all species in the film

        
        res = getData(data.species[i]);

        res.then((data:any) =>{
        info6.innerHTML += data.name + "<br/>";
        firstlist.appendChild(info6);
         }
        )
        

        

      }
     

  
      
    
    }
    
    
  
  )
  
      
  await new Promise(resolve => setTimeout(resolve, 3000));//wait for all data to be displayed on the web page before removing the loader

   
  box.classList.remove('active');//remove the loader
}




   //fn to display the actor's info
 function displayactorinfo(){

  //make sure all divs are cleared first
  
  let domelement1 = (<HTMLDivElement>document.getElementById('divfilminfo'));
  domelement1.innerText ="";

  let domelement2 = (<HTMLDivElement>document.getElementById('divpeople'));
  domelement2.innerText ="";

  let domelement3 = (<HTMLDivElement>document.getElementById('divfilms'));
  domelement3.innerText ="";
  
  let domelement4 = (<HTMLDivElement>document.getElementById('divactorinfo'));
  domelement4.innerText ="";

  let firstlist = (<HTMLDivElement>document.getElementById('divactorinfo'));

  res.then((data:any) =>{
    
      let info = document.createElement('p');//create paragraph & append the values on the list.
    
      info.innerHTML += 'Name: ' + data.name + "<br/>";//add actor's name
      firstlist.appendChild(info);

      info.innerHTML += 'Height: ' +data.height +"<br/>";//add height
      firstlist.appendChild(info);

      info.innerHTML += 'Mass: '  + data.mass +"<br/>";;//add mass
      firstlist.appendChild(info);
      
      info.innerHTML += 'Hair Color: '+ data.hair_color + "<br/>";//add hair color
      firstlist.appendChild(info);
  

      info.innerHTML += 'Skin Color: ' + data.skin_color+ "<br/>";//add skin color
      firstlist.appendChild(info);
     
      info.innerHTML += 'Eye Color: '+ data.eye_color + "<br/>";//add eye color
      firstlist.appendChild(info);

      info.innerHTML += 'Birth Year: ' +data.birth_year + "<br/>";//add birthyear
      firstlist.appendChild(info);
     

      info.innerHTML += 'Gender: ' + data.gender + "<br/>";//add gender
      firstlist.appendChild(info);
     
      let info7 = document.createElement('p')
      info7.innerHTML += 'Homeworld:'+ "<br/>";
      firstlist.appendChild(info7);

        res = getData(data.homeworld)//fetch homeworld;s url to get value

        res.then((data:any) =>{//add homeworld


          info7.innerHTML += data.name + "<br/>";
          firstlist.appendChild(info7);


        } )

      let info5 = document.createElement('p')
      info5.innerHTML += 'Films:'+ "<br/>";
      firstlist.appendChild(info5);

      for(let i in data.films){//films in which the actor has appeared

        res = getData(data.films[i])

        res.then((data:any) =>{

          info5.innerHTML += data.title + "<br/>";
          firstlist.appendChild(info5);

        } )

      }

      let info2 = document.createElement('p')
      
      info2.innerHTML += 'Species:'+ "<br/>";
      firstlist.appendChild(info2);

      for(let i in data.species){//add species
        
        res = getData(data.species[i]);

        res.then((data:any) =>{
        info2.innerHTML += data.name + "<br/>";
        firstlist.appendChild(info2);
         }
        )
      }
     
      let info3 = document.createElement('p')
      info3.innerHTML += 'Vehicles:'+ "<br/>";
      firstlist.appendChild(info3);

      for(let i in data.vehicles){//add vehicles

        res = getData(data.vehicles[i])//fetch each vehicle's url to get it's name

        res.then((data:any) =>{


          info3.innerHTML += data.name + "<br/>";
          firstlist.appendChild(info3);


        } )

      }
        
      let info4 = document.createElement('p')
      info4.innerHTML += 'Starships:'+ "<br/>";
      firstlist.appendChild(info4);

      for(let i in data.starships){//add starships

        res = getData(data.starships[i])//fetch each starship's url to get it's name

        res.then((data:any) =>{


          info4.innerHTML += data.name + "<br/>";
          firstlist.appendChild(info4);

        } )

      }

      
      info.innerHTML += 'Created: '+data.created + "<br/>";//add data created
      firstlist.appendChild(info);

      
      info.innerHTML += 'Edited: '+data.edited + "<br/>";//add data edited
      firstlist.appendChild(info);

      
      info.innerHTML += 'URL: '+data.url + "<br/>";//add data's url
      firstlist.appendChild(info);

      //console.dir(data);

      const box = document.querySelector('.overlay') as HTMLDivElement ; 
      box.classList.remove('active');//remove the loader

     }
    
    )
    
    
  
     }



   //fn to display all actors in the api
    function displaypeople (){

      //make sure all divs are cleared first....
      
  let domelement1 = (<HTMLDivElement>document.getElementById('divfilminfo'));
  domelement1.innerText ="";

  let domelement3 = (<HTMLDivElement>document.getElementById('divfilms'));
  domelement3.innerText ="";

  let domelement4 = (<HTMLDivElement>document.getElementById('divactorinfo'));
  domelement4.innerText ="";
      
      let list = (<HTMLDivElement>document.getElementById('divpeople'));
      

    
      res.then((data:any) =>{
    
      
      for (let i in data.results){
    
        let info = document.createElement('p');
        
        info.innerHTML = data.results[i].name;//add each actor's name to the paragraph
    
        list.appendChild(info);//append the actor's name to the list
    
      }
      

      if (data['next'] != null)// loops through all pages in the API to display all the actors
      {
        res = getData(data['next'])
        displaypeople();//recursive call on the fn while fetching the next page in the api
      }

      else{
   
  const box = document.querySelector('.overlay') as HTMLDivElement ; 
  box.classList.remove('active');//remove loader

      }

       }
       
      
      )
      
    
       }
      