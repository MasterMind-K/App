import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import photo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import RandomGenerator from './RandomGenerator';
const Tshirts: React.FC = () => {
    const [name, setName] = useState<string>("");
    function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    const [surname, setSurname] = useState<string>("");
    function handleChangeSurname(e: React.ChangeEvent<HTMLInputElement>) {
        setSurname(e.target.value);
    }

    const [email, setEmail] = useState<string>("");
    function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    const [number, setNumber] = useState<string>("");
    function handleChangeNumber(e: React.ChangeEvent<HTMLInputElement>) {
        setNumber(e.target.value);
    }

    const [size, setSize] = useState<string>("");
    function handleChangeSize(e: React.ChangeEvent<HTMLSelectElement>) {
        setSize(e.target.value);
    }

    const [formData, setFormData] = useState<any[]>([]);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newEntry = {
            name: name,
            surname: surname,
            email: email,
            qualitity: number,
            size: size
        };
        setFormData([...formData, newEntry]);
        localStorage.setItem("formData", JSON.stringify(formData));
    }

    useEffect(() => {
        const saved = localStorage.getItem("formData");
        if (saved) {
            setFormData(JSON.parse(saved));
        }
    }, []);





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
                    <section className="happy-worker-section"><p>Happy worker of the day: </p><RandomGenerator /></section>
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

                    <section className="koszulki-form">
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="imie" id="imie" placeholder="Podaj imie..." value={name} onChange={handleChangeName} required /><br />
                            <input type="text" name="nazwisko" id="nazwisko" placeholder="Podaj nazwisko..." value={surname} onChange={handleChangeSurname} required /><br />
                            <input type="email" name="email" id="email" placeholder="Podaj email..." value={email} onChange={handleChangeEmail} required /><br />
                            <input type="number" name="ilosc" id="ilosc" placeholder="Podaj ilosc..." value={number} onChange={handleChangeNumber} required /><br />
                            <select name="rozmiar" id="rozmiar" value={size} onChange={handleChangeSize} required>
                                <option value="Rozmiar">Wybierz rozmiar</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select><br />
                            <input type="submit" id="zamow" value="Zamów" />
                        </form>
                        Current name: {name} <br />
                        Current surname: {surname}<br />
                        Current email: {email} <br />
                        Current numer: {number} <br />
                        Current size: {size}
                        <pre>{JSON.stringify(formData, null, 2)}</pre>
                    </section>
                </main>
                <footer>by Katarzyna Dabrowska & Kaja Wojcik</footer>
            </div>
        </>
    );
};
export default Tshirts;