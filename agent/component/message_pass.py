from abc import ABC
import logging
import json
from agent.component.base import ComponentBase, ComponentParamBase

class MessagePassParam(ComponentParamBase):
    """
    定义消息传递组件参数
    """
    def __init__(self):
        super().__init__()
        # 添加参数
        self.input_var = "input"  # 上游内容的变量名
        self.code = ""  # JavaScript代码

    def check(self):
        # 检查input_var是否为空
        self.check_empty(self.input_var, "Input Variable")

class MessagePass(ComponentBase, ABC):
    component_name = "MessagePass"
    
    def _run(self, history, **kwargs):
        # 获取上游组件的输出
        ans = self.get_input()
        content = ans.get("content", "")[0]
        
        try:
            # 如果没有代码，直接返回上游内容
            if not self._param.code or self._param.code.strip() == "":
                return MessagePass.be_output(content)
                
            # 构造返回数据
            result_data = {
                self._param.input_var: content,  # 将上游内容赋值给指定变量名
                "code": self._param.code,        # 保存代码内容用于显示
            }
            
            return MessagePass.be_output(json.dumps(result_data))
            
        except Exception as e:
            error_msg = "105"  # 发生意外错误
            logging.error(error_msg+": "+str(e))
            return MessagePass.be_output(error_msg)