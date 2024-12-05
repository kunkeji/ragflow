import classNames from 'classnames';
import { useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { IMessagePassForm, NodeData } from '../../interface';
import { LeftHandleStyle, RightHandleStyle } from './handle-icon';
import styles from './index.less';
import NodeHeader from './node-header';

export function MessagePassNode({
  id,
  data,
  isConnectable = true,
  selected,
}: NodeProps<NodeData>) {
  const [showDetails, setShowDetails] = useState(false);
  const form = data.form as IMessagePassForm;

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
      {/* <div className={styles.messagePassNodeContainer}>
        <div 
          className={styles.messagePassConfig}
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className={styles.configItem}>
            <span className={styles.configLabel}>变量:</span>
            <span className={styles.configValue}>{form?.input_var || 'input'}</span>
          </div>
          <div className={styles.expandIcon}>{showDetails ? '▼' : '▶'}</div>
        </div>

        {showDetails && form?.code && (
          <div className={styles.codePreview}>
            <div className={styles.codeTitle}>代码预览:</div>
            <pre className={styles.codeContent}>
              {form.code}
            </pre>
          </div>
        )}
      </div> */}
    </section>
  );
}
