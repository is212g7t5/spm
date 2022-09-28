"""Create skill Table

Revision ID: 0002
Revises: 0001
Create Date: 2022-09-18 00:00:00

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None


UPGRADE_SQL = """
CREATE TABLE IF NOT EXISTS `skill` (
    `Skill_ID` int NOT NULL AUTO_INCREMENT,
    `Skill_Name` varchar(50) NOT NULL,
    `Skill_Desc` varchar(255),
    `Is_Active` boolean,
    PRIMARY KEY (`Skill_ID`)
) DEFAULT CHARSET=utf8;
"""

DOWNGRADE_SQL = """
DROP TABLE IF EXISTS `skill`;
"""


def upgrade():
    op.execute(UPGRADE_SQL)


def downgrade():
    op.execute(DOWNGRADE_SQL)
