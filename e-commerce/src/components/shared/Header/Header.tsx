import { NavLink } from 'react-router-dom';
import HeaderBasket from '../../ecommerce/HeaderBasket/HeaderBasket';
import styles from './styles.module.css'
import {Badge,Navbar,Nav,Container} from 'react-bootstrap'
import HeaderWishlist from '@components/ecommerce/HeaderWishlist/HeaderWishlist';
const {headerContainer , headerLogo , headerLeftBar} = styles;
const Header = () => {
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
            <span>Our</span> <Badge>Ecommerce</Badge>
        </h1>
        <div className={headerLeftBar}>
          <HeaderWishlist/>
          <HeaderBasket/>
        </div>
        </div>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={"/"}>Home</Nav.Link>
            <Nav.Link as={NavLink} to={"categories"}>Categories</Nav.Link>
            {/* <Nav.Link as={NavLink} to={"products"}>Products</Nav.Link> */}
            <Nav.Link as={NavLink} to={"about-us"}>About</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to={"login"}>Login</Nav.Link>
            <Nav.Link as={NavLink} to={"register"}>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
