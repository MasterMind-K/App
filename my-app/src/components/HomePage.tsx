import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import photo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import RandomGenerator from './RandomGenerator';
const HomePage: React.FC = () => {
  const slideIndex = useRef(1);

  useEffect(() => {
    showSlides(slideIndex.current);
  }, []);

  const plusSlides = (n: number) => {
    showSlides(slideIndex.current += n);
  }

  const currentSlide = (n: number) => {
    showSlides(slideIndex.current = n);
  }

  const showSlides = (n: number) => {
    let i: number;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
    if (slides.length === 0 || dots.length === 0) return;
    if (n > slides.length) {
      slideIndex.current = 1;
    }
    if (n < 1) {
      slideIndex.current = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex.current - 1].style.display = "block";
    console.log(dots[slideIndex.current - 1]);
    dots[slideIndex.current - 1].className += " active";
  }

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
          <section className="happy-worker-section"> <h3>Happy worker of the day:<RandomGenerator /></h3></section>
        </header>

        <nav>
          <ul className='nav-links'>
            <li className='links'><Link to="/">Home</Link></li>
            <li className='links'><Link to="/ToDo-List">To Do List</Link></li>
            <li className='links'><Link to="/Quiz">Quiz</Link></li>
            <li className='links'><Link to="/game">Games reservation</Link></li>
            <li className='links'><Link to="/XO">XO Game</Link></li>
            <li className='links'><Link to="/expenses">Expenses Tracker</Link></li>
            <li className='links'><Link to="/t-shirts">Koszulki firmowe</Link></li>
          </ul>
        </nav>

        <main>

          <section className="karuzela">
            <div className="slideshow-container">
              <div className="mySlides fade">
                <div className="numbertext">1 / 3</div>
                <img src="https://itwiz.pl/wp-content/uploads/2022/03/spyrosoft-gielda.jpg" />
                <div className="text">Caption Text</div>
              </div>
              <div className="mySlides fade">
                <div className="numbertext">1 / 3</div>
                <img src="https://itwiz.pl/wp-content/uploads/2022/03/spyrosoft-gielda.jpg" />
                <div className="text">Caption Text</div>
              </div>
              <div className="mySlides fade">
                <div className="numbertext">1 / 3</div>
                <img src="https://itwiz.pl/wp-content/uploads/2022/03/spyrosoft-gielda.jpg" />
                <div className="text">Caption Text</div>
              </div>
              <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
              <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
            </div>
            <div style={{ textAlign: "center" }}>
              <span className="dot" onClick={() => currentSlide(1)}></span>
              <span className="dot" onClick={() => currentSlide(2)}></span>
              <span className="dot" onClick={() => currentSlide(3)}></span>
            </div>
          </section>

          {/* <section classNameName="main-section">
            <h1>Welcome to SpyroNet</h1>
            <img src="https://itwiz.pl/wp-content/uploads/2022/03/spyrosoft-gielda.jpg" alt="Description of image" />
            <p>Your trusted partner in cybersecurity solutions. At Spyronet, we specialize in providing top-notch
              services to protect your digital assets and ensure your online safety.</p>
            <p>Explore our website to learn more about our offerings and how we can help you stay secure in the digital
              world.</p>
          </section> */}
        </main>
        <footer>by Katarzyna Dabrowska & Kaja Wojcik</footer>
      </div>
    </>
  );
};
export default HomePage;