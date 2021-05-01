from django.shortcuts import render

# Create your views here.

def mainView(request): 
    return render(request, 'home.html')