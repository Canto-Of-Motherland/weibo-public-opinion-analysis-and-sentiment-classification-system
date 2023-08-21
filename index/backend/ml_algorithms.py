"""
Author: Erutaner
Date: 2023.08.11
"""

from sklearn.cluster import KMeans
import numpy as np

class CosineKMeans(KMeans):
    '''使用余弦相似度为聚类判据进行向量聚类，适合观点识别任务'''
    def __init__(self, n_clusters=8, *, init='k-means++', n_init=10,
                 max_iter=300, tol=1e-4, verbose=0,
                 random_state=None, copy_x=True,
                 algorithm='auto'):
        super().__init__(n_clusters=n_clusters,
                         init=init,
                         n_init=n_init,
                         max_iter=max_iter,
                         tol=tol,
                         verbose=verbose,
                         random_state=random_state,
                         copy_x=copy_x,
                         algorithm=algorithm)

    def _normalize_data(self, X):
        return X / np.linalg.norm(X, axis=1, keepdims=True)

    def _compute_original_cluster_centers(self, X):
        self.original_cluster_centers_ = np.array([X[self.labels_ == i].mean(axis=0)
                                                  for i in range(self.n_clusters)])

    def fit(self, X, y=None, sample_weight=None):
        X_normalized = self._normalize_data(X)
        super().fit(X_normalized, y, sample_weight)
        self._compute_original_cluster_centers(X)
        return self

    def fit_predict(self, X, y=None, sample_weight=None):
        X_normalized = self._normalize_data(X)
        labels = super().fit_predict(X_normalized, y, sample_weight)
        self._compute_original_cluster_centers(X)
        return labels

    # 向外部提供原始的中心数据
    @property
    def original_centers(self):
        return self.original_cluster_centers_