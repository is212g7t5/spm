from sqlalchemy import Column, Integer, String

from app.db.base_class import Base

# if TYPE_CHECKING:
#     from .item import Item  # noqa: F401


class Staff(Base):
    staff_id = Column(Integer, primary_key=True, index=True)
    staff_fname = Column(String, nullable=False)
    staff_lname = Column(String, nullable=False)
    dept = Column(String, nullable=False)
    email = Column(String, nullable=False)
    role = Column(Integer, nullable=False)
