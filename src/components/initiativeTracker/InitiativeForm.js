import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { createInitiative } from '../../redux/actions/initiatives'
import EncounterSelect from '../encounters/EncounterSelect'
import CharacterSelect from '../characters/CharacterSelect'

const sortByName = (a, b) => {
   if (a.name < b.name) return -1
   if (a.name < b.name) return 1
   return 0
}

const getSelectedCharacter = (options, prevCharacter) => {
   const characterIds = options.map(c => c._id)
   const index = characterIds.indexOf(prevCharacter._id)
   if (index === characterIds.length - 1) return options[index - 1]
   else return options[(index + 1) % (options.length)]
}

class InitiativeForm extends Component {
   constructor(props) {
      super(props)
      let encounter = false
      if (this.props.setEncounter) {
         encounter = this.props.setEncounter
      } else if (this.props.Encounters && this.props.Encounters.list && this.props.Encounters.list.length > 0) {
         encounter = this.props.Encounters.list.sort(sortByName)[0]
      }
      const characterOptions = this.filterCharacters(encounter)
      const character = characterOptions.length > 0 ? characterOptions[0] : false
      this.state = {
         updating: false,
         encounter,
         character,
         characterOptions,
         initiative: '',
         multiple: false,
         prefix: '',
         quantity: 1
      }
   }

   componentDidUpdate(prevProps, prevState) {
      if (this.props.setEncounter !== prevProps.setEncounter) {
         if (this.props.setEncounter && this.props.setEncounter._id !== this.state.encounter._id) {
            this.setState({
               encounter: this.props.setEncounter
            })
         }
         if (this.props.Initiatives.list.length !== prevProps.Initiatives.list.length) {
            const characterOptions = this.filterCharacters(this.state.encounter)
            const found = characterOptions.find(c => c._id === prevState.character._id)
            let newCharacter = prevState.character
            if (!found) {
               newCharacter = getSelectedCharacter(characterOptions, prevState.character)
            }
            this.setState({
               encounter: this.state.encounter,
               characterOptions: characterOptions,
               character: newCharacter
            })
         }
      } else {
         if (this.state.encounter && prevProps.Initiatives.list.length !== this.props.Initiatives.list.length) {
            this.setState({
               characterOptions: this.filterCharacters(this.state.encounter)
            })
         }
      }
   }

   filterCharacters(encounter) {
      if (!encounter) return []
      const { Characters, Initiatives } = this.props
      let characterList = Characters.list
      const initiativeList = Initiatives.list
      if (encounter) {
         let encounterPlayerCharacterIds = initiativeList.filter(initiative => {
            return ((initiative.encounter === encounter._id) && (initiative.characterStamp.player))
         }).map(i => i.characterStamp._id)
         encounterPlayerCharacterIds = [...new Set(encounterPlayerCharacterIds)]
         if (encounterPlayerCharacterIds.length > 0) {
            characterList = characterList.filter(character => {
               return character.player ? !encounterPlayerCharacterIds.includes(character._id) : true
            })
         }
      }
      return characterList.sort(sortByName)
   }

   handleCreate() {
      const { initiative, encounter, character, quantity, prefix, characterOptions } = this.state
      const payload = {
         initiative,
         encounter,
         character,
         quantity,
         prefix
      }

      this.props.dispatch(createInitiative(localStorage.getItem('DNDTOKEN'), payload))
      if (character.player) {
         const addedCharacter = characterOptions.find(c => c._id === character)
         const index = characterOptions.indexOf(addedCharacter)
         this.setState({
            character: getSelectedCharacter(characterOptions, character),
            characterOptions: [...characterOptions].splice(index, 1)
         })
      }
   }

   handleKeyDown = (event) => {
      switch (event.key) {
         case 'Enter':
            this.handleSubmit()
            break
         case 'Escape':
            this.handleCancel()
            break
         default:
            break
      }
   }

   handleChange = (type, value) => {
      const newState = {}
      switch (type) {
         case 'encounter':
            const characterOptions = this.filterCharacters(value)
            newState.characterOptions = characterOptions
            newState.character = characterOptions.length > 0 ? characterOptions[0] : false
            break
         case 'character':
            if (value.player) {
               newState.multiple = false
               newState.quantity = 1
            }
            break
         case 'multiple':
            newState.quantity = 1
            newState.prefix = ''
            break
         case 'quantity':
            value = parseInt(value)
            if (isNaN(value)) value = 1
            break
         default:
            break
      }
      newState[type] = value
      this.setState({
         ...newState
      })
   }

   validateInput() {
      //TODO
   }

   handleSubmit() {
      this.handleCreate()
   }

   render() {
      return (
         <MDBContainer style={this.state.style}>
            <MDBRow className="d-flex justify-content-center">
               <MDBCol md="8">
                  <MDBIcon icon="khanda" />
                  <MDBInput
                     label="Initiative"
                     required={true}
                     onChange={(e) => this.handleChange("initiative", e.target.value)}
                     onKeyDown={(e) => this.handleKeyDown(e)}
                     value={this.state.initiative}
                  />
                  {
                     this.props.Encounters.list && (
                        <EncounterSelect
                           encounters={this.props.Encounters.list.sort(sortByName)}
                           onChange={value => this.handleChange('encounter', value)}
                           value={this.state.encounter}
                           isDisabled={this.props.setEncounter ? true : false}
                        />
                     )
                  }

                  <br />
                  {
                     this.state.encounter ?
                        <CharacterSelect
                           characters={this.state.characterOptions}
                           onChange={(value) => this.handleChange('character', value)}
                           value={this.state.character}
                        /> :
                        <div>Please select Encounter first!</div>
                  }
                  {
                     !this.state.character.player ? (
                        <MDBInput
                           label="Bulk"
                           className="mycheckbox"
                           type="checkbox"
                           id="checkbox"
                           onChange={(e) => this.handleChange('multiple', e.target.checked)}
                           value={this.state.multiple ? "true" : "false"}
                        />
                     ) : <div><br /></div>
                  }
                  {
                     this.state.multiple && (
                        <React.Fragment>
                           <MDBInput
                              label="Quantity"
                              containerClass="mb-0"
                              required={true}
                              onChange={(e) => this.handleChange('quantity', e.target.value)}
                              onKeyDown={(e) => this.handleKeyDown(e)}
                              value={this.state.quantity.toString()}
                           />
                           <MDBInput
                              label="Prefix"
                              containerClass="mb-0"
                              required={true}
                              onChange={(e) => this.handleChange('prefix', e.target.value)}
                              onKeyDown={(e) => this.handleKeyDown(e)}
                              value={this.state.prefix}
                           />
                        </React.Fragment>
                     )
                  }
                  <div className="text-center">
                     <MDBBtn
                        type="button"
                        rounded
                        color="black"
                        className="btn-block z-depth-1a"
                        onClick={() => this.handleSubmit()}
                     >
                        Add to Encounter
                                    </MDBBtn>
                  </div>
               </MDBCol>
            </MDBRow>

         </MDBContainer>
      )
   }
}

export default InitiativeForm