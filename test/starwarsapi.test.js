
const {getData} = require('../src/app') //imports the getData fn from app.js

const filmtitle = 'A New Hope'// movie title used in 1st unit test

const actorname = 'Yoda'//actor name used in 2nd unit test


let url = 'https://swapi.dev/api/people' //actors url used in 2nd unit test

let found = false; //used in the getactorurl fn.





//first unit test, get's the film in the api using the film's title

test('check if the film is in the api  ',()=> {
   
   let found = false;
    getData('https://swapi.dev/api/films').then((data) =>
    {
    
    for(let i in data.results){
        if(data.results[i].title == filmtitle){
           found = true;
            expect(data.results[i].title).toEqual(

                filmtitle
            )

        }
    }
    if(found ==false){ 
        console.error("Test failed no film was found!");
    }
    

        }
    )
        
        
    }
    )
    
    //second unit test

     test('check if actor name is in the actors list & check his birth-year',()=> {
        


        getactorurl();
        function getactorurl(){
            getData(url).then((data) =>{ 
            for (let i in data.results){
             if(data.results[i].name == actorname ){
              
                found = true;
              
                //let aurl = data.results[i].url;
                
                afinal =  data.results[i].url;
                   
                getData(afinal).then((data) =>{

                    expect(data.birth_year).toEqual(//see if birthyear in the api matches the expected birthyear
                        '896BBY'
                    )
        
                }
        
                )
               
              }
            }
            
            if (found == false){
            
                if (data['next'] != null)//loops through all pages in the api
            {
        
            url = data['next']
              
              getactorurl();
            
            }
            else {
              
                console.log('Error actor was not found');  
            }
              }
            
             }

            ) 
            }
       
    }
    )

    
    //Integration Test
    test('Make sure Api response is working properly',()=> {
        
        
        let res = getData('https://swapi.dev/api/');
        res.then((data)=>

        {
            
            if(data.ok == true){

                expect(data).toBeDefined();

            }


        }
        )

        

         }
    )
    