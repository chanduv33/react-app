import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Route, Link } from 'react-router-dom'
import ViewCustomers from '../components/ViewCustomers'
import AddCustomer from '../components/AddCustomer'



function HeaderComponent() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Onebill</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
           <Link className="RouterNavLink"  to="/addCustomer">Add Customer</Link>
           <Link className="RouterNavLink" to="/viewCustomers">View Customers</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <Route path= "/" render={() => <h1>Home</h1>} /> */}
      <Route path="/viewCustomers" exact component={ViewCustomers} />
      <Route path="/addCustomer" exact component={AddCustomer} />
    </>
  )
}

export default HeaderComponent
