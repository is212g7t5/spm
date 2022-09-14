"""Init database

Revision ID: 0001
Revises:
Create Date: 2022-09-14 00:00:00

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


UPGRADE_SQL = """
CREATE TABLE IF NOT EXISTS `role` (
    `Role_ID` int NOT NULL,
    `Role_Name` varchar(20) NOT NULL,
    PRIMARY KEY (`Role_ID`)
) DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `staff` (
    `Staff_ID` int NOT NULL AUTO_INCREMENT,
    `Staff_FName` varchar(50) NOT NULL,
    `Staff_LName` varchar(50) NOT NULL,
    `Dept` varchar(50) NOT NULL,
    `Email` varchar(50) NOT NULL,
    `Role` int NOT NULL,
    PRIMARY KEY (`Staff_ID`),
    FOREIGN KEY `FK_staff_role` (`Role`) REFERENCES role(`Role_ID`)
) DEFAULT CHARSET=utf8;
"""

DOWNGRADE_SQL = """
DROP TABLE IF EXISTS `staff`;

DROP TABLE IF EXISTS `role`;
"""


def upgrade():
    op.execute(UPGRADE_SQL)


def downgrade():
    op.execute(DOWNGRADE_SQL)
