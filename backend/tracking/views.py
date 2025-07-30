from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import TimeLog
from .serializers import TimeLogSerializer

@api_view(['GET', 'POST'])
def timelogs(request):
    if request.method == 'GET':
        logs = TimeLog.objects.all().order_by('-date')
        serializer = TimeLogSerializer(logs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TimeLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
