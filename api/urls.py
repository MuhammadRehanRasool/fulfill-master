# your_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('warehouses', views.warehouse, name='warehouse-list'),
    path('warehouses/<int:user_id>', views.warehouse, name='warehouse-list'),
    path('fba-inventory-requests', views.fba_inventory, name='fba-inventory-request-list'),
    path('fba-inventory-requests/<int:user_id>', views.fba_inventory, name='fba-inventory-request-list'),
    path('fbm-inventory-requests', views.fbm_inventory, name='fbm-inventory-request-list'),
    path('fbm-inventory-requests/<int:user_id>', views.fbm_inventory, name='fbm-inventory-request-list'),
    path('fbm-orders', views.fbm_orders, name='fbm-orders-list'),
    path('fbm-orders/<int:user_id>', views.fbm_orders, name='fbm-orders-list'),
    path('logistics-registration', views.logistics_registration, name='logistics_registration'),
    path('logistics-registration/<int:user_id>', views.logistics_registration, name='logistics_registration_user'),
    path('invoice', views.invoice, name='invoice'),
    path('invoice/<int:user_id>', views.invoice, name='invoice_user'),
    path('oneinvoice/<int:user_id>', views.oneinvoice, name='invoice_user'),
    path('chart_data_view/<int:user_id>', views.chart_data_view, name='chart_data_view'),
]
