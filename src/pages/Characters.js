import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import CharacterForm from '../components/characters/form/CharacterForm'
import MyCharacters from '../components/characters/MyCharacters'
import { connect } from 'react-redux'
import { checkToken } from '../utils/misc'
import '../css/Cards.css'

class Characters extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         activeButtonMyCharacters: true,
         editing: false,
         lastClicked: 'Characters',
         message: '',
         displayMessage: 'will receive here',
      }

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
            checkToken.bind(this)(token, '/characters')
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
                     <div className="secondary-nav">
                        <MDBRow>
                           <MDBCol md='12'>
                              <MDBBtn onClick={() => this.toggleButtonNavigation("Characters")} color="black">
                                 <MDBIcon icon="magic" size="lg" />
                                 &nbsp;
                      <strong className='secondary-nav-button'>
                                    My Characters
                      </strong>
                              </MDBBtn>
                              <MDBBtn onClick={() => this.toggleButtonNavigation("Create_Character")} color="black">
                                 <MDBIcon icon="plus" size="lg" />
                                 &nbsp;
                      <strong className='secondary-nav-button'>
                                    Create Characters
                      </strong>
                              </MDBBtn>
                           </MDBCol>
                        </MDBRow>
                     </div>
                     <MDBContainer className="page-with-secondary-nav">
                        <div className="page-heading">
                           <h1 className="page-title">
                              <strong>{this.state.activeButtonMyCharacters ? 'Characters' : 'Create Character'}</strong>
                           </h1>
                        </div>
                        {this.state.activeButtonMyCharacters
                           ?
                           <div>
                              {
                                 characterList.length > 0
                                    ?
                                    <ol className='card-list'>
                                       {characterList.map((character) => (
                                          <li key={character._id}>
                                             <div className="card-item">
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
                           <div>
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

function mapStateToProps({ User, Characters }) {
   const filteredCharacters = { ...Characters }
   if (filteredCharacters.list && !User.isDM) filteredCharacters.list = filteredCharacters.list
      .filter(character => character.user === User._id)
   return {
      User,
      Characters: filteredCharacters
   }

}

export default connect(mapStateToProps)(Characters)
