from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.preview_model import Preview
from app.schemas.preview_schema import PreviewRequest
from app.utils.token import decode_access_token

router = APIRouter(
    prefix="/preview",
    tags=["Preview"]
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


@router.post("/")
def save_preview(
    data: PreviewRequest,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    email = payload.get("sub")

    preview_image = f"https://image.thum.io/get/{data.url}"

    new_preview = Preview(
        url=str(data.url),
        preview_image=preview_image,
        user_email=email
    )

    db.add(new_preview)
    db.commit()
    db.refresh(new_preview)

    return {
        "message": "Preview saved successfully",
        "data": {
            "id": new_preview.id,
            "url": new_preview.url,
            "preview_image": new_preview.preview_image
        }
    }


@router.get("/")
def get_all_previews(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    email = payload.get("sub")

    previews = db.query(Preview).filter(
        Preview.user_email == email
    ).all()

    return previews


@router.delete("/{preview_id}")
def delete_preview(
    preview_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    email = payload.get("sub")

    preview = db.query(Preview).filter(
        Preview.id == preview_id,
        Preview.user_email == email
    ).first()

    if not preview:
        raise HTTPException(
            status_code=404,
            detail="Preview not found"
        )

    db.delete(preview)
    db.commit()

    return {
        "message": "Preview deleted successfully"
    }