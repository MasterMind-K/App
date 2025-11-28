import { Helmet } from 'react-helmet';
import photo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import RandomGenerator from './RandomGenerator';

function Led() {
  const on = () => fetch("http://10.102.11.39:3001/led/on", { method: "POST" });
  const off = () => fetch("http://10.102.11.39:3001/led/off", { method: "POST" });


  return (
    <div>
      <Helmet>
        <title>LED - SpyroNet</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,100..900;1,100..900&display=swap" />
      </Helmet>

      <header>
          <section className="logo-section"><img src={photo} alt="logo" className="logo-image" /></section>
          <section className="happy-worker-section"> <h3>Happy worker of the day:<RandomGenerator /></h3></section>
        </header>

      <nav>
        <ul className='nav-links'>
          <li className='links'><Link to="/">Home</Link></li>
          <li className='links'><Link to="/ToDo-List">To Do List</Link></li>
          <li className='links'><Link to="/Quiz">Quiz</Link></li>
          <li className='links'><Link to="/game">Board Games List</Link></li>
          <li className='links'><Link to="/XO">XO Game</Link></li>
          <li className='links'><Link to="/expenses">Expenses Tracker</Link></li>
          <li className='links'><Link to="/t-shirts">Company T-shirts</Link></li>
          <li className='links'><Link to="/led">LED</Link></li>
        </ul>
      </nav>

      <main>
        <section className='led'>
          <button onClick={on}>Włącz LED</button>
          <button onClick={off}>Wyłącz LED</button>
        </section>
      </main>
    </div>
  );

};
export default Led;