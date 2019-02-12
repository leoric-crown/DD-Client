import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
// import CharacterForm from './CharacterForm'
// import MyCharacters from './MyCharacters'
import { connect } from 'react-redux'
import { checkToken } from '../utils/misc'
import { logoutUser } from '../actions/authedUser'

class InitiativeTracker extends React.Component {
    state = {

    }

    componentWillMount() {
        if (!this.props.User.authenticated) {
            const token = localStorage.getItem('DNDTOKEN')
            if (token) {
                checkToken.bind(this)(token)
            } else {
                this.props.dispatch(logoutUser('Please login to continue...'))
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
                    true && (
                        <MDBContainer style={styles} className="">
                            <div className="characters-Container">
                                <MDBRow>
                                    <MDBCol md='12' className="mb-4">
                                        <MDBBtn color="black">
                                            <MDBIcon icon="magic" size="lg" />
                                            &nbsp;
                                            Active Encounter
              </MDBBtn>
                                        <MDBBtn color="black">
                                            <MDBIcon icon="plus" size="lg" />
                                            &nbsp;
                                            Add Character
            </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBIcon color="black" icon="hat-wizard" />
                            </div>
                            <div className="d-flex justify-content-center">
                                <h3>Initiative Tracker goes here</h3>
                            </div>
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

export default connect(mapStateToProps)(InitiativeTracker)
