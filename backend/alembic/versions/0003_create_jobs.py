"""Create job Table

Revision ID: 0003
Revises: 0002
Create Date: 2022-09-22 00:00:00

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "0003"
down_revision = "0002"
branch_labels = None
depends_on = None


UPGRADE_SQL = """
CREATE TABLE IF NOT EXISTS `job` (
    `Job_ID` int NOT NULL AUTO_INCREMENT,
    `Job_Name` varchar(50) NOT NULL,
    `Job_Desc` varchar(255),
    `Is_Active` boolean NOT NULL,
    PRIMARY KEY (`Job_ID`)
) DEFAULT CHARSET=utf8;
"""

DOWNGRADE_SQL = """
DROP TABLE IF EXISTS `job`;
"""


def upgrade():
    op.execute(UPGRADE_SQL)


def downgrade():
    op.execute(DOWNGRADE_SQL)
