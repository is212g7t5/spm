from .crud_course import course
from .crud_job import job
from .crud_job_skill import job_skill
from .crud_learning_journey import learning_journey
from .crud_learning_journey_course import learning_journey_course
from .crud_registration import registration
from .crud_role import role
from .crud_skill import skill
from .crud_skill_course import skill_course
from .crud_staff import staff

# For a new basic set of CRUD operations you could just do

# from .base import CRUDBase
# from app.models.item import Item
# from app.schemas.item import ItemCreate, ItemUpdate

# item = CRUDBase[Item, ItemCreate, ItemUpdate](Item)
