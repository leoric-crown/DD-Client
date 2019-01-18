import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler,MDBCollapse, MDBNavItem, MDBNavLink, MDBMask, MDBView, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem, NavItem, NavLink } from 'mdbreact'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authedUser'

class Navbars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    if(!this.props.User.authenticated) {
      this.props.history.push({
        pathname: '/',
        state: { needsLogin: true, redirectURL:"" }
      })
    }
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  handleLogout = () => {
    this.props.dispatch(logoutUser())
    this.props.history.push({
      pathname: '/',
    })
  }

  render() {
    return (
      <div>
        <header>
            <MDBNavbar color="black" fixed="top" dark expand="md">
              <MDBNavbarBrand href="/">
                <strong>Dnd Turn Tracker</strong>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav right>
                  <MDBNavItem active>
                    <MDBNavLink to="/">Encounters</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Characters</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                <NavItem>
               <NavLink className="" to="#">Welcome {this.props.User.email}</NavLink>
             </NavItem>
             <NavItem>
               <Dropdown>
                 <DropdownToggle className="dopdown-toggle" nav>
                   <img src={this.props.User.photoURL} className="rounded-circle z-depth-0" style={{height: "35px", padding: 0}} alt="" />
                 </DropdownToggle>
                 <DropdownMenu className="dropdown-default" right>
                   <DropdownItem href="#!">My account</DropdownItem>
                   <DropdownItem onClick={this.handleLogout} href="#!">Log out</DropdownItem>
                 </DropdownMenu>
               </Dropdown>
             </NavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>

          <MDBView src="https://media-waterdeep.cursecdn.com/attachments/0/770/genasi1k.jpg">
            <MDBMask overlay="red-slight" className="flex-center flex-column text-black">
              <h2>Welcome to DnD Turn Tracker</h2>
              <h5>Coming soon...</h5>
            </MDBMask>
          </MDBView>
        </header>
      </div>
    );
  }
}
function mapStateToProps({ User }) {
  return {
    User
  }

}

export default connect(mapStateToProps)(Navbars)
