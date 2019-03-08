import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import MyCharacters from '../components/characters/MyCharacters'
import { connect } from 'react-redux'
import { checkToken } from '../utils/misc'
import '../css/Cards.css'
import MyMDBModal from '../components/modal/MDBModal';
import CharacterForm from '../components/characters/form/CharacterForm';

class Characters extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         creating: false,
         message: ''
      }

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

   toggleModal = () => {
      this.setState({
         creating: !this.state.creating
      })
   }

   render() {
      const characterList = this.props.Characters.list
      return (
         <div>
            {this.props.User.authenticated &&
               characterList && (
                  <React.Fragment>
                     {this.state.creating &&
                        <MyMDBModal
                           toggle={this.toggleModal}
                           isOpen
                           position="center"
                           canConfirm={false}
                           labels={{
                              header: 'Create Character'
                           }}
                        >
                           <CharacterForm done={this.toggleModal}/>
                        </MyMDBModal>
                     }
                     <div className="secondary-nav">
                        <MDBRow>
                           <MDBCol md='12'>
                              <MDBBtn onClick={this.toggleModal} color="black">
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
                              <strong>Characters</strong>
                           </h1>
                        </div>
                        {this.props.Errors.deleteWarning && (
                           <h2>{this.props.Errors.deleteWarning.message}</h2>
                        )}
                        <div>
                           {
                              characterList.length > 0
                                 ?
                                 <ol className='card-list'>
                                    {characterList.map((character) => (
                                       <li key={character._id}>
                                          <div className="card-item">
                                             <MyCharacters
                                                character={character}
                                                length={characterList.length}
                                                onEdit={character => this.setState({ updating: character })}
                                             />
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
                     </MDBContainer>
                  </React.Fragment>
               )}
         </div>


      )
   }
}

function mapStateToProps({ User, Characters, Errors }) {
   const filteredCharacters = { ...Characters }
   if (filteredCharacters.list && !User.isDM) filteredCharacters.list = filteredCharacters.list
      .filter(character => character.user === User._id)
   return {
      User,
      Characters: filteredCharacters,
      Errors
   }

}

export default connect(mapStateToProps)(Characters)
