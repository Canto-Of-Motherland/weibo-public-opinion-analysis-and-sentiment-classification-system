import json
import re
import time

from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from index import models
from index.backend import utils


base_dir = r'D:\Download\vscode\Project\WebProject'


def signIn(request):
    if request.method == 'POST':
        status_code = 0
        if request.POST.get('func_code') == '1':
            user_email_pass = request.POST.get('user_email_pass')
            user_password = request.POST.get('user_password')
            if user_email_pass == '' or user_password == '':
                status_code = 1
            else:
                if models.User.objects.filter(user_email=user_email_pass):
                    if models.User.objects.filter(user_email=user_email_pass, user_password=user_password):
                        request.session['status_sign'] = '1'
                        request.session['user_email'] = user_email_pass
                        request.session['user_name'] = models.User.objects.filter(user_email=user_email_pass)[0].user_name
                    else:
                        status_code = 2
                else:
                    status_code = 3
        elif request.POST.get('func_code') == '2':
            user_email_code = request.POST.get('user_email_code')
            code_input = request.POST.get('code_input')
            timestamp_now = int(time.time())
            user_email_right = request.session['user_email_right']
            code_right = request.session['code_right']
            timestamp = int(request.session['timestamp'])
            if user_email_code == '' or code_input == '':
                status_code = 1
            else:
                if user_email_code == user_email_right and code_input == code_right and request.session['status_use'] == '0':
                    if timestamp_now - timestamp <= 120:
                        request.session['status_use'] = '1'
                        request.session['status_sign'] = '1'
                        request.session['user_email'] = user_email_code
                        request.session['user_name'] = models.User.objects.filter(user_email=user_email_code)[0].user_name
                    else:
                        status_code = 2
                else:
                    status_code = 3
        elif request.POST.get('func_code') == '3':
            user_email_code = request.POST.get('user_email_code')
            if user_email_code == '':
                status_code = 1
            else:
                if models.User.objects.filter(user_email=user_email_code):
                    verification_code = utils.verificationCodeGenerator()
                    timestamp = int(time.time())
                    request.session['user_email_right'] = user_email_code
                    request.session['code_right'] = verification_code
                    request.session['timestamp'] = timestamp
                    request.session['status_use'] = '0'  # 这是防止有人120s内二次使用校验码的
                    if utils.sendMail(verification_code, user_email_code):
                        status_code = 0
                    else: 
                        status_code = 2
                else:
                    status_code = 3
        return JsonResponse({'status_code': status_code})
    else:
        return render(request, 'signIn.html')


def signUp(request):
    if request.method == 'POST':
        status_code = 0
        if request.POST.get('func_code') == '1':
            user_email = request.POST.get('user_email')
            if user_email == '':
                status_code = 1
            else:
                if models.User.objects.filter(user_email=user_email):
                    status_code = 2
                else:
                    verification_code = utils.verificationCodeGenerator()
                    timestamp = int(time.time())
                    request.session['user_email_right'] = user_email
                    request.session['code_right'] = verification_code
                    request.session['timestamp'] = timestamp
                    request.session['status_use'] = '0'  # 这是防止有人120s内二次使用校验码的
                    if utils.sendMail(verification_code, user_email):
                        status_code = 0
                    else: 
                        status_code = 3
        elif request.POST.get('func_code') == '2':
            user_email = request.POST.get('user_email')
            code_input = request.POST.get('code_input')
            timestamp_now = int(time.time())
            user_email_right = request.session['user_email_right']
            code_right = request.session['code_right']
            timestamp = int(request.session['timestamp'])
            if user_email == '' or code_input == '':
                status_code = 1
            else:
                if user_email == user_email_right and code_input == code_right and request.session['status_use'] == '0':
                    if timestamp_now - timestamp <= 120:
                        request.session['status_use'] = '1'
                    else:
                        status_code = 2
                else:
                    status_code = 3
        elif request.POST.get('func_code') == '3':
            user_email = request.POST.get('user_email')
            user_name = request.POST.get('user_name')
            user_password = request.POST.get('user_password')
            password_confirm = request.POST.get('password_confirm')
            pattern = '^(?=.*?\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@]).*$'
            if user_name == '' or user_password == '' or password_confirm == '':
                status_code = 1
            else:
                if re.match(pattern, user_password):
                    if len(user_password) >= 8 and len(user_password) <= 32:
                        if user_password == password_confirm:
                            id = str(int(time.time() * 100000))
                            model = models.User(user_id=id, user_name=user_name, user_email=user_email, user_password=user_password)
                            model.save()
                        else:
                            status_code = 2
                    else:
                        status_code = 3
                else:
                    status_code = 4
        return JsonResponse({'status_code': status_code})
    else:
        return render(request, 'signUp.html')
    

