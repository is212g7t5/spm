"""Init database

Revision ID: 0002
Revises: 0001
Create Date: 2022-09-18 00:00:00

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "0002"
down_revision = None
branch_labels = None
depends_on = None


UPGRADE_SQL = """
CREATE TABLE IF NOT EXISTS `role` (
    `Role_ID` int NOT NULL AUTO_INCREMENT,
    `Role_Name` varchar(20) NOT NULL,
    PRIMARY KEY (`Role_ID`)
) DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `course` (
    `Course_ID` varchar(20) NOT NULL,
    `Course_Name` varchar(50) NOT NULL,
    `Course_Desc` varchar(255),
    `Course_Status` varchar(15),
    `Course_Type` varchar(10),
    `Course_Category` varchar(50),
    PRIMARY KEY (`Course_ID`)
) DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `staff` (
    `Staff_ID` int NOT NULL AUTO_INCREMENT,
    `Staff_FName` varchar(50) NOT NULL,
    `Staff_LName` varchar(50) NOT NULL,
    `Dept` varchar(50) NOT NULL,
    `Email` varchar(50) NOT NULL,
    `Role` int NOT NULL,
    PRIMARY KEY (`Staff_ID`),
    FOREIGN KEY `FK1_staff_role` (`Role`) REFERENCES role(`Role_ID`)
) DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `registration` (
    `Reg_ID` int NOT NULL AUTO_INCREMENT,
    `Course_ID` varchar(20) NOT NULL,
    `Staff_ID` int NOT NULL,
    `Reg_Status` varchar(20) NOT NULL,
    `Completion_Status` varchar(20) NOT NULL,
    PRIMARY KEY (`Reg_ID`),
    FOREIGN KEY `FK1_registration_course` (`Course_ID`) REFERENCES course(`Course_ID`),
    FOREIGN KEY `FK1_registration_staff` (`Staff_ID`) REFERENCES staff(`Staff_ID`)
) DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `skill` (
    `Skill_ID` int NOT NULL AUTO_INCREMENT,
    `Course_ID varchar(20) NOT NULL,
    `Skill_Name` varchar(50) NOT NULL,
    `Skill_Desc` varchat(255),
    `Is_Active` boolean,
    PRIMARY KEY (`Skill_ID`),
    FOREIGN KEY `FK1_role_skill` (`Course_ID`) REFERENCES course(`Course_ID`)
) DEFAULT CHARSET=utf8;
"""

DOWNGRADE_SQL = """
DROP TABLE IF EXISTS `registration`;

DROP TABLE IF EXISTS `staff`;

DROP TABLE IF EXISTS `course`;

DROP TABLE IF EXISTS `role`;

DROP TABLE IF EXISTS `skill`;
"""

def upgrade():
    op.execute(UPGRADE_SQL)


def downgrade():
    op.execute(DOWNGRADE_SQL)
