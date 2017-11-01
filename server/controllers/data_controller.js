const Xray = require('x-ray');
const request = require('request');
const fs = require('fs');
const xray = new Xray();

const gdURL = 'https://www.glassdoor.com/Salaries/';


module.exports = {
    getSalaries: (req, res) => {
        const db = req.app.get('db');
        var searchTerm = req.params.job;
        var salariesArray = [];
        var skippedCities = [];

        //Function where web scraping magic happens
        function getSalaries(i, cities, jobID){
            return function(){
                //Builds the url using lots of variabled. Filters for the id 'MeanPay_M in a div, returns it as a string in a object in an array
                xray(`${gdURL}${cities[i].city_search_name}-${searchTerm}-salary-${cities[i].unique_str}${cities[i].unique_num+searchTerm.length}.htm`, 'div#MeanPay_M', [{
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
                    } else {
                        //If no result, adds to skipped cities array
                        skippedCities.push(cities[i]);
                    } 
                });
                if(i === 114){
                    db.get_salaries([searchTerm])
                    .then( salaries => {
                        res.status(200).send(salaries)
                    });
                }
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
                            res.status(200).send(salaries)
                        });
                } else {
                    //If job is not in the database, create it in jobs table
                    db.post_job([searchTerm])
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
                }
            })
        
    }, 

    getJobs: (req, res) => {
        const db = req.app.get('db');
        db.get_jobs()
            .then(jobs => res.status(200).send(jobs))
            .catch(() => res.status(500).send());
    }
}