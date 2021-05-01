from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from todo.models import Task
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
def task_list(request):
    tasks = Task.objects.all();
    tSerializer = TaskSerializer(tasks, many = True)
    #return JsonResponse(tSerializer.data, safe=False)
    return Response(tSerializer.data)

@api_view(['GET'])
def get_task(request, id):
    try: 
        task = Task.objects.get(id = id)
    except Exception as e:
        raise Http404
    tSerializer = TaskSerializer(task)
    return Response(tSerializer.data)

@api_view(['POST'])
def createTask(request):
    serializer = TaskSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return HttpResponse('Some Error Occured')

@api_view(['POST'])

def updateTask(request, id):
    task = Task.objects.get(id = id)
    # print(task)
    serializer = TaskSerializer(instance = task, data = request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return HttpResponse('Some Error Occured')
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteTask(request, id):
    task = Task.objects.get(id = id)
    try:
        task.delete()
    except Exception as e:
        Response("Unable to Delete Task!")
    return Response("Task Deleted Sucessfully")