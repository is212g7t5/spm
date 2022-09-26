"""Init database

Revision ID: 0004
Revises: 0003
Create Date: 2022-09-22 00:00:00

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "0004"
down_revision = "0003"
branch_labels = None
depends_on = None


UPGRADE_SQL = """
CREATE TABLE IF NOT EXISTS `job_skill` (
    `Job_ID` int NOT NULL,
    `Skill_ID` int NOT NULL,
    primary key (`Job_ID`, `Skill_ID`),
    FOREIGN KEY `FK1_job_skill` (`Job_ID`) REFERENCES job(`Job_ID`),
    FOREIGN KEY `FK2_job_skill` (`Skill_ID`) REFERENCES skill(`Skill_ID`)
) DEFAULT CHARSET=utf8;
"""

DOWNGRADE_SQL = """
DROP TABLE IF EXISTS `job_skill`;
"""


def upgrade():
    op.execute(UPGRADE_SQL)


def downgrade():
    op.execute(DOWNGRADE_SQL)
