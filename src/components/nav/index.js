import React from 'react';
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/actions/authedUser'
import { withRouter } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdbreact'

const navRoutes = [
  { label: 'Characters', route: '/characters' },
  { label: 'Encounters', route: '/encounters' },
  { label: 'Initiative Tracker', route: '/initiativeTracker' }
]

class Navbars extends React.Component {

  constructor(props) {
    super(props);
    const selected = this.props.location.pathname
    this.state = {
      open: false,
      isWideEnough: false,
      selected: selected || '/'
    };
    this.onClick = this.onClick.bind(this);
    this.userNavRoutes = [
      { label: 'My Account', route: '/user', handler: this.handleNavClick },
      { label: 'Logout', route: '/', handler: this.handleLogout}
    ]
  }

  onClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  handleLogout = (item) => {
    console.log()
    localStorage.removeItem('DNDTOKEN')
    this.props.dispatch(logoutUser('You have logged out'))
    this.props.history.push({
      pathname: item.route
    })
  }

  handleClickOutside = () => {
    if (this.state.open)
      this.setState({
        open: false
      })
  }

  handleNavClick = (newSelected) => {
    this.setState({
      selected: newSelected.route,
      open: false
    })
  }

  getNavItems = () => {
    return navRoutes.map(item => {
      return (
        <MDBNavItem key={item.label} active={item.route === this.state.selected}>
          <MDBNavLink to={item.route} onClick={() => this.handleNavClick(item)}>{item.label}</MDBNavLink>
        </MDBNavItem>
      )
    })
  }

  getUserNavItems = () => {
    return this.userNavRoutes.map(item => {
      return (
        <MDBDropdownItem key={item.label}>
          <MDBNavLink to={item.route} onClick={() => item.handler(item)}><span className="black-text">{item.label}</span></MDBNavLink>
        </MDBDropdownItem>
      )
    })
  }

  render() {
    console.log(this.state)
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
                <MDBCollapse isOpen={this.state.open} navbar>
                  <MDBNavbarNav right>
                    {this.getNavItems()}
                  </MDBNavbarNav>
                  <MDBNavbarNav right>
                    <MDBNavItem>
                      <MDBNavLink className="" to="#">Welcome {this.props.User.email}</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBDropdown>
                        <MDBDropdownToggle nav>
                          <img src={this.props.User.photoURL} className="rounded-circle z-depth-0" style={{ height: "35px", padding: 0 }} alt="" />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default" right>
                          {this.getUserNavItems()}
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </MDBNavItem>
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

export default withRouter(connect(mapStateToProps)(onClickOutside(Navbars)))
