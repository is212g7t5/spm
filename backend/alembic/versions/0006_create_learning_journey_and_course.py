"""Create skill_course Table

Revision ID: 0006
Revises: 0005
Create Date: 2022-09-30 00:00:00

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "0006"
down_revision = "0005"
branch_labels = None
depends_on = None


UPGRADE_SQL = """
CREATE TABLE IF NOT EXISTS `learning_journey` (
    `LJ_ID` int NOT NULL AUTO_INCREMENT,
    `Staff_ID` int NOT NULL,
    `Job_ID` int NOT NULL,
    PRIMARY KEY (`LJ_ID`),
    FOREIGN KEY `FK1_learning_journey` (`Staff_ID`) REFERENCES staff(`Staff_ID`),
    FOREIGN KEY `FK2_learning_journey` (`Job_ID`) REFERENCES job(`Job_ID`)
) DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `learning_journey_course` (
    `LJ_ID` int NOT NULL,
    `Course_ID` varchar(20) NOT NULL,
    PRIMARY KEY (`LJ_ID`, `Course_ID`),
    FOREIGN KEY `FK1_learning_journey_course` (`LJ_ID`) REFERENCES learning_journey(`LJ_ID`),
    FOREIGN KEY `FK2_learning_journey_course` (`Course_ID`) REFERENCES course(`Course_ID`)
) DEFAULT CHARSET=utf8;
"""

DOWNGRADE_SQL = """
DROP TABLE IF EXISTS `learning_journey`;

DROP TABLE IF EXISTS `learning_journey_course`;
"""


def upgrade():
    op.execute(UPGRADE_SQL)


def downgrade():
    op.execute(DOWNGRADE_SQL)
