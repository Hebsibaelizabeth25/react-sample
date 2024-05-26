import logo from '../../assets/logon.jpg';
import { Link } from 'react-router-dom';
import './navbar.css'

function Navbar() {
    return (
        <>
            <div className='navbar'>
                <div>
                    <img id='logo-img' src={logo} alt="Logo" />
                </div>
                <div>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About us</Link></li>
                        <li><Link to='/contact'>Contact Us</Link></li>
                        <li>
                            <div className="dropdown">
                                <Link to='/login'>Login</Link>
                                <div className="dropdown-content">
                                    <Link to='/adminpage'>Admin Login</Link>
                                    <Link to='/teacherlogin'>Teacher Login</Link>
                                    <Link to='/studentlogin'>Student Login</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
export default Navbar