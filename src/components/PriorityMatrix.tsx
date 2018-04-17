import * as React from 'react';
import TaskBox, { IMoveTask } from './TaskBox';
import Task, { IOnDrag } from './Task';
import { ITask } from '../types/Task';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

interface IProps {
  tasks: ITask[]
  moveTask: IMoveTask
  onDragTask: IOnDrag
}

function PriorityMatrix({
  tasks,
  moveTask,
  onDragTask
}: IProps) {
  return (
    <div>
      <div className='prioritymatrix'>
        <div id="topleft">Not Important</div>
        <div id="topright">Important</div>
        <div id="righttop">Urgent</div>
        <div id="rightbottom">Not Urgent</div>
        {[1, 2, 3, 4].map((id) => {
          return (
            <TaskBox id={id} moveTask={moveTask} title="" key={id}>
              {
                tasks.filter(task => task.priority === id).map((task) => (
                  <Task
                    task={task}
                    onDrag={onDragTask}
                  />
                ))
              }
            </TaskBox>
          )
        })
        }
      </div>
    </div>
  )
};

export default DragDropContext(HTML5Backend)(PriorityMatrix);
