from django.contrib import admin

from .models import DiscountCode, AppliedDiscount 
# Register your models here.


admin.site.register(DiscountCode) 
admin.site.register(AppliedDiscount) 
