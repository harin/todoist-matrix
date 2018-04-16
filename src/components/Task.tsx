import * as React from 'react';
import { ITask } from '../types/Task'
import { 
    ConnectDragSource,
    DragSource, 
    DragSourceConnector, 
    DragSourceMonitor
} from 'react-dnd';

interface IOnDrag {
    (task: ITask): any
}

interface IProps {
    task: ITask
    onDrag?: IOnDrag
}

interface ICollectProps {
    connectDragSource: ConnectDragSource
}

const spec = {
    beginDrag(props: IProps) {
        if (props.onDrag) {
            props.onDrag(props.task)
        }
        return props.task
    }
}

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Task extends React.Component {
    public props: IProps & ICollectProps
    public render() {
        const { task, connectDragSource } = this.props;
        return connectDragSource(
            <li>{task.content}({task.priority})</li>
        );
    }
}

export default DragSource('Task', spec, collect)(Task);