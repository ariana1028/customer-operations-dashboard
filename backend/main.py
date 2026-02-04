from fastapi import FastAPI
from datetime import datetime
from typing import List
from pydantic import BaseModel

app = FastAPI()

class Customer(BaseModel):
    id: int
    name: str
    email: str
    status: str
    total_spend: float
    created_at: datetime


#temporary fake data
customers_db = [
    Customer(
        id=1,
        name="Alice Johnson",
        email="alice@example.com",
        status="active",
        total_spend=1234.56,
        created_at=datetime.utcnow()
    ),
    Customer(
        id=2,
        name="Bob Smith",
        email="bob@example.com",
        status="delinquent",
        total_spend=987.65,
        created_at=datetime.utcnow()
    ),
]


@app.get("/customers", response_model=List[Customer])
def get_customers():
    return customers_db
