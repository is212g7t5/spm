"""Init database

Revision ID: 0005
Revises: 0004
Create Date: 2022-09-24 00:00:00

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "0005"
down_revision = "0004"
branch_labels = None
depends_on = None


UPGRADE_SQL = """
CREATE TABLE IF NOT EXISTS `skill_course` (
    `Skill_ID` int NOT NULL,
    `Course_ID` varchar(20) NOT NULL,
    primary key (`Skill_ID`, `Course_ID`),
    FOREIGN KEY `FK1_skill_course` (`Skill_ID`) REFERENCES skill(`Skill_ID`),
    FOREIGN KEY `FK2_skill_course` (`Course_ID`) REFERENCES course(`Course_ID`)
) DEFAULT CHARSET=utf8;
"""

DOWNGRADE_SQL = """
DROP TABLE IF EXISTS `skill_course`;
"""


def upgrade():
    op.execute(UPGRADE_SQL)


def downgrade():
    op.execute(DOWNGRADE_SQL)
