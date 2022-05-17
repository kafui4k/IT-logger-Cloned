import React, {useState, useEffect} from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import {updateLog} from '../../actions/logActions';

const EditLogModal = ({current, updateLog}) => {
    const [message, setMessage] = useState('');
    const [attention, setAttion] = useState(false);
    const [tech, setTech] = useState('');

    useEffect(() => {
        if (current) {
            setMessage(current.message);
            setAttion(current.attention);
            setTech(current.tech);
        }
    }, [current]);

    const onSubmit = () => {
        if (message === '' || tech === '') {
            M.toast({html: 'Please enter a message'});
        } else {
            const updatedLog = {
                id: current.id,
                message,
                attention,
                tech,
                date: new Date(),
            };

            updateLog(updatedLog);

            M.toast({
                html: `Log has been updated by ${tech}`,
            });

            // Clear fields
            setMessage('');
            setTech('');
            setAttion(false);
        }
    };

    return (
        <div id='edit-log-modal' className='modal' style={modalStyle}>
            <div className='modal-content'>
                <h4>Enter System Log</h4>
                <div className='row'>
                    <div className='input-field'>
                        <input
                            type='text'
                            name='message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='input-field'>
                        <select
                            name='tech'
                            value={tech}
                            className='browser-default'
                            onChange={(e) => setTech(e.target.value)}
                        >
                            <option value='' disabled>
                                Select Technician
                            </option>
                            <TechSelectOptions />
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field'>
                        <p>
                            <label>
                                <input
                                    type='checkbox'
                                    className='filled-in'
                                    checked={attention}
                                    value={attention}
                                    onChange={(e) => setAttion(!attention)}
                                />
                                <span>Needs Attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>
            <div className='modal-footer'>
                <a
                    href='#!'
                    onClick={onSubmit}
                    className='modal-close waves-effect blue waves-light btn'
                >
                    Enter
                </a>
            </div>
        </div>
    );
};

const modalStyle = {
    width: '75%',
    height: '75%',
};

EditLogModal.propTypes = {
    current: PropTypes.object.isRequired,
    updateLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    current: state.log.current,
});

export default connect(mapStateToProps, {updateLog})(EditLogModal);
