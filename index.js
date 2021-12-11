const express = require('express');

let jobs = require('./jobs.json'); // access jobs.json
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.static('static'));


app.get('/categoryCount', (req,res) => {
    let categoriesAndCount = [];  //array that will contain each category and its count
    let jobList = []; //array to hold all job listings
   for (let i in jobs)
       jobList.push(jobs[i].categories) 
   
   for(let i = 0; i < jobList.length; i++){
        for(let j = 0; j < jobList[i].length; j++){
            if(i>0){
                let repetition = false; //checking for repetition
                for(let k = 0; k < categoriesAndCount.length; k++){
                    if (jobList[i][j] == categoriesAndCount[k][0]){//if repetition in category, add to count
                        categoriesAndCount[k][1] ++;
                        repetition = true;
                    }    
                }
                if(repetition == false){ 
                    categoriesAndCount.push([jobList[i][j],1]); 
                }
            }else{
                categoriesAndCount.push([jobList[i][j],1]); 
            }
        }
    }
   res.json(categoriesAndCount); //send response
})


app.get('/catergories/:desc', (req,res) => {
    
    let jobWithCategory = [] //array that will contain all jobs with given category

    for (let i in jobs){
        for(let j = 0; j < jobs[i].categories.length; j++){ 
            if(req.params.desc == jobs[i].categories[j]){ //if category matches
                jobWithCategory.push(jobs[i].title); //push to job array
            }
        }
    }
    res.json(jobWithCategory);//send response
 });



app.get('/jobs', (req,res) => {
    
    let jobsInCity = []; //array that will contain all job in a given city

    for (let i in jobs){
        let split = jobs[i].title.match(/\(([^)]+)\)/)[1];
        let city = split.substr(0, split.indexOf(',')); //get city from each job listing
        if(city == req.query.city){ //if cities match, add to array
            jobsInCity.push(jobs[i].title);//add to array
        }
    }
    res.json(jobsInCity); //send response
})

app.listen(3000); 