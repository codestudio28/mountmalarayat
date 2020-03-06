import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer} from 'mobx-react';

const TodosRemaining = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    return (
        <div>
             {TodoStore.remaining} items left
        </div>
    );
}));

TodosRemaining.propTypes={
    // remaining: PropTypes.number.isRequired,
}

export default TodosRemaining;