import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import variables from '../../../../../../dummy/variables';

const SendButton = (props) => {
    return (
        <Button
            className="send_button"
            disabled={props.disable}
            variant="outlined"
            onClick={props.onClick}>
            {variables[props.lang].send}
        </Button>
    );
};

SendButton.propTypes = {
    disable: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default connect(stateToProps)(SendButton);
