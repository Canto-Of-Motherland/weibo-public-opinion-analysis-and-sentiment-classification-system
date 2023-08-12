import random
import smtplib
import json

from email.mime.text import MIMEText
from email.utils import formataddr


def verificationCodeGenerator() -> str:
    """
    输入：无\n
    输出：验证码（str）\n
    功能：生成随机验证码
    """
    verification_code = ""
    
    for i in range(6):
        item = str(random.randint(0, 9))
        verification_code += item
    
    return verification_code

def sendMail(verification_code: str, address: str) -> bool:
    """
    输入：验证码（str）\n
    输出：判定发送是否成功（str）\n
    功能：发送验证码邮件
    """
    try:
        info = '您的验证码为%s。验证码有效期2分钟。此验证码只用于验证身份，请勿转发他人。\nYour verification code is %s. Code is valid within 2 minutes. Only for personal use and please do not show it to others.' % (verification_code, verification_code)
        sender = '3095631599@qq.com'
        receiver = address
        send_code = 'dzppwxmgsgsodcdg'
        
        message = MIMEText(info, _charset='utf-8')
        message['From'] = formataddr(("", sender))
        message['To'] = formataddr(('', receiver))
        message['Subject'] = '验证码'

        server = smtplib.SMTP_SSL('smtp.qq.com', 465)
        server.login(sender, send_code)
        server.sendmail(sender, [receiver, ], message.as_string())
        server.quit()
        return True
    except Exception as e:
        print(e)
        return False
    

with open('D:\Download\\vscode\Project\WebProject\static\json\output_six_shutouyabo_new.json', 'r', encoding='utf-8') as file_1:
    data_pie_figure_1 = json.load(file_1)
    