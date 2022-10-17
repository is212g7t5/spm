"""Alter skill Table

Revision ID: 0009
Revises: 0008
Create Date: 2022-10-17 00:00:00

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "0009"
down_revision = "0008"
branch_labels = None
depends_on = None


UPGRADE_SQL = """
ALTER TABLE skill
ADD INDEX `index_skill_name` (skill_name),
MODIFY skill_desc varchar(255) NOT NULL;
"""

DOWNGRADE_SQL = """
ALTER TABLE skill
MODIFY skill_desc varchar(255) DEFAULT NULL,
DROP INDEX `index_skill_name`;
"""


def upgrade():
    op.execute(UPGRADE_SQL)


def downgrade():
    op.execute(DOWNGRADE_SQL)