def main(request):
    if request.session.get('status_sign') == '1' and request.session.get('user_name'):
        user_email = request.session['user_email']
        user_name = request.session['user_name']
        if request.method == 'POST':
            func_code = request.POST.get('func_code')
            if func_code == '01':
                request.session['status_sign'] = '0'
        return render(request, 'main.html', {'data': {'user_email': user_email, 'user_name': user_name}})
    else:
        return HttpResponseRedirect('/signin/')
    

def mainOpinionClassification(request):
    if request.session.get('status_sign') == '1' and request.session.get('user_name'):
        if request.method == 'POST':
            func_code = request.POST.get('func_code')
            if func_code == '1':
                with open(base_dir + r'\static\json\output_six_shutouyabo_new.json', 'r', encoding='utf-8') as file_1:
                    data_pie_figure_1 = json.load(file_1)
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_six_shutouyabo.json', 'r', encoding='utf-8') as file_2:
                    data_pie_figure_2 = json.load(file_2)
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_five_shutouyabo_classification.json', 'r', encoding='utf-8') as file_3:
                    data_dot3d_figure = json.load(file_3)
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_shutouyabo_map.json', 'r', encoding='utf-8') as file_4:
                    data_map_figure = json.load(file_4)
                return JsonResponse({'pie_figure_1': data_pie_figure_1, 'pie_figure_2': data_pie_figure_2, 'dot3d_figure': data_dot3d_figure, 'map_figure': data_map_figure})
            elif func_code == '2':
                # file = request.FILES.get('file')
                # file_name = file.name
                # file_path = base_dir + r'\static\csv%s' % file_name
                # with open(file_path, 'wb') as file_write:
                #     for chunk in file.chunks():
                #         file_write.write()
                with open(base_dir + r'\static\json\output_six_shutouyabo_new.json', 'r', encoding='utf-8') as file_1:
                    data_pie_figure_1 = json.load(file_1)
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_six_shutouyabo.json', 'r', encoding='utf-8') as file_2:
                    data_pie_figure_2 = json.load(file_2)
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_five_shutouyabo_classification.json', 'r', encoding='utf-8') as file_3:
                    data_dot3d_figure = json.load(file_3)
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_shutouyabo_map.json', 'r', encoding='utf-8') as file_4:
                    data_map_figure = json.load(file_4)
                time.sleep(40)
                return JsonResponse({'pie_figure_1': data_pie_figure_1, 'pie_figure_2': data_pie_figure_2, 'dot3d_figure': data_dot3d_figure, 'map_figure': data_map_figure})
        else:
            user_email = request.session['user_email']
            user_name = request.session['user_name']
            return render(request, 'mainOpinionClassification.html', {'data': {'user_email': user_email, 'user_name': user_name}})
    else:
        return HttpResponseRedirect('/signin/')  


def mainOpinionAnalysis(request):
    if request.session.get('status_sign') == '1' and request.session.get('user_name'):
        if request.method == 'POST':
            func_code = request.POST.get('func_code')
            if func_code == '1':
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_kaifang_line_2.json', 'r', encoding='utf-8') as file_1:
                    data_line_figure_1 = json.load(file_1)
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_kaifang_dot.json', 'r', encoding='utf-8') as file_2:
                    data_dot4d_figure = json.load(file_2)
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_kaifang_line.json', 'r', encoding='utf-8') as file_3:
                    data_line_figure_2 = json.load(file_3)
                return JsonResponse({'line_figure_1': data_line_figure_1, 'dot4d_figure': data_dot4d_figure, 'line_figure_2': data_line_figure_2})
            else:
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_kaifang_line_2.json', 'r', encoding='utf-8') as file_1:
                    data_line_figure_1 = json.load(file_1)
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_kaifang_dot.json', 'r', encoding='utf-8') as file_2:
                    data_dot4d_figure = json.load(file_2)
                with open(r'D:\Download\vscode\Project\WebProject\static\json\output_kaifang_line.json', 'r', encoding='utf-8') as file_3:
                    data_line_figure_2 = json.load(file_3)
                time.sleep(300)
                return JsonResponse({'line_figure_1': data_line_figure_1, 'dot4d_figure': data_dot4d_figure, 'line_figure_2': data_line_figure_2})
        else:
            user_email = request.session['user_email']
            user_name = request.session['user_name']
            return render(request, 'mainOpinionAnalysis.html', {'data': {'user_email': user_email, 'user_name': user_name}})
    else:
        return HttpResponseRedirect('/signin/')
