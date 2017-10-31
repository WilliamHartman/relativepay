insert into jobs (job_name) values ($1) 
returning *;