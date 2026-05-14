from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import List
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Customer(BaseModel):
    id: int
    name: str
    email: EmailStr
    status: str
    total_spend: float
    created_at: datetime


class CustomerCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    status: str = Field(..., pattern="^(active|paused|delinquent)$")
    total_spend: float = Field(..., ge=0)


class CustomerUpdate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    status: str = Field(..., pattern="^(active|paused|delinquent)$")
    total_spend: float = Field(..., ge=0)

customers_db: List[Customer] = []
next_id = 1


@app.get("/customers", response_model=List[Customer])
def get_customers():
    """Get all customers"""
    return customers_db


@app.get("/customers/{customer_id}", response_model=Customer)
def get_customer(customer_id: int):
    """Get a single customer by ID"""
    for customer in customers_db:
        if customer.id == customer_id:
            return customer
    raise HTTPException(status_code=404, detail="Customer not found")


@app.post("/customers", response_model=Customer, status_code=201)
def create_customer(customer: CustomerCreate):
    """Create a new customer"""
    global next_id
    
    new_customer = Customer(
        id=next_id,
        name=customer.name,
        email=customer.email,
        status=customer.status,
        total_spend=customer.total_spend,
        created_at=datetime.utcnow(),
    )
    
    customers_db.append(new_customer)
    next_id += 1
    
    return new_customer

@app.put("/customers/{customer_id}", response_model=Customer)
def update_customer(customer_id: int, update: CustomerUpdate):
    """Update an existing customer"""
    for i, customer in enumerate(customers_db):
        if customer.id == customer_id:
            customers_db[i] = Customer(
                id=customer.id,
                name=update.name,
                email=update.email,
                status=update.status,
                total_spend=update.total_spend,
                created_at=customer.created_at,
            )
            return customers_db[i]
    raise HTTPException(status_code=404, detail="Customer not found")