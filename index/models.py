from django.db import models


class User(models.Model):
    """
    存储用户信息的模型\n
    包含用户id（唯一标识），用户名，用户邮箱（唯一标识），密码
    """
    user_id = models.CharField(max_length=16, unique=True)
    user_name = models.CharField(max_length=16)
    user_email = models.CharField(max_length=32, unique=True)
    user_password = models.CharField(max_length=32)
    register_time = models.DateTimeField(auto_now_add=True)
