from django.shortcuts import render

def index(request):
    return render(request, 'review/index.html', {})

def review(request):
    return render(request, 'review/review.html', {})
