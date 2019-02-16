import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, NavLink } from 'mdbreact'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authedUser'
import { withRouter } from 'react-router-dom'

const navRoutes = [
  { label: 'Characters', route: '/dashboard/characters' },
  { label: 'Encounters', route: '/dashboard/encounters' },
  { label: 'Initiative Tracker', route: '/dashboard/initiativeTracker' }
]

class Navbars extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      selected: navRoutes[0].label
    };
    this.onClick = this.onClick.bind(this);
  }


  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  handleLogout = () => {
    localStorage.removeItem('DNDTOKEN')
    this.props.dispatch(logoutUser('You have logged out'))
    this.props.history.push({
      pathname: '/'
    })
  }

  handleNavClick = (newSelected) => {
    this.setState({
      selected: newSelected
    })
  }

  getNavItems = () => {
    return navRoutes.map(item => {
      const active = item.label === this.state.selected
      return (
        <MDBNavItem active={active}>
          <MDBNavLink to={item.route} onClick={() => this.handleNavClick(item.label)}>{item.label}</MDBNavLink>
        </MDBNavItem>
      )
    })
  }
  
  render() {
    return (
      <div>
        {this.props.User.authenticated && (
          <div>
            <header>
              <MDBNavbar color="black" fixed="top" dark expand="md">
                <MDBNavbarBrand href="/">
                  <strong className="text-in-black">Dnd Turn Tracker</strong>
                </MDBNavbarBrand>
                {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
                <MDBCollapse isOpen={this.state.collapse} navbar>
                  <MDBNavbarNav right>
                    {this.getNavItems()}
                  </MDBNavbarNav>
                  <MDBNavbarNav right>
                    <NavItem>
                      <NavLink className="" to="#">Welcome {this.props.User.email}</NavLink>
                    </NavItem>
                    <NavItem>
                      <Dropdown>
                        <DropdownToggle className="dopdown-toggle" nav>
                          <img src={this.props.User.photoURL} className="rounded-circle z-depth-0" style={{ height: "35px", padding: 0 }} alt="" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-default" right>
                          <DropdownItem>My account</DropdownItem>
                          <DropdownItem onClick={this.handleLogout}>
                            Logout
                        </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </NavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBNavbar>


            </header>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ User }) {
  return {
    User
  }

}

export default withRouter(connect(mapStateToProps)(Navbars))
