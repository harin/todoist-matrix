import * as React from 'react';
import TaskBox, { IMoveTask } from './TaskBox';
import Task, { IOnDrag } from './Task';
import { ITask } from '../types/Task';

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
    )
};

export default PriorityMatrix;
