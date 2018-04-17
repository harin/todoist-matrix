import * as React from 'react';
import { DropTarget, 
    DropTargetConnector, DropTargetMonitor } from 'react-dnd';
import { ITask } from '../types/Task';

interface IProps {
    id: number
    title: string
    children: any
    moveTask: IMoveTask
}

interface IConnectProps {
    connectDropTarget: any
    isOver: boolean
    overItem: any
}

const spec = {
    drop(props: IProps, monitor: DropTargetMonitor, component: any) {
        props.moveTask(props.id)
    }
}

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        overItem: monitor.getItem()
    }
}

export interface IMoveTask {
    (id: number): any
}

interface IState {
    tasks: ITask[]
}

class TaskBox extends React.Component {
    public props: IProps & IConnectProps
    public state: IState
    public render() {
        const { id, children, connectDropTarget, isOver} = this.props;

        const classNames = ['taskbox'];

        if (isOver) {
            classNames.push('taskbox-over');
        }
        return connectDropTarget(
            <div id={'taskbox'+id} className={classNames.join(' ')}>
                {children}
            </div>
        );
    }
};

export default DropTarget('Task', spec, collect)(TaskBox);