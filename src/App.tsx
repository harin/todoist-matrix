import * as React from 'react';
import './App.css';
import Todoist from './lib/Todoist';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { ITask } from './types/Task'
import PrioityMatrix from './components/PriorityMatrix'

interface IState {
  tasks: ITask[]
  draggingTask: ITask | null
};

class App extends React.Component {
  public state: IState;
  private client: Todoist;
  
  constructor(props: {}) {
    super(props)
    this.state = {
      draggingTask: null,
      tasks: []
    };
    this.client = new Todoist();
  }

  public async componentDidMount() {
    if (this.client.isLoggedIn) {
      const tasks = await this.client.getTasks();
      this.setState({ tasks });
    }
  }

  public render() {
    if (this.client.isLoggedIn === false) {
      return (
        <button
          onClick={this.logIn.bind(this)}
        >
          Log In
        </button>
      )
    }

    return (
      <div className="App">
        <button onClick={this.logOut.bind(this)}>logout</button>
        <PrioityMatrix
          tasks={this.state.tasks}
          moveTask={this.moveTask.bind(this)}
          onDragTask={this.onDragTask.bind(this)}
        />
      </div>
    );
  }

  //
  // PRIVATE *********************************
  // 
  private logIn() {
    this.client.logIn();
  }

  private logOut() {
    this.client.logOut();
  }

  private moveTask(taskBoxId: number) {
    if (this.state.draggingTask == null) {
      throw new Error();
    }

    const currentTask = this.state.draggingTask;

    const tasks = this.state.tasks.map((task) => {
      if (task.id === currentTask.id) {
        const newTask = Object.assign({}, task, { priority: taskBoxId })
        this.client.updateTask(newTask)
        return newTask;
      }
      return task;
    });

    this.setState({
      draggingTask: null,
      tasks
    })
  }

  private onDragTask(task: ITask) {
    this.setState({ draggingTask: task });
  }
}

export default DragDropContext(HTML5Backend)(App);
