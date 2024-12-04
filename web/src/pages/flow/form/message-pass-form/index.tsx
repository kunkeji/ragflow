import { useTranslate } from '@/hooks/common-hooks';
import { Form } from 'antd';
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

      {/* 动态参数说明 */}
      <div style={{ marginBottom: 24 }}>
        <h4>{t('messagePassDescription')}</h4>
        <div>{t('messagePassTip')}</div>
      </div>
    </Form>
  );
};

export default MessagePassForm;
