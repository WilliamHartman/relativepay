select * from salaries
join jobs on salaries.job_id = jobs.job_id
join cities on salaries.city_id = cities.city_id
where job_name = $1
order by salaries.relative_salary desc;