from sqlalchemy import Column, Integer, String

from app.database.database import Base


class Preview(Base):
    __tablename__ = "previews"

    id = Column(Integer, primary_key=True, index=True)

    url = Column(String, nullable=False)

    preview_image = Column(String, nullable=False)

    user_email = Column(String, nullable=False)