from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user_model import User
from app.schemas.user_schema import UserSignup, UserLogin
from app.utils.security import hash_password, verify_password
from app.utils.token import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):

    user_exists = db.query(User).filter(User.email == user.email).first()

    if user_exists:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Account created successfully"
    }


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    access_token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }