import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTxWithdrawFrom } from '../../../actions/transactions/withdraw';
import React from 'react';
import SelectField from '../../../components/SelectField';
import _find from 'lodash/find';

const Validators = ({
    delegations,
    from,
    validators,
    setTxWithdrawFrom,
}) => {
    const onChange = ({ target: { value } }) => {
        setTxWithdrawFrom({
            value,
            error: new Error(''),
        });
    };

    const items = [];
    validators.forEach((validator) => {
        const delegation = _find(delegations, ['validator_address', validator.address]);
        if (delegation) {
            items.push({
                ...validator,
                delegation,
            });
        }
    });

    return (
        <SelectField
            className="form-control validators-select"
            items={items}
            menuItemClassName="validator-item"
            value={from}
            onChange={onChange}
        />
    );
};

Validators.propTypes = {
    delegations: PropTypes.arrayOf(
        PropTypes.shape({
            validator_address: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    from: PropTypes.string.isRequired,
    setTxWithdrawFrom: PropTypes.func.isRequired,
    validators: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
            description: PropTypes.shape({
                moniker: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    ).isRequired,
};

const stateToProps = (state) => {
    return {
        delegations: state.delegations.items,
        from: state.transactions.withdraw.from.value,
        validators: state.validators.items,
    };
};

const actionsToProps = {
    setTxWithdrawFrom,
};

export default connect(stateToProps, actionsToProps)(Validators);
