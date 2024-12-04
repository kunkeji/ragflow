from abc import ABC
import logging
from agent.component.base import ComponentBase, ComponentParamBase

class MessagePassParam(ComponentParamBase):
    """
    定义消息传递组件参数
    """
    def __init__(self):
        super().__init__()
        # 这个组件不需要任何参数配置
        pass

    def check(self):
        # 不需要检查参数
        pass

class MessagePass(ComponentBase, ABC):
    component_name = "MessagePass"
    
    def _run(self, history, **kwargs):
        # 获取上游组件的输出
        ans = self.get_input()
        content = ans.get("content", "")[0]
        
        try:
            # 转成字符串
            content = str(content)
            # 直接返回内容
            return MessagePass.be_output(content)
            
        except Exception as e:
            error_msg = "105"  # 发生意外错误
            logging.error(error_msg+": "+str(e))
            return MessagePass.be_output(error_msg)