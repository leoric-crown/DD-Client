import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import CreateCharacter from './CreateCharacter'
import MyCharacters from './MyCharacters'
import { connect } from 'react-redux'

class Characters extends React.Component {
  state = {
    activeButtonMyCharacters:true,
    lastClicked:"Characters"
  }

  toggleButtonNavigation = (lastClicked) => {
    this.setState((state, props) => {
      if (state.lastClicked !== lastClicked ) {
        return {
          activeButtonMyCharacters: !state.activeButtonMyCharacters,
          lastClicked
        }
      } else {
        return
      }
  });
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
          <MDBBtn onClick={() => this.toggleButtonNavigation("Characters")} color="black">
          <MDBIcon  icon="magic" size="lg"/>
            &nbsp;
            My Characters
            </MDBBtn>
          <MDBBtn onClick={() => this.toggleButtonNavigation("Create_Character")}  color="black">
          <MDBIcon icon="plus" size="lg"/>
            &nbsp;
            Create Character
          </MDBBtn>
        </MDBCol>
        </MDBRow>
        <MDBIcon color="black" icon="hat-wizard" />
        </div>
        {this.state.activeButtonMyCharacters
          ?
            <div className='my-characters'>
              {
                this.props.Characters.length > 0
                ?
                this.props.Characters.map((character) => (
                  <MyCharacters
                    character={character}
                    length={this.props.Characters.length}
                    key={character._id}
                  />
                ))
                : <h3>No Characters just yet...</h3>
              }
            </div>
          :
            <div className="my-characters">
              <CreateCharacter
                toggleButtonNavigation={this.toggleButtonNavigation}
              />
            </div>
        }
      </MDBContainer>


    )
  }
}

let styles = {
  marginTop: '5em',
};

function mapStateToProps({ User, Characters }) {
  return {
    User,
    Characters
  }

}

export default connect(mapStateToProps)(Characters)
