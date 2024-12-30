from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings


class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, phone_number, role, name=None, **extra_fields):
        if not email:
            raise ValueError('You must provide an email address.')

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
            phone_number=phone_number,
            role=role,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, phone_number=None, role=None, name=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        if phone_number is None or role is None:
            raise ValueError('Users must have a phone number and role.')
        return self._create_user(email, password, phone_number, role, name, **extra_fields)

    def create_superuser(self, email, password=None, phone_number=None, role=2, name=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        if phone_number is None:
            raise ValueError('Superusers must have a phone number.')
        return self._create_user(email, password, phone_number, role, name, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        (1, 'دانش‌آموز'),
        (2, 'مدرس'),
    )
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=11)  
    role = models.IntegerField(choices=ROLE_CHOICES)
    avatar = models.ImageField(upload_to='uploads/avatars', blank=True, null=True, )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number', 'role']

    def avatar_url(self):
        if self.avatar:
            return f'{settings.MEDIA_URL}{self.avatar.url}'
        return f'{settings.STATIC_URL}images/default-avatar.png'
    

class Skills(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=42) 
    created_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"{self.name} added by {self.user.email if self.user else 'Unknown User'}"

    