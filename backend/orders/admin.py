from django.contrib import admin

from .models import Order, Payment, CartItem, PurchasedCourses

# Register your models here.

admin.site.register(Order)
admin.site.register(Payment)
admin.site.register(CartItem)
admin.site.register(PurchasedCourses)