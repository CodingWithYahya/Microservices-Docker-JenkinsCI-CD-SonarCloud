import React from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Navbar = () => {
    return (
        <div className="navbar bg-neutral text-neutral-content">
            <Link className="btn btn-ghost normal-case text-xl" to="/villes">Villes</Link>
            <Link className="btn btn-ghost normal-case text-xl" to="/hotels">Hotels</Link>
            <Link className="btn btn-ghost normal-case text-xl" to="/chambres">Chambres</Link>
            <Link className="btn btn-ghost normal-case text-xl" to="/reservations">Reservations</Link>
            <Link className="btn btn-ghost normal-case text-xl" to="/users">Users</Link>
        </div>
    );
};

export default Navbar;
