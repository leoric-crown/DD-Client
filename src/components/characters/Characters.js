import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import CharacterForm from './form/CharacterForm'
import MyCharacters from './MyCharacters'
import { connect } from 'react-redux'
import { checkToken } from '../../utils/misc'

class Characters extends React.Component {
  state = {
    activeButtonMyCharacters: true,
    editing: false,
    lastClicked: 'Characters'
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
            <React.Fragment>
              <div className="characters-container">
                <MDBRow>
                  <MDBCol md='12'>
                    <MDBBtn onClick={() => this.toggleButtonNavigation("Characters")} color="black">
                      <MDBIcon icon="magic" size="lg" />
                      &nbsp;
                      <strong className='navigation-button'>
                        My Characters
                      </strong>
                    </MDBBtn>
                    <MDBBtn onClick={() => this.toggleButtonNavigation("Create_Character")} color="black">
                      <MDBIcon icon="plus" size="lg" />
                      &nbsp;
                      <strong className='navigation-button'>
                        Create Characters
                      </strong>
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </div>
              <MDBContainer style={styles} className="justify-content-center">
                <div className="page-heading">
                  <h1 className="page-title">
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
                                {(this.state.editing &&
                                  this.state.editing._id === character._id) ? (
                                    <CharacterForm
                                      character={character}
                                      done={() => this.setState({ editing: false })}
                                    />) :
                                  <MyCharacters
                                    character={character}
                                    length={characterList.length}
                                    onEdit={character => this.setState({ editing: character })}
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
            </React.Fragment>

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
