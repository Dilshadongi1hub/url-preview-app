from pydantic import BaseModel, HttpUrl


class PreviewRequest(BaseModel):
    url: HttpUrl