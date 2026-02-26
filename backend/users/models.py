from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUsersManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save()
        return user

class CustomUsers(AbstractBaseUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'

    objects = CustomUsersManager()

    def __str__(self):
        return self.email
    

class Post(models.Model):
    author = models.ForeignKey(CustomUsers, on_delete=models.CASCADE, related_name="posts")
    text = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Post #{self.id} by {self.author_id}"

