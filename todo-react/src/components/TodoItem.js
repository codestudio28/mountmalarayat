import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { inject, observer} from 'mobx-react';

const TodoItem = inject('TodoStore')(observer(props => {
   const TodoStore = props.TodoStore;
    return (
        <div>
            <div key={props.todo.id} className="todo-item">
                <div className="todo-item-left">
                    <input type="checkbox" onChange={(event) => TodoStore.checkTodo(props.todo, props.index, event)} checked={props.todo.completed} />

                    {!props.todo.editing &&

                        <div
                            className={classnames({ 'todo-item-label': true, 'completed': props.todo.completed })}
                            onDoubleClick={(event) => TodoStore.editTodo(props.todo, props.index, event)}
                        >
                            {props.todo.title}
                        </div>
                    }
                    {props.todo.editing &&
                        <input className="todo-item-edit" type="text" autoFocus
                            defaultValue={props.todo.title}
                            onBlur={(event) => TodoStore.doneEdit(props.todo, props.index, event)}
                            onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                    TodoStore.doneEdit(props.todo, props.index, event)
                                } else if (event.key === 'Escape') {
                                    TodoStore.cancelEdit(props.todo, props.index, event)
                                }
                            }}
                        />
                    }
                </div>
                <div className="remove-item" onClick={(event) => TodoStore.deleteTodo(props.index)}>
                    &times;
              </div>
            </div>
        </div>
    );
}));

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
   
};

export default TodoItem;