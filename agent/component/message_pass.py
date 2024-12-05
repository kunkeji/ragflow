from abc import ABC
import logging
import json
import execjs  # 用于执行JavaScript代码
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
                
            # 构造JavaScript运行环境
            js_context = f"""
                function execute() {{
                    const {self._param.input_var} = {json.dumps(content)};
                    {self._param.code}
                }}
            """
            
            # 创建JavaScript运行时
            ctx = execjs.compile(js_context)
            
            # 执行代码并获取结果
            try:
                result = ctx.call("execute")
                return MessagePass.be_output(result)
            except execjs.RuntimeError as e:
                error_msg = "106"  # JavaScript执行错误
                logging.error(f"{error_msg}: JavaScript execution error - {str(e)}")
                return MessagePass.be_output(error_msg)
            
        except Exception as e:
            error_msg = "105"  # 发生意外错误
            logging.error(error_msg+": "+str(e))
            return MessagePass.be_output(error_msg)