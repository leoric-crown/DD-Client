import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux'
import { createCharacter, patchCharacter, cancelEditCharacter } from '../../actions/characters'
import validator from 'validator';

const levelOptions = (() => {
  const levels = Array.from(Array(21).keys())
  return levels.map(level => {
    if (level === 0) return (
      <option key={level} value='' disabled> Choose level... </option>
    )
    return (
      <option key={level} value={level}>{level}</option>
    )
  })
})()

const armorClassOptions = (() => {
  const armorClasses = Array.from(Array(31).keys())
  return armorClasses.map(armorClass => {
    if (armorClass === 0) return (
      <option key={armorClass} value='' disabled> Choose Armor Class... </option>
    )
    return (
      <option key={armorClass} value={armorClass}>{armorClass}</option>
    )
  })
})()

class CharacterForm extends Component {
  state = {
    name: '',
    level: '1',
    armorclass: '10',
    maxhitpoints: '',
    url: '',
    characterPic: null,
    updating: false,
    levelOptions: levelOptions,
    armorClassOptions: armorClassOptions,
    style: {}
  }

  componentDidMount() {
    if (!this.state.updating && this.props.character) {
      const { armorclass, level, maxhitpoints, name } = this.props.character
      this.setState({
        name,
        level,
        armorclass,
        maxhitpoints,
        updating: this.props.character,
        style: {
          width: '25em'
        }
      })
    }
  }

  validateInput = () => {
    //TODO
  }

  handleKeyDown = (event) => {
    switch (event.key) {
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
    toggleCharacterNavigation('Submit_Character')
  }

  handleUpdate = () => {
    const { updating, characterPic, style, levelOptions, armorClassOptions, ...changedCharacter } = this.state
    const fieldsToUpdate = Object.entries(changedCharacter).filter(([key, value]) => {
      return (updating[key] && updating[key] !== value)
    }).map(([propName, value]) => {
      return {
        propName,
        value
      }
    })
    if (fieldsToUpdate.length > 0) {
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
      <MDBContainer style={this.state.style} className=''>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="8">
            <MDBCard style={{ backgroundColor: 'transparent' }} className="create-character">
              <MDBCardBody className="mx-4 d-row" >
                <div className="text-center">
                  <h3 className="mb-5">
                    <strong>
                      &nbsp;{this.state.updating ? `Edit '${this.state.updating.name}'`
                        :
                        <MDBIcon className="black-text" icon='magic' size='4x' />}
                    </strong>
                  </h3>
                </div>
                <MDBInput
                  label="Name"
                  group
                  containerClass="mb-0"
                  required={true}
                  onChange={(e) => this.handleChange("name", e.target.value)}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                  value={name}
                />
                <label>Level</label>
                <select
                  id='level'
                  value={level}
                  onChange={e => this.handleChange('level', e.target.value)}>
                  {this.state.levelOptions}
                </select>
                <br />
                <label>AC</label>
                <select
                  label="selectLabel"
                  id='armorclass'
                  value={armorclass}
                  onChange={e => this.handleChange('armorclass', e.target.value)}>
                  {this.state.armorClassOptions}
                </select>
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
                <br />
                {this.state.updating &&
                  <div className="text-center">
                    <MDBBtn
                      type="button"
                      rounded
                      color="black"
                      className="btn-block z-depth-1a"
                      onClick={() => this.handleCancel()}
                    >
                      Cancel
                    </MDBBtn>
                  </div>}
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

// TODO: Move all these inline css to sepate file
// const formHeaderStyle = {
//   color: 'black'
// }

export default connect(mapStateToProps)(CharacterForm)
