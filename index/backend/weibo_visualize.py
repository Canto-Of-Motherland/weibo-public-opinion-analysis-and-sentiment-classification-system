"""
Author: Erutaner
Date: 2023.08.08
"""
import plotly.express as px
import plotly.io as pio
import json
import pandas as pd
import plotly.graph_objects as go
import sklearn
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.cluster import MiniBatchKMeans
from kneed import KneeLocator
import numpy as np
from ml_algorithms import CosineKMeans


def pie_chart(df,values = "count", names = "sentiment", title = "情感分布", return_dict=False):
    '''传入的是pie_data_aggregrate返回的dataframe, 有两列，一列是sentiment列，一列是count列'''
    fig = px.pie(df,values=values,names=names)
    fig.show()

    if return_dict:
        json_data = pio.to_json(fig)
        json_data = json.loads(json_data)
        return json_data


def count_over_days(df,time_column = "时间", title = "Count over Time", return_dict = False):
    '''可以直接传入数据清洗完成后的dataframe，传入储存时间数据的列和图表的名称'''
    df[time_column] = pd.to_datetime(df[time_column])

    # 提取日期部分
    df["date"] = df[time_column].dt.date

    # 统计每一天的记录数量
    result = df["date"].value_counts()

    # 转换为 DataFrame 并重命名列
    result_df = result.reset_index()
    result_df.columns = ['Date', 'Count']

    # 按照日期列排序
    result_df = result_df.sort_values('Date')
    fig = px.line(result_df, x='Date', y="Count")
    fig.update_layout(
        title=title,
    )
    if return_dict:
        json_data = pio.to_json(fig)
        json_data = json.loads(json_data)
        return json_data



def elbow_visualize(embedding_list, start=1, end=10, return_dict = False):
    sse = []
    k_range = range(start, end+1)
    for k in k_range:
        kmeans = CosineKMeans(n_clusters=k)
        kmeans.fit(embedding_list)
        sse.append(kmeans.inertia_)

    # 创建一个DataFrame来存储结果
    elbow_df = pd.DataFrame({'Number of Clusters': k_range, 'SSE': sse})

    # 使用Plotly Express绘制图像 
    fig = px.line(elbow_df, x='Number of Clusters', y='SSE', title='Elbow Method for Optimal Number of Clusters')
    if return_dict:
        json_data = pio.to_json(fig)
        json_data = json.loads(json_data)
        return json_data


def polarization_visualize(text_list, embedding_list, n_clusters, title = "Polarization Visualization", return_dict = False):
    max_line_length = 40  # 每行的最大长度
    # 添加html换行符，以避免文本单行显示
    text_list_multi_line = ['<br>'.join([text[i:i + max_line_length] for i in range(0, len(text), max_line_length)]) for
                            text in text_list]
    # 使用k-means进行聚类
    kmeans = CosineKMeans(n_clusters=n_clusters)
    kmeans.fit(embedding_list)
    labels = kmeans.labels_

    # 使用PCA降维到3维
    pca = PCA(n_components=3)
    reduced_data = pca.fit_transform(embedding_list)

    # 创建一个DataFrame来存储降维后的数据以及聚类标签
    reduced_df = pd.DataFrame(reduced_data, columns=['Component 1', 'Component 2', 'Component 3'])
    reduced_df['Cluster'] = labels

    # 创建一个3D散点图
    fig = go.Figure(data=[go.Scatter3d(x=reduced_df['Component 1'],
                                       y=reduced_df['Component 2'],
                                       z=reduced_df['Component 3'],
                                       mode='markers',
                                       marker=dict(size=2,
                                                   color=reduced_df['Cluster'],
                                                   colorscale='Viridis',
                                                   colorbar=dict(title='')),  # 定义光谱颜色映射
                                       text=text_list_multi_line,  # 添加文本标签
                                       hovertemplate='Cluster: %{marker.color}<br>Text: %{text}}<extra></extra>'
                                       # 定义悬停文本

                                       )])
    fig.update_layout(title=title)
    if return_dict:
        json_data = pio.to_json(fig)
        json_data = json.loads(json_data)
        return json_data


def auto_polarization_visualize(text_list, embedding_list, title="Polarization Visualization", return_dict=False):
    max_line_length = 40  # 每行的最大长度
    # 添加html换行符，以避免文本单行显示
    text_list_multi_line = ['<br>'.join([text[i:i + max_line_length] for i in range(0, len(text), max_line_length)]) for
                            text in text_list]
    # 自动搜参
    x = range(1, 11)
    y = []
    for k in x:
        kmeans = CosineKMeans(n_clusters=k)
        kmeans.fit(embedding_list)
        y.append(kmeans.inertia_)
    kn = KneeLocator(x, y, curve="convex", direction="decreasing", interp_method="polynomial")
    best_k = kn.knee

    # 使用k-means进行聚类
    kmeans = CosineKMeans(n_clusters=best_k)
    kmeans.fit(embedding_list)
    labels = kmeans.labels_

    # 使用PCA降维到3维
    pca = PCA(n_components=3)
    reduced_data = pca.fit_transform(embedding_list)

    # 创建一个DataFrame来存储降维后的数据以及聚类标签
    reduced_df = pd.DataFrame(reduced_data, columns=['Component 1', 'Component 2', 'Component 3'])
    reduced_df['Cluster'] = labels

    # 创建一个3D散点图
    fig = go.Figure(data=[go.Scatter3d(x=reduced_df['Component 1'],
                                       y=reduced_df['Component 2'],
                                       z=reduced_df['Component 3'],
                                       mode='markers',
                                       marker=dict(size=2,
                                                   color=reduced_df['Cluster'],
                                                   colorscale='Viridis',
                                                   colorbar=dict(title='', tickvals=list(range(best_k)),
                                                                 ticktext=list(range(best_k)))),  # 定义光谱颜色映射
                                       text=text_list_multi_line,  # 添加文本标签
                                       hovertemplate='Cluster: %{marker.color}<br>Text: %{text}}<extra></extra>'
                                       # 定义悬停文本

                                       )])
    fig.update_layout(title=title)
    if return_dict:
        json_data = pio.to_json(fig)
        json_data = json.loads(json_data)
        return json_data




