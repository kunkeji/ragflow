import classNames from 'classnames';
import { Handle, NodeProps, Position } from 'reactflow';
import { NodeData } from '../../interface';
import { LeftHandleStyle, RightHandleStyle } from './handle-icon';
import styles from './index.less';
import NodeHeader from './node-header';

export function MessagePassNode({
  id,
  data,
  isConnectable = true,
  selected,
}: NodeProps<NodeData>) {
  return (
    <section
      className={classNames(styles.ragNode, {
        [styles.selectedNode]: selected,
      })}
    >
      <Handle
        id="c"
        type="source"
        position={Position.Left}
        isConnectable={isConnectable}
        className={styles.handle}
        style={LeftHandleStyle}
      ></Handle>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className={styles.handle}
        style={RightHandleStyle}
        id="b"
      ></Handle>
      <NodeHeader id={id} name={data.name} label={data.label}></NodeHeader>
      <div className={styles.messagePassNodeContainer}>
        <div className={styles.messagePassConfig}>
          <div className={styles.configItem}>
            <span className={styles.configLabel}>状态:</span>
            <span className={styles.configValue}>消息传递中</span>
          </div>
        </div>
      </div>
    </section>
  );
}
