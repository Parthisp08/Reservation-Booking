import './navbar.css';

const Navbar = () => {
  return (
    <div className="navBar">
        <div className="navbarContainer">
            <span className="logo">Parthi DevBooking</span>
            <div className="navbarButton">
                <button className="navBtn">Register</button>
                <button className="navBtn">Login</button>
            </div>
        </div>

    </div>
  )
}

export default Navbar