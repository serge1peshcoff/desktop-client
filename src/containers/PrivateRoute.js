import * as PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

const PrivateRoute = ({
    component: Component,
    info,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={
                (props) => {
                    if (info.access.value === '' || info.access.expiry === '') {
                        return <Redirect to={'/authentication'}/>;
                    }

                    return <Component {...props}/>;
                }
            }
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    info: PropTypes.shape({
        access: PropTypes.shape({
            value: PropTypes.string.isRequired,
            expiry: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

const stateToProps = (state) => {
    return {
        info: state.authentication.info,
    };
};

export default connect(stateToProps)(PrivateRoute);
