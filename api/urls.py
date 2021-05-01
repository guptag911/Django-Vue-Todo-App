from django.urls import path, include
from .views import task_list, get_task, createTask, updateTask, deleteTask

urlpatterns = [
    path('list', task_list, name="tasks"),
    path('create', createTask, name="newTask"),
    path('<str:id>', get_task, name='get_task'),
    path('update/<str:id>', updateTask, name="update"),
    path('delete/<str:id>/', deleteTask, name="delete")
]