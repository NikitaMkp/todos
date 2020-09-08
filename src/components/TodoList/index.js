import React from 'react';
import PropTypes, { element } from 'prop-types';
import { ListGroup, Button, InputGroup, FormControl, Badge } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/todosList.css';
import { addTodo, deleteTodo, changeTodo } from '../../actions';

export default class TodoList extends React.PureComponent {
  state = { value: '', isCompleteHidden: false, isTodoHidden: false };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
  };

  handleKeyPress = target => {
    const { dispatch, todos } = this.props;
    const isEnter = target.charCode == 13;
    const isNotEmpty = this.state.value !== '';
    const isValid = isEnter && isNotEmpty;
    if (isValid) {
      const todo = {
        id: todos.length,
        name: this.state.value,
        done: false,
      };
      this.state.value = '';
      dispatch(addTodo(todo));
    }
  };

  deleteElem = id => {
    const { dispatch, todos } = this.props;
    dispatch(deleteTodo(id));
  };

  setElementDone = elem => {
    const { dispatch } = this.props;
    const newElem = { ...elem };
    newElem.done = !elem.done;
    dispatch(changeTodo(newElem));
  };

  handleChange = e => this.setState({ value: e.target.value });

  clearCompleted = () => {
    const { dispatch, todos } = this.props;
    todos.forEach(elem => {
      if (elem.done) {
        dispatch(deleteTodo(elem.id));
      }
    });
  };

  showAllElements = () => this.setState({ isCompleteHidden: false, isTodoHidden: false });

  completeAllTasks = () => {
    const { dispatch, todos } = this.props;
    todos.forEach(elem => {
      const newElem = { ...elem };
      newElem.done = true;
      dispatch(changeTodo(newElem));
    });
  };

  hideCompleted = () => {
    this.setState({ isCompleteHidden: true, isTodoHidden: false });
  };

  hideTodos = () => {
    this.setState({ isCompleteHidden: false, isTodoHidden: true });
  };

  render() {
    const { todos } = this.props;
    const { value, isCompleteHidden, isTodoHidden } = this.state;
    return (
      <div className="main">
        <div className="content">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="todo"
              placeholder="Enter your task name here"
              onKeyPress={this.handleKeyPress}
              value={value}
              onChange={this.handleChange}
            />
          </div>
          <div className="scroll-list">
            <ul className="list-group-item list-group-flush">
              {todos &&
                todos
                  .filter(element => {
                    if (isCompleteHidden) {
                      if (!element.done) {
                        return element;
                      }
                      return;
                    }
                    if (isTodoHidden) {
                      if (element.done) {
                        return element;
                      }
                      return;
                    }
                    if (!isCompleteHidden && !isCompleteHidden) {
                      return element;
                    }
                  })
                  .map(elem => (
                    <div className="list-group-item" key={elem.id}>
                      <input
                        type="checkbox"
                        className="chekBox"
                        checked={elem.done}
                        onClick={() => this.setElementDone(elem)}
                      />
                      <a>{elem.name}</a>
                      <div className="list-group-icon-box">
                        <FaTrashAlt
                          className="list-group-icon"
                          onClick={() => this.deleteElem(elem.id)}
                        />
                      </div>
                    </div>
                  ))}
            </ul>
          </div>
          {!!this.props.todos.length && (
            <div className="footer">
              <div className="footer-elements">
                <a onClick={this.completeAllTasks}>
                  {this.props.todos.filter(elem => !elem.done).length} tasks left
                </a>
              </div>
              <div className="footer-elements">
                <Button variant="light" onClick={this.showAllElements}>
                  All
                </Button>
              </div>
              <div className="footer-elements">
                <a onClick={this.hideCompleted}>ToDo</a>
              </div>
              <div className="footer-elements">
                <a onClick={this.hideTodos}>Completed</a>
              </div>
              {!!this.props.todos.filter(elem => elem.done).length && (
                <div className="footer-elements">
                  <a onClick={this.clearCompleted}>Clear completed</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
