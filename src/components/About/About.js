import React from 'react';
import './About.css';

export default function About(){
    return(
        <div className="about">
        <div className='about-image-container'>
          <h1 className='about-image-title'>About RelativePay</h1>
        </div>
        <div className='about-main-content'>
          <div className='about-top-search-container'>
            <h1>What we do</h1>
            <p>
                RelativePay takes the average salary data from glassdoor.com and merges it with the cost of living index from city-data.com. This gives job seekers more information about how far a salary in their desired field will go in each city.
            </p>
            <h1>How it works</h1>
            <p>
                The cost of living index (CoLI) is a number given to every city based on the average cost of rent, houses, gas, and products in a city. It is set so the average for the USA is 100, so a city with a CoLI of 110 is 10% more expensive than the US average. 
            </p>
            <p>
                We then take the average salary for the searched job and calculate a salary relative to the average cost of living in the US.
            </p>
            <h1>Example</h1>
            <p>Let us take 3 cities, Honolulu (CoLI = 196.9), Sacramento (100.5), and El Paso (82.7), and round those CoLI to 200, 100, and 80. </p>
            <p>If you made $50,000 in each one, the relative salaries would be as follows:</p>
            <ul className='about-ul-title'>Relative Salaries</ul>
            <ul>Honolulu - $25,000</ul>
            <ul>Sacramento - $50,000</ul>
            <ul>El Paso - $62,500</ul>
            <p>As you can see, because the cost of living in Honolulu is double the average, the relative salary is half. Sacramento is right at the average so it stays the same, and El Paso is below, so it goes up.</p>
            <p>That said, you can expect to earn more in places where cost of living is higher. However the salaries often don't keep up with the increased CoLI.</p>
            <p>Lets use a real example, with the real CoLI now. Our job to search will be Elementary School Teacher</p>
            <ul className='about-ul-title'>Raw Salaries</ul>
            <ul>Honolulu - $47,164</ul>
            <ul>Sacramento - $47,486</ul>
            <ul>El Paso - $39,870</ul>
            <p>Now if we calculate the relative salaries using the cities actual CoLI</p>
            <ul className='about-ul-title'>Relative Salaries</ul>
            <ul>Honolulu - $23,953</ul>
            <ul>Sacramento - $47,249</ul>
            <ul>El Paso - $48,210</ul>
            <p>Even though elementary school teachers in El Paso make $7,616 less than their Sacramento counterparts, their money actually goes about $1,000 further. Teachers in Honolulu make less than teachers in Sacramento, despite the massive difference in cost of living.</p>
          </div>
        </div>
      </div>
    );
}