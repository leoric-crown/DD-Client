import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import { connect } from 'react-redux'
import { checkToken } from '../utils/misc'
import TurnTracker from '../components/initiativeTracker/TurnTracker'

const ACTIVE_ENCOUNTER = 'Active Encounter'
const ALL_ENCOUNTERS = 'All Encounters'

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
                checkToken.bind(this)(token, '/initiativeTracker')
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
                    this.props.User.authenticated && this.props.Encounters.list && this.props.Initiatives.list && (
                        <React.Fragment>
                            <div className="secondary-nav">
                                <MDBRow>
                                    <MDBCol md='12' >
                                        <MDBBtn onClick={() => this.toggleButtonNavigation(ACTIVE_ENCOUNTER)} color="black">
                                            <MDBIcon icon="magic" size="lg" />
                                            &nbsp;
                                            <strong className='secondary-nav-button'>
                                                Active Encounter
                                            </strong>
                                        </MDBBtn>
                                        {this.props.User.isDM &&
                                            <MDBBtn onClick={() => this.toggleButtonNavigation(ALL_ENCOUNTERS)} color="black">
                                                <MDBIcon icon="plus" size="lg" />
                                                &nbsp;
                                            <strong className='secondary-nav-button'>
                                                    All Encounters
                                            </strong>
                                            </MDBBtn>
                                        }
                                    </MDBCol>
                                </MDBRow>
                                <MDBIcon color="black" icon="hat-wizard" />
                            </div>
                            <MDBContainer className="page-with-secondary-nav">
                                <div className="page-heading">
                                    <h1 className="page-title">
                                        <strong>Turn Tracker</strong>
                                    </h1>
                                </div>
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

function mapStateToProps({ User, Characters, Encounters, Initiatives }) {
    return {
        User,
        Characters,
        Encounters,
        Initiatives
    }

}

export default connect(mapStateToProps)(InitiativeTracker)
