import { useTranslate } from '@/hooks/common-hooks';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { Form, Input } from 'antd';
import parserBabel from 'prettier/parser-babel';
import { format } from 'prettier/standalone';
import { IOperatorForm } from '../../interface';
import DynamicInputVariable from '../components/dynamic-input-variable';

const MessagePassForm = ({ onValuesChange, form, node }: IOperatorForm) => {
  const { t } = useTranslate('flow');

  const initialCode = form?.getFieldValue('code') || '';

  const formatCode = (code: string) => {
    try {
      return format(code, {
        parser: 'babel',
        plugins: [parserBabel],
        semi: true,
        singleQuote: true,
      });
    } catch (e) {
      return code;
    }
  };

  return (
    <Form
      name="basic"
      autoComplete="off"
      form={form}
      onValuesChange={onValuesChange}
      layout={'vertical'}
      initialValues={{
        input_var: 'input',
        code: '',
      }}
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
          value={initialCode}
          height="200px"
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => {
            form?.setFieldsValue({ code: value });
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
            lint: true,
            tabSize: 2,
            indentUnit: 2,
            styleActiveLine: true,
          }}
        />
      </Form.Item>

      {/* 说明文档 */}
      <div style={{ marginBottom: 24 }}>
        <h4>{t('messagePassDescription')}</h4>
        <div>{t('messagePassTip')}</div>
        <pre style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
          {`// 示例代码:
return input+"世界"
//如果你输入的是你好，则会输出你好世界`}
        </pre>
      </div>
    </Form>
  );
};

export default MessagePassForm;
