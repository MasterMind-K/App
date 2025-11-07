import React from 'react';
import { Helmet } from 'react-helmet';
import photo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import RandomGenerator from './RandomGenerator';
const GamePage : React.FC = () => {

  return (
    <>
      <Helmet>
        <title>Game Page - SpyroNet</title>
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
                <h1>Game Reservation</h1>
                <p>Here you can reserve a game board</p>
                <br />

                <table>
                    <tr>
                        <th>Title</th>
                        <th>Number of players</th>
                        <th>Recommended age</th>
                    </tr>
                    <tr>
                        <td>Game 1</td>
                        <td>2-4</td>
                        <td>10+</td>
                    </tr>
                </table>
            </section>


            
        </main>
        <footer>by Katarzyna Dabrowska & Kaja Wojcik</footer>
      </div>
</>
  );
};
export default GamePage;