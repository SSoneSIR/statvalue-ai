from django.shortcuts import redirect

def home(request):
    return redirect('http://localhost:3000')  # Assuming your React app runs on port 3000

