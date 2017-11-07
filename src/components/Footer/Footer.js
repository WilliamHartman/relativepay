import React from 'react';
import './Footer.css';
import FacebookIcon from 'react-icons/lib/fa/facebook-square';
import GoogleIcon from 'react-icons/lib/fa/google-plus-square';
import LinkedinIcon from 'react-icons/lib/fa/linkedin-square';
import TwitterIcon from 'react-icons/lib/fa/twitter-square';

export default function Footer(){
    return (
        <div className='footer'>
            <div className="social-media">
                <FacebookIcon 
                    size={35}
                    color={'white'}
                />
                <GoogleIcon 
                    size={35}
                    color={'white'}
                />
                <LinkedinIcon 
                    size={35}
                    color={'white'}
                />
                <TwitterIcon 
                    size={35}
                    color={'white'}
                />
            </div>
        </div>
    )
}