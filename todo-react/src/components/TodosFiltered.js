import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { inject, observer} from 'mobx-react';
import Button from 'antd/es/button';
import '../App.css';
const TodosFiltered = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    return (
        <div>
            <Button type="primary"
                onClick={() => TodoStore.updateFilter('all')}
                className={classnames({ 'active': TodoStore.filter === 'all' })}
            >All</Button>
            <button
                onClick={() => TodoStore.updateFilter('active')}
                className={classnames({ 'active': TodoStore.filter === 'active' })}
            >Active</button>
            <button
                onClick={() => TodoStore.updateFilter('completed')}
                className={classnames({ 'active': TodoStore.filter === 'completed' })}
            >Completed</button>
        </div>
        );
    }));
    
TodosFiltered.propTypes = {
    updateFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};
            
export default TodosFiltered;