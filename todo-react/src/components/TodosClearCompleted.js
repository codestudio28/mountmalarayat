import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer} from 'mobx-react';
const TodosClearCompleted = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    return (
        <div>
            <button onClick={TodoStore.clearCompleted}>Clear Completed</button>
        </div>
    );
}));

TodosClearCompleted.propTypes = {
    clearCompleted:PropTypes.func.isRequired,
};

export default TodosClearCompleted;