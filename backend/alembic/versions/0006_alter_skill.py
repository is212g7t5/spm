"""Init database

Revision ID: 0006
Revises: 0005
Create Date: 2022-09-25 00:00:00

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "0006"
down_revision = "0005"
branch_labels = None
depends_on = None


UPGRADE_SQL = """
ALTER TABLE `skill` DROP COLUMN IF EXISTS `Course_ID`;
"""

DOWNGRADE_SQL = """
ALTER TABLE `skill`
ADD `Course_ID` varchar(20) NOT NULL,
FOREIGN KEY `FK1_skill_course` (`Course_ID`) REFERENCES course(`Course_ID`);
"""


def upgrade():
    op.execute(UPGRADE_SQL)


def downgrade():
    op.execute(DOWNGRADE_SQL)
