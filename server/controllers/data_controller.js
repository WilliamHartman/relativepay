const Xray = require('x-ray');
const request = require('request');
const fs = require('fs');
const xray = new Xray();
const GoogleImages = require('google-images');
const google = new GoogleImages('008285851456266523243:zkcooi51hga','AIzaSyDIwcIN-uwJeNo8bkbzb1Tb_VqMUuAU9So');


const gdURL = 'https://www.glassdoor.com/Salaries/';


module.exports = {
    getSalaries: (req, res) => {
        const db = req.app.get('db');
        var searchTerm = req.params.job;
        var salariesArray = [];
        var skippedCities = [];
        var flag = false;

        //Function where web scraping magic happens
        function getSalaries(i, cities, jobID){
            return function(){
                //Builds the url using lots of variabled. Filters for the id 'MeanPay_M in a div, returns it as a string in a object in an array
                xray(`${gdURL}${cities[i].city_search_name}-${searchTerm}-salary-${cities[i].unique_str}${cities[i].unique_num+searchTerm.length}.htm`, 'span.OccMedianBasePayStyle__payNumber', [{
                    salary: ''
                }])((err, result) => {
                    //If there is a result
                    if(result){
                        //Changes result to digits only
                        let regRes = result[0].salary.replace(/[^0-9.]/g,"");
                        //Calculates relative salary as a ratio
                        let relativeSalary = (regRes*100)/cities[i].col;
                        //Pushes to array and posts to database in salary table
                        salariesArray.push({city_id: cities[i].city_id, salary: regRes});
                        db.post_salary([cities[i].city_id, jobID, regRes, relativeSalary])
                        console.log(searchTerm, ' success: ', cities[i].city_name)
                    } else {
                        //If no result, adds to skipped cities array
                        console.log(searchTerm, ' fail: ', cities[i].city_name)
                        if(flag === false)                        
                            skippedCities.push(cities[i]);
                    }
                    console.log(`${i} / ${cities.length-1}`)
                    //When the end of the array is reachedrs
                    if(i === cities.length-1){
                        console.log('flag: ', flag)
                        //If this was the first time through the cities
                        if(flag === false){ 
                            console.log('Second pass')
                            //Rerun search with longer timeout 
                            if(skippedCities.length > 75){
                                db.delete_salaries([searchTerm])
                                    .then( () => {
                                        db.delete_job([searchTerm])
                                            .then( () => res.status(200).send([{job_name: searchTerm}]))
                                    })
                            } else {
                                for(let k=0; k<skippedCities.length; k++){
                                    setTimeout(getSalaries(k, skippedCities, jobID), k * 500)
                                }
                            }
                            flag=true;
                        } else {
                            db.get_salaries([searchTerm])
                            .then( salaries => {
                                for(let l=0; l<salaries.length; l++){
                                    if(l === salaries.length-1){
                                        db.set_ranks(salaries[l].salary_id, l+1)
                                            .then(() => {
                                                console.log('Sending salaries to frontend')
                                                res.status(200).send(salaries)
                                            })
                                    } else {
                                        db.set_ranks(salaries[l].salary_id, l+1)                                        
                                    }
                                }
                            });
                        }
                    } 
                });
                
            }
        }
        //searches the database for the job that was searched
        db.job_in_db(searchTerm)
            .then(job => {
                //if the job is in the table already, call get salaries
                if(job.length > 0){
                    //will return all of the tables joined with just the job searched, sorted by relative salary descending
                    db.get_salaries([searchTerm])
                        .then( salaries => {
                            if(salaries.length > 75) {
                                res.status(200).send(salaries)
                            } else {
                                db.delete_salaries([searchTerm])
                                    .then( () => { 
                                        db.get_cities()
                                            .then( cities => {
                                                //Iterates through cities, calls the getsalaries function above. 
                                                //On a 0.2 second time out to avoid bot detection
                                                for(let j=0; j<cities.length; j++){
                                                    setTimeout(getSalaries(j, cities, job[0].job_id), j * 100)
                                                }
                                            })
                                    })
                            }
                        });
                    db.increment_times_searched([job[0].job_id, job[0].times_searched+1])
                } else {
                    console.log(searchTerm)
                    google.search(searchTerm)
                        .then(images => {
                           //If job is not in the database, create it in jobs table
                            db.post_job([searchTerm, images[0].url])
                            .then( job => { 
                                //Returns list of all cities and all their information in an object
                                db.get_cities()
                                .then( cities => {
                                    //Iterates through cities, calls the getsalaries function above. 
                                    //On a 0.2 second time out to avoid bot detection
                                    for(let j=0; j<cities.length; j++){
                                        setTimeout(getSalaries(j, cities, job[0].job_id), j * 200)
                                    }
                                })
                            }) 
                        })
                    
                }
            })
        
    }, 

    getPopularJobs: (req, res) => {
        const db = req.app.get('db');
        db.get_popular_jobs()
            .then(jobs => res.status(200).send(jobs))
            .catch(() => res.status(500).send());
    },

    getSalariesByState: (req, res) => {
        const db = req.app.get('db');
        db.get_salaries_by_state(req.params.job)
            .then(jobs => res.status(200).send(jobs))
            .catch(() => res.status(500).send());
    },

    getSalariesByCity: (req, res) => {
        const db = req.app.get('db');
        db.get_salaries_by_city(req.params.job)
            .then(jobs => res.status(200).send(jobs))
            .catch(() => res.status(500).send());
    },

    getSalariesByRank: (req, res) => {
        const db = req.app.get('db');
        db.get_salaries(req.params.job)
            .then(jobs => res.status(200).send(jobs))
            .catch(() => res.status(500).send());
    }
}