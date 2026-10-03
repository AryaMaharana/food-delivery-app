import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {modules} from '../services/api';
import {useAuth} from '../context/AuthContext';

export default function Navbar() {
  const {user, logout} = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    modules().then(r => setItems(r.data.filter(m => m.uiEnabled))).catch(() => setItems([]));
  }, []);

  return (
    <nav>
      <Link className="brand" to="/"><span>fork</span>folk</Link>
      <div className="navlinks">
        {items.map(item => <Link key={item.serviceId} to={item.route}>{item.label}</Link>)}
        {user ? (
          <>
            <span className="userChip">Hi, {user.fullName?.split(' ')[0]}</span>
            <button className="ghost" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="ghost" to="/login">Sign in</Link>
            <Link className="navCta" to="/register">Get started</Link>
          </>
        )}
      </div>
    </nav>
  );
}
