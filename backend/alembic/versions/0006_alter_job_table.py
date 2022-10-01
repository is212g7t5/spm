"""Alter job Table

Revision ID: 0006
Revises: 0005
Create Date: 2022-10-02 00:00:00

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "0006"
down_revision = "0005"
branch_labels = None
depends_on = None


UPGRADE_SQL = """
ALTER TABLE job
ADD INDEX `index_job_name` (job_name),
MODIFY job_desc varchar(255) NOT NULL;
"""

DOWNGRADE_SQL = """
ALTER TABLE job
MODIFY job_desc varchar(255) DEFAULT NULL,
DROP INDEX `index_job_name`;
"""


def upgrade():
    op.execute(UPGRADE_SQL)


def downgrade():
    op.execute(DOWNGRADE_SQL)
