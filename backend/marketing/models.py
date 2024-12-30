import uuid
from django.db import models
from django.contrib.auth import get_user_model
from orders.models import Order  

User = get_user_model()

class DiscountCode(models.Model):
    discount_code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True) 
    discount_percentage = models.PositiveSmallIntegerField()
    expiration_date = models.DateTimeField()

    def __str__(self):
        return f"{self.discount_code} - {self.discount_percentage}%"

    def is_valid(self):
        from django.utils.timezone import now
        return now() < self.expiration_date


class AppliedDiscount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applied_discounts")
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="applied_discounts")
    discount_code = models.ForeignKey(DiscountCode, on_delete=models.PROTECT, related_name="applied_discounts")
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} applied {self.discount_code} on Order {self.order.id}"
