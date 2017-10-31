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

        function getSalaries(i, cities, jobID){
            return function(){
                xray(`${gdURL}${cities[i].city_search_name}-${searchTerm}-salary-${cities[i].unique_str}${cities[i].unique_num+searchTerm.length}.htm`, 'div#MeanPay_M', [{
                    salary: ''
                }])((err, result) => {
                    if(result){
                        let regRes = result[0].salary.replace(/[^0-9.]/g,"");
                        salariesArray.push({city_id: cities[i].city_id, salary: regRes});
                        db.post_salary([cities[i].city_id, jobID, regRes])
                        console.log('success ', cities[i].city_name);
                    } else {
                        skippedCities.push(cities[i]);
                        console.log('fail ', cities[i].city_name);
                    } 
                });
            }
            res.status(200).send(salariesArray);
        }
        console.log('In getSalaries')
        db.job_in_db(searchTerm)
            .then(job => {
                console.log('In job in db')
                if(job.length > 0){
                    console.log('passed if')
                    db.get_salaries([searchTerm])
                        .then( salaries => {
                            console.log('sending back salaries')
                            res.status(200).send(salaries)
                        });
                } else {
                    console.log('failed if')
                    db.post_job([searchTerm])
                        .then( job => { 
                            console.log('posted job')
                            db.get_cities()
                            .then( cities => {
                                console.log('getting cities')
                                for(let j=0; j<cities.length; j++){
                                    setTimeout(getSalaries(j, cities, job[0].job_id), j * 1000)
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