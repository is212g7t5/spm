import random
import string


def random_lower_string(length) -> str:
    return "".join(random.choices(string.ascii_lowercase, k=length))


def random_email() -> str:
    return f"{random_lower_string()}@{random_lower_string()}.com"


def random_numbers(length) -> int:
    min = pow(10, length-1)
    max = pow(10, length) - 1
    return random.randint(min, max)
    

# def get_superuser_token_headers(client: TestClient) -> Dict[str, str]:
#     login_data = {
#         "username": settings.FIRST_SUPERUSER,
#         "password": settings.FIRST_SUPERUSER_PASSWORD,
#     }
#     r = client.post(f"{settings.API_V1_STR}/login/access-token", data=login_data)
#     tokens = r.json()
#     a_token = tokens["access_token"]
#     headers = {"Authorization": f"Bearer {a_token}"}
#     return headers
