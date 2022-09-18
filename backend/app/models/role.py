from sqlalchemy import Column, Integer, String

from app.db.base_class import Base


class Role(Base):
    role_id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String, nullable=False)
