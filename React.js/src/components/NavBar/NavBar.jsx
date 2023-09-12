import { Link, NavLink } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'

const categoryList =[
    {id:"abcfedsa", nombre:"Iluminacion", path:"iluminacion"},
    {id:"asdefcba", nombre:"Sonido", path:"sonido"},
]

const NavBar = () => {

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <NavLink className= "brand display-4" to='/node_modules'>Sonar</NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0">
                        {categoryList.map(({id, nombre, path})=> <NavLink 
                                          key={id}
                                         className="botones" to={`/categoria/${path}`}
                                                      >
                                                    {`${nombre}`}
                                                                 </NavLink>)}
                    </Nav>
                    <Nav>
                    <div className="d-flex">
                    <Link to='/cart'><CartWidget/></Link>
                    </div>    
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar


