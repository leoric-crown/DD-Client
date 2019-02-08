import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import CreateCharacter from './CreateCharacter'
import MyCharacters from './MyCharacters'
import { connect } from 'react-redux'
import { checkToken } from '../utils/misc'
import { logoutUser } from '../actions/authedUser';

class Characters extends React.Component {
  state = {
    activeButtonMyCharacters: true,
    lastClicked: "Characters"
  }

  toggleButtonNavigation = (lastClicked) => {
    this.setState((state, props) => {
      if (state.lastClicked !== lastClicked) {
        return {
          activeButtonMyCharacters: !state.activeButtonMyCharacters,
          lastClicked
        }
      } else {
        return
      }
    });
  }

  componentWillMount() {
    if (!this.props.User.authenticated) {
      const token = localStorage.getItem('DNDTOKEN')
      if (token) {
        checkToken.bind(this)(token)
      } else {
        this.props.history.push({
          pathname: '/'
        })
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.User.authenticated &&
          this.props.Characters && (
            <MDBContainer style={styles} className="">
              <div className="characters-Container">
                <MDBRow>
                  <MDBCol md='12' className="mb-4">
                    <MDBBtn onClick={() => this.toggleButtonNavigation("Characters")} color="black">
                      <MDBIcon icon="magic" size="lg" />
                      &nbsp;
                      My Characters
              </MDBBtn>
                    <MDBBtn onClick={() => this.toggleButtonNavigation("Create_Character")} color="black">
                      <MDBIcon icon="plus" size="lg" />
                      &nbsp;
                      Create Character
            </MDBBtn>
                  </MDBCol>
                </MDBRow>
                <MDBIcon color="black" icon="hat-wizard" />
              </div>
              {this.state.activeButtonMyCharacters
                ?
                <div>
                  {
                    this.props.Characters.length > 0
                      ?
                      <ol className='my-characters'>
                        {this.props.Characters.map((character) => (
                          <li key={character._id}>
                            <div className="individual-character">
                              <MyCharacters
                                character={character}
                                length={this.props.Characters.length}
                              />
                            </div>
                          </li>
                        ))}
                      </ol>

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
          )}
      </div>


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
