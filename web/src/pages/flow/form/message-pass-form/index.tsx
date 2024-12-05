import { useTranslate } from '@/hooks/common-hooks';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { Form, Input } from 'antd';
import { IOperatorForm } from '../../interface';
import DynamicInputVariable from '../components/dynamic-input-variable';

const MessagePassForm = ({ onValuesChange, form, node }: IOperatorForm) => {
  const { t } = useTranslate('flow');

  return (
    <Form
      name="basic"
      autoComplete="off"
      form={form}
      onValuesChange={onValuesChange}
      layout={'vertical'}
    >
      <DynamicInputVariable nodeId={node?.id}></DynamicInputVariable>

      {/* 变量名配置 */}
      <Form.Item
        label={t('inputVariable')}
        name="input_var"
        initialValue="input"
      >
        <Input placeholder={t('inputVariablePlaceholder')} />
      </Form.Item>

      {/* 代码编辑器 */}
      <Form.Item label={t('jsCode')} name="code">
        <CodeMirror
          value={form.getFieldValue('code') || ''}
          height="200px"
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => {
            form.setFieldsValue({ code: value });
          }}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </Form.Item>

      {/* 说明文档 */}
      <div style={{ marginBottom: 24 }}>
        <h4>{t('messagePassDescription')}</h4>
        <div>{t('messagePassTip')}</div>
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
          {`// 示例代码:
const data = JSON.parse(input);
// 处理数据
return JSON.stringify(data);

// 如果不需要处理，可以不写任何代码
// 组件会直接传递上游内容`}
        </pre>
      </div>
    </Form>
  );
};

export default MessagePassForm;
