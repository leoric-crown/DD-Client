import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux'
import { createCharacter, patchCharacter, cancelEditCharacter } from '../actions/characters'
import validator from 'validator';

class CharacterForm extends Component {
  state = {
    name: '',
    level: '',
    armorclass: '',
    maxhitpoints: '',
    url: '',
    characterPic: null,
    updating: false
  }

  componentDidMount() {
    if (!this.state.updating && this.props.character) {
      const { armorclass, level, maxhitpoints, name } = this.props.character
      this.setState({
        name,
        level,
        armorclass,
        maxhitpoints,
        updating: this.props.character
      })
    }
  }

  validateInput = () => {
    //TODO
  }

  handleKeyDown = (event) => {
    switch(event.key) {
      case 'Enter':
        this.handleSubmit(this.props.toggleButtonNavigation)
        break
      case 'Escape':
        this.handleCancel()
        break
      default:
        break
    }
  }

  handleChange = (type, value) => {
    switch (type) {
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
      case 'armorclass':
        this.setState({
          armorclass: value
        })
        break;
      case 'maxhitpoints':
        this.setState({
          maxhitpoints: value
        })
        break
      case 'url':
        this.setState({
          url: value
        })
        break
      case 'file':
        this.setState({
          characterPic: value
        })
        break
      default:
        return;
    }
  }

  handleCreate = (toggleCharacterNavigation) => {
    let picUrl = ""
    if (!validator.isURL(this.state.url)) {
      picUrl = null
    } else {
      picUrl = this.state.url
    }
    const payload = {
      name: this.state.name,
      level: this.state.level,
      armorclass: this.state.armorclass,
      player: true,
      maxhitpoints: this.state.maxhitpoints,
      user: this.props.User.userId,
      characterPic: this.state.characterPic ? this.state.characterPic : picUrl
    }

    this.props.dispatch(createCharacter(localStorage.getItem('DNDTOKEN'), payload))
    toggleCharacterNavigation("Submit_Character")
  }

  handleUpdate = () => {
    const { updating, characterPic, ...changedCharacter } = this.state
    const fieldsToUpdate = Object.entries(changedCharacter).filter(([key, value]) => {
      return (updating[key] && updating[key] !== value)
    }).map(([propName, value]) => {
      return {
        propName,
        value
      }
    })
    if(fieldsToUpdate.length > 0) {
      this.props.dispatch(patchCharacter(localStorage.getItem('DNDTOKEN'), fieldsToUpdate, updating._id))
    } else {
      this.handleCancel()
    }
  }

  handleSubmit = (toggleCharacterNavigation) => {
    if (!this.state.updating) {
      this.handleCreate(toggleCharacterNavigation)
    } else {
      this.handleUpdate()
    }
  }

  handleCancel = () => {
    this.props.dispatch(cancelEditCharacter())
  }

  render() {
    const { name, level, armorclass, maxhitpoints } = this.state
    const { toggleButtonNavigation } = this.props
    return (
      <MDBContainer className=''>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="8">
            <MDBCard className="create-character">
              <MDBCardBody className="mx-4 d-row" >
                <div className="text-center">
                  <h3 className="mb-5">
                    <strong>
                      &nbsp;{this.state.updating ? `Edit Character '${this.state.updating.name}'` : 'Create Character'}
                    </strong>
                  </h3>
                </div>
                <MDBIcon icon="khanda" />
                <MDBInput
                  label="Name"
                  group
                  containerClass="mb-0"
                  required={true}
                  onChange={(e) => this.handleChange("name", e.target.value)}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                  value={name}
                />
                <MDBInput
                  label="Level"
                  group
                  type="email"
                  onChange={(e) => this.handleChange("level", e.target.value)}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                  value={level.toString()}
                />
                <MDBInput
                  label="Armor Class"
                  containerClass="mb-0"
                  onChange={(e) => this.handleChange("armorclass", e.target.value)}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                  value={armorclass.toString()}
                />
                <MDBInput
                  label="Max Hit Points"
                  containerClass="mb-0"
                  onChange={(e) => this.handleChange("maxhitpoints", e.target.value)}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                  value={maxhitpoints.toString()}
                />
                {!this.state.updating && 
                (
                  <div>
                    <MDBInput
                      label="Photo URL"
                      containerClass="mb-0"
                      onChange={(e) => this.handleChange("url", e.target.value)}
                      onKeyDown={(e) => this.handleKeyDown(e)}
                    />
                    <MDBInput
                      type="file"
                      containerClass="mb-0"
                      onChange={(e) => this.handleChange("file", e.target.files[0])}
                      onKeyDown={(e) => this.handleKeyDown(e)}
                    />
                  </div>
                )}
                <br />
                <div className="text-center">
                  <MDBBtn
                    type="button"
                    rounded
                    color="black"
                    className="btn-block z-depth-1a"
                    onClick={() => this.handleSubmit(toggleButtonNavigation)}
                  >
                    {this.state.updating ? 'Save' : 'Create'}
                  </MDBBtn>
                </div>
                <br/>
                <div className="text-center">
                  {this.state.updating && 
                    <MDBBtn
                    type="button"
                      rounded
                      color="black"
                      className="btn-block z-depth-1a"
                      onClick={() => this.handleCancel()}
                  >
                    Cancel
                  </MDBBtn>
                  }
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

export default connect(mapStateToProps)(CharacterForm)
