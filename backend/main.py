from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data storage
income_data = []
expense_data = []

class Amount(BaseModel):
    amount: float

@app.get("/")
def read_root():
    return {"message": "Welcome to the Finance Dashboard API"}

@app.post("/add-income")
def add_income(item: Amount):
    income_data.append(item)
    return {"message": "Income added"}

@app.post("/add-expense")
def add_expense(item: Amount):
    expense_data.append(item)
    return {"message": "Expense added"}

@app.get("/summary")
def get_summary():
    total_income = sum(i.amount for i in income_data)
    total_expense = sum(e.amount for e in expense_data)
    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "income": income_data,
        "expenses": expense_data
    }
