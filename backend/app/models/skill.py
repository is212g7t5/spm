from sqlalchemy import Boolean, Column, Integer, String

from app.db.base_class import Base


class Skill(Base):
    skill_id = Column(Integer, primary_key=True, index=True)
    skill_name = Column(String, nullable=False)
    skill_desc = Column(String)
    is_active = Column(Boolean)
