delete from salaries
where job_id = (select job_id from jobs where job_name = $1);