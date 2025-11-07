import React from 'react';
import { Helmet } from 'react-helmet';
import photo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import RandomGenerator from './RandomGenerator';
const HomePage : React.FC = () => {
  

return (
    <>
      <Helmet>
        <title>Home Page - SpyroNet</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,100..900;1,100..900&display=swap" />
      </Helmet>

      <div>
        <header>
            <section className="logo-section"><img src={photo} alt="logo" className="logo-image" /></section>
            <section className="happy-worker-section"><p>Happy worker of the day: </p><RandomGenerator/></section>
        </header>
         
            <nav>
             <ul>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/random-generator">Random Generator</Link></li>
               <li><Link to="/game">Games reservation</Link></li>
              <li><a href="contact.html">Contact</a></li>
             </ul>
            </nav>

        <main>
            <section className="main-section">
                <h1>Welcome to SpyroNet</h1>
                <img src="https://itwiz.pl/wp-content/uploads/2022/03/spyrosoft-gielda.jpg" alt="Description of image" />
                <p>Your trusted partner in cybersecurity solutions. At Spyronet, we specialize in providing top-notch
                    services to protect your digital assets and ensure your online safety.</p>
                <p>Explore our website to learn more about our offerings and how we can help you stay secure in the digital
                    world.</p>
            </section>
        </main>
        <footer>by Katarzyna Dabrowska & Kaja Wojcik</footer>
      </div>
</>
  );
};
export default HomePage;