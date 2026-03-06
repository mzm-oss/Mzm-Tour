import os
import requests
import json

supabase_url = "https://syrplffkaiygkgkeoear.supabase.co"
supabase_key = "sb_publishable_C3smjIApRZDBywn2xgGLDg_VXtX49iM"

headers = {
    "apikey": supabase_key,
    "Authorization": f"Bearer {supabase_key}",
    "Content-Type": "application/json"
}

# Test querying admin_users table
response = requests.get(f"{supabase_url}/rest/v1/admin_users?select=*", headers=headers)

print(f"Status: {response.status_code}")
print(f"Response: {response.text}")
