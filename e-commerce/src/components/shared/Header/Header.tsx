import { NavLink } from 'react-router-dom';
import styles from './styles.module.css'
import {Badge,Navbar,Nav,Container, NavDropdown} from 'react-bootstrap'
import HeaderLeftBar from './HeaderLeftBar/HeaderLeftBar';
import { useAppDispatch, useAppSelector } from '@redux/hook';
import { authLogout } from '@redux/auth/authSlice';
import { actGetWishlist } from '@redux/wishlist/wishlistSlice';
import { useEffect } from 'react';

const {headerContainer , headerLogo } = styles;
const Header = () => {
  const dispatch=useAppDispatch();
  const{accessToken,user}=useAppSelector((state)=>state.auth)
  useEffect(()=>{
    if(accessToken){
      dispatch(actGetWishlist("productIds"))
    }
  },[dispatch,accessToken])

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
            <span>Our</span> <Badge>eCommerce</Badge>
        </h1>
        <HeaderLeftBar/>
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
            {!accessToken?
            <>
              <Nav.Link as={NavLink} to={"login"}>Login</Nav.Link>
              <Nav.Link as={NavLink} to={"register"}>Register</Nav.Link>
            </>:
            <>
              <NavDropdown title={`Welcome : ${user?.firstName} ${user?.lastName}`} id="basic-nav-dropdown" >
                <NavDropdown.Item to="profile" as={NavLink} end>Profile</NavDropdown.Item>
                <NavDropdown.Item to="profile/orders" as={NavLink} >Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item to="/" as={NavLink} onClick={()=>{dispatch(authLogout())}}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
