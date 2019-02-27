import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import { connect } from 'react-redux'
import { checkToken } from '../../utils/misc'
import TurnTracker from './TurnTracker'

const ACTIVE_ENCOUNTER = 'ACTIVE_ENCOUNTER'
const ALL_ENCOUNTERS = 'ALL_ENCOUNTERS'

class InitiativeTracker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lastClicked: ACTIVE_ENCOUNTER
        }
    }

    toggleButtonNavigation = (lastClicked) => {
        this.setState((state, props) => {
            if (state.lastClicked !== lastClicked) {
                return {
                    lastClicked
                }
            }
            return
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
        const TurnTrackerAttributes = {
            setEncounter: this.state.lastClicked === ACTIVE_ENCOUNTER ? this.props.Encounters.active : false
        }
        return (
            <div>
                {
                    this.props.User.authenticated && this.props.Encounters.list && (
                        <React.Fragment>
                            <div className="characters-container">
                                <MDBRow>
                                    <MDBCol md='12' >
                                        <MDBBtn onClick={() => this.toggleButtonNavigation(ACTIVE_ENCOUNTER)} color="black">
                                            <MDBIcon icon="magic" size="lg" />
                                            &nbsp;
                                            Active Encounter
                                        </MDBBtn>
                                        <MDBBtn onClick={() => this.toggleButtonNavigation(ALL_ENCOUNTERS)} color="black">
                                            <MDBIcon icon="plus" size="lg" />
                                            &nbsp;
                                            All Encounters
                                        </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBIcon color="black" icon="hat-wizard" />
                            </div>
                            <MDBContainer style={styles} className="justify-content-center">
                                {
                                    this.state.lastClicked === ACTIVE_ENCOUNTER ? (
                                        this.props.Encounters.active ? (
                                            <TurnTracker
                                                {...TurnTrackerAttributes}
                                            />
                                        ) : (
                                                <div>
                                                    <br />
                                                    <h4 className='text-center'>No Active Encounter</h4>
                                                </div>
                                            )

                                    ) :
                                        <TurnTracker
                                            {...TurnTrackerAttributes}
                                        />

                                }
                            </MDBContainer>
                        </React.Fragment>
                    )}
            </div>


        )
    }
}

let styles = {
    marginTop: '8em',
};

function mapStateToProps({ User, Characters, Encounters, Initiatives }) {
    return {
        User,
        Characters,
        Encounters,
        Initiatives
    }

}

export default connect(mapStateToProps)(InitiativeTracker)
