from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length = 120, verbose_name='タイトル')
    description = models.TextField(blank=True, verbose_name='詳細')
    completed = models.BooleanField(default=False, verbose_name='完了フラグ')
    
    def __str__(self):
        return self.title
