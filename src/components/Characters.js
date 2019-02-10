import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import CharacterForm from './CharacterForm'
import MyCharacters from './MyCharacters'
import { connect } from 'react-redux'
import { checkToken } from '../utils/misc'

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
    const characterList = this.props.Characters.list
    return (
      <div>
        {this.props.User.authenticated &&
          characterList && (
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
                
              </div>
          <div class="page-heading">
            <h1 class="page-title">
              <strong>{this.state.activeButtonMyCharacters ? 'Characters' : 'Create Character'}</strong>
            </h1>
          </div>
          <br />
              {this.state.activeButtonMyCharacters
                ?
                <div>
                  {
                    characterList.length > 0
                      ?
                      <ol className='my-characters'>
                        {characterList.map((character) => (
                          <li key={character._id}>
                            <div className="individual-character">
                              {(this.props.Characters.editing &&
                                this.props.Characters.editing._id === character._id) ?
                                (<CharacterForm character={character}/>) :
                                <MyCharacters
                                  character={character}
                                  length={characterList.length}
                                />
                              }
                            </div>
                          </li>
                        ))}
                      </ol>
                      : 
                      <div className="d-flex justify-content-center">
                        <h3>No Characters just yet...</h3>
                      </div>
                  }
                </div>
                :
                <div className="my-characters">
                  <CharacterForm
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
