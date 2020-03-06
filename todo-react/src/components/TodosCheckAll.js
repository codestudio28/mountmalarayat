 import React from 'react';
 import PropTypes from 'prop-types';
 import { inject, observer} from 'mobx-react';

 const TodosCheckAll =inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
     return (
         <div>
             <label><input type="checkbox" onChange={TodoStore.checkAllTodos} checked={!TodoStore.anyRemaining}/>Check All</label>
         </div>
     );
 }));
 
 TodosCheckAll.propTypes = {
    TodoStore:PropTypes.object.isRequired,
 };
 
 export default TodosCheckAll;