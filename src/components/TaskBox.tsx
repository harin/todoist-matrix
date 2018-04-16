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
        const { children, connectDropTarget, isOver, title} = this.props;
        const style: any = {
            backgroundColor: 'grey',
        };
        if (isOver) {
            style.backgroundColor = 'red';
        }
        return connectDropTarget(
            <div style={style}>
                <h3>{title}</h3>
                {children}
            </div>
        );
    }
};

export default DropTarget('Task', spec, collect)(TaskBox);