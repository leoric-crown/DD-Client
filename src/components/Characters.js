import React from 'react'
import { MDBContainer, MDBRow, MDBCol,MDBBtnGroup, MDBBtn, MDBIcon } from 'mdbreact'
import CreateCharacter from './CreateCharacter'
import MyCharacters from './MyCharacters'
import { connect } from 'react-redux'

class Characters extends React.Component {
  state = {
    activeButton:"My Characters"
  }

  componentDidMount() {
    if (!this.props.User.authenticated) {
      this.props.history.push({
        pathname: '/'
      })
    }
  }
  render() {
    return (
      <MDBContainer style={styles} className="">
        <div className="characters-Container">
        <MDBRow>
          <MDBCol md='12' className="mb-4">
          <MDBBtn onClick={() => this.setState({activeButton: "My Characters"})} color="black">
          <MDBIcon  icon="magic" size="lg"/>
            &nbsp;
            My Characters
            </MDBBtn>
          <MDBBtn onClick={() => this.setState({activeButton: "Create Character"})}  color="black">
          <MDBIcon icon="plus" size="lg"/>
            &nbsp;
            Create Character
          </MDBBtn>
        </MDBCol>
        </MDBRow>
        <MDBIcon color="black" icon="hat-wizard" />
        </div>
        {this.state.activeButton === 'My Characters'
          ?
            <div>
              <MyCharacters />
            </div>
          :
            <div className="my-characters">
              <CreateCharacter />
            </div>
        }
      </MDBContainer>


    )
  }
}

let styles = {
  marginTop: '5em',
};

function mapStateToProps({ User }) {
  return {
    User
  }

}

export default connect(mapStateToProps)(Characters)
