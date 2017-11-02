insert into jobs (job_name, image) values ($1, $2) 
returning *;