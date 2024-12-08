import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './Components/Projects';
import About from './Components/About';
import AllPythonProjects from './Components/Projects/AllPythonProjects';
import AllReactProjects from './Components/Projects/AllReactProjects';
import AllRustProjects from './Components/Projects/AllRustProjects';
import Cv from './Components/cv';
import Contact from './Components/contact';
import CreateAccount from './Components/CreateAccount';
import Login from './Components/Login';
import Account from './Components/Account';
import Treaties from './Components/treaties';
import Home from './Components/Home';
import CreateTreaty from './Components/CreateTreaty';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects/python" element={<AllPythonProjects />} />
                <Route path="/projects/react" element={<AllReactProjects />} />
                <Route path="/projects/rust" element={<AllRustProjects />} />
                <Route path="/cv" element={<Cv />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/createaccount" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account" element={<Account />} />
                <Route path="/treaties" element={<Treaties />} />
                <Route path="/" element={<Home />} />
                <Route path="/createtreaty" element={<CreateTreaty />} />
            </Routes>
        </Router>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
