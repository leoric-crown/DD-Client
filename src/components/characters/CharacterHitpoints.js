import React, { Component } from 'react'
import Modal from '../modal/Modal'

const getProgressBarStyle = (percentage) => {
    return {
        width: `${percentage}%`
    }
}

class CharacterHitPoints extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false
        }
    }

    cancelModal = () => {
        console.log('cancelling')
        this.setState({
            modal: false
        })
    }

    openModal = () => {
        this.setState({
            modal: true
        })
    }

    render() {
        const { hitpoints, maxhitpoints } = this.props
        return (
            <React.Fragment>
                {this.state.modal && (
                    <Modal
                        title="Modal title"
                        onCancel={this.cancelModal}
                        canCancel
                        canConfirm>
                        <p>Modal Content</p>
                    </Modal>
                )}
                <div className='hp-column' onClick={this.openModal}>
                    <div className="progress-bar-border">
                        <div className='text-center'>HP</div>
                        <div style={getProgressBarStyle(100 * hitpoints / maxhitpoints)} className="progress-bar">
                            {`${hitpoints} / ${maxhitpoints}`}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CharacterHitPoints