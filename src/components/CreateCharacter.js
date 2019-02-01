import React, {Component} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux'
import { createCharacter } from '../actions/characters'
import validator from 'validator';

class CreateCharacter extends Component {
  state = {
    name:'',
    level:'',
    ac:'',
    hp:'',
    url:'',
    characterPic: null
  }

  componentDidMount() {

  }

  handleChange = (type, value) => {
    switch(type) {
      case 'name':
        this.setState({
          name: value
        })
        break
      case 'level':
        this.setState({
          level: value
        })
        break
      case 'armor':
        this.setState({
          ac: value
        })
        break;
      case 'hp':
        this.setState({
          hp: value
        })
        break
      case 'url':
        this.setState({
          url: value
        })
        break
      case 'file':
        console.log(value)
        this.setState({
          characterPic: value
        })
        break
      default:
       return;
    }
  }

  handleSubmit = (toggleCharacterNavigation) => {
    let characterPic = ""
    if (!validator.isURL(this.state.url)) {
      characterPic = null
    } else {
      characterPic = this.state.url
    }
    const payload = {
    name: this.state.name,
    level: this.state.level,
    armorclass: this.state.ac,
    player:true,
    hitpoints: this.state.hp,
    maxhitpoints: this.state.hp,
    user: this.props.User.userId,
    characterPic: this.state.characterPic ? this.state.characterPic : null
    }
    console.log(payload)

   this.props.dispatch(createCharacter(localStorage.getItem('DNDTOKEN'), payload))
   toggleCharacterNavigation("Submit_Character")

  }
  render() {
    console.log(this.state)
    const { toggleButtonNavigation } = this.props
    return(
      <MDBContainer className=''>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="8">
            <MDBCard className="create-character">
              <MDBCardBody className="mx-4 d-row" >
                <div className="text-center">
                  <h3 className="mb-5">
                    <strong>
                      &nbsp;Create Character
                    </strong>
                  </h3>
                </div>
                  <MDBIcon icon="khanda" />
                  <MDBInput
                    label="Name"
                    group
                    containerClass="mb-0"
                    required={true}
                    getValue={(e) => this.handleChange("name",e)}
                  />
                  <MDBInput
                    label="Level"
                    group
                    type="email"
                    getValue={(e) => this.handleChange("level",e)}
                  />
                  <MDBInput
                    label="Armour Class"
                    containerClass="mb-0"
                    getValue={(e) => this.handleChange("armor",e)}
                  />
                  <MDBInput
                    label="Max Hit Points"
                    containerClass="mb-0"
                    getValue={(e) => this.handleChange("hp",e)}
                  />
                  <MDBInput
                    label="Photo URL"
                    containerClass="mb-0"
                    getValue={(e) => this.handleChange("url",e)}
                  />
                  <MDBInput
                    type="file"
                    containerClass="mb-0"
                    onChange={(e) => this.handleChange("file",e.target.files[0])}
                  />
                  <br />
                  <div className="text-center">
                      <MDBBtn
                        type="button"
                        rounded
                        color="black"
                        className="btn-block z-depth-1a"
                        onClick={() => this.handleSubmit(toggleButtonNavigation)}
                      >
                        Create
                      </MDBBtn>
                  </div>
                </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

      </MDBContainer>
    )
  }
}

function mapStateToProps({ User }) {
  return {
    User
  }

}

export default connect(mapStateToProps)(CreateCharacter)
