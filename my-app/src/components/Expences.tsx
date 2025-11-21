import { Helmet } from 'react-helmet';
import photo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import RandomGenerator from './RandomGenerator';
import expensesData from '../assets/wydatki.json';
const Expences: React.FC = () => {



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
                    <section className="main-section">
                        <table className='expenses-table'>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expensesData.map((expense, index) => (
                                    <tr key={index}>
                                        <td>{expense.category}</td>
                                        <td>{expense.description}</td>
                                        <td>{expense.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </main>
                <footer>by Katarzyna Dabrowska & Kaja Wojcik</footer>
            </div>
        </>
    );

};
export default Expences;