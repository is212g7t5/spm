from sqlalchemy.orm import Session

from app import crud
from app.schemas.role import RoleCreate, RoleUpdate
from app.tests.utils.role import create_random_role
from app.tests.utils.utils import random_lower_string


def test_create_role(db: Session) -> None:
    role_name = random_lower_string(20)
    role_in = RoleCreate(role_name=role_name)
    role = crud.role.create(
        db=db,
        obj_in=role_in,
    )
    assert role.role_name == role_name


def test_get_role(db: Session) -> None:
    role = create_random_role(db)
    stored_role = crud.role.get(db=db, role_id=role.role_id)
    assert stored_role
    assert role.role_id == stored_role.role_id
    assert role.role_name == stored_role.role_name


def test_update_role(db: Session) -> None:
    role = create_random_role(db)
    new_role_name = random_lower_string(20)
    assert new_role_name != role.role_name
    role_update = RoleUpdate(role_name=new_role_name)
    role2 = crud.role.update(db=db, db_obj=role, obj_in=role_update)
    assert role2.role_id == role.role_id
    assert role2.role_name == new_role_name


def test_delete_role(db: Session) -> None:
    role = create_random_role(db)
    role2 = crud.role.remove(db=db, role_id=role.role_id)
    role3 = crud.role.get(db=db, role_id=role.role_id)
    assert role3 is None
    assert role2.role_id == role.role_id
    assert role2.role_name == role.role_name


# def test_update_item(db: Session) -> None:
#     title = random_lower_string()
#     description = random_lower_string()
#     item_in = ItemCreate(title=title, description=description)
#     user = create_random_user(db)
#     item = crud.item.create_with_owner(db=db, obj_in=item_in, owner_id=user.id)
#     description2 = random_lower_string()
#     item_update = ItemUpdate(description=description2)
#     item2 = crud.item.update(db=db, db_obj=item, obj_in=item_update)
#     assert item.id == item2.id
#     assert item.title == item2.title
#     assert item2.description == description2
#     assert item.owner_id == item2.owner_id


# def test_delete_item(db: Session) -> None:
#     title = random_lower_string()
#     description = random_lower_string()
#     item_in = ItemCreate(title=title, description=description)
#     user = create_random_user(db)
#     item = crud.item.create_with_owner(db=db, obj_in=item_in, owner_id=user.id)
#     item2 = crud.item.remove(db=db, id=item.id)
#     item3 = crud.item.get(db=db, id=item.id)
#     assert item3 is None
#     assert item2.id == item.id
#     assert item2.title == title
#     assert item2.description == description
#     assert item2.owner_id == user.id
