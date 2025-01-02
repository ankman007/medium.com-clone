from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template.loader import get_template
from django import forms

class NewFruitsForm(forms.Form):
    fruits = forms.CharField(label="Add a new fruit: ")
    priority = forms.IntegerField(label="Price: ", max_value=100)

def index(request):
    return HttpResponse("Hello, world")

def list(request):
    if "fruits" not in request.session:
        request.session["fruits"] = []
    return render(request, "users/list.html", {
        "list_of_fruits": request.session['fruits'],
    })

def add_fruits(request):
    if request.method == "POST":
        form = NewFruitsForm(request.POST)
        if form.is_valid():
            new_fruit = form.cleaned_data['fruits']
            
            # fruits = request.session.get('fruits', [])
            # fruits.append(new_fruit)
            # request.session['fruits'] = fruits 
            
            request.session["fruits"] += [new_fruit]
            
            return redirect('users:list')
        else:
            return render(request, "users:add.html", {
                "form": form,
            })
    
    return render(request, "users/add.html", {
        "form": NewFruitsForm(),
    })
    