"""remove rental_date

Revision ID: 3b6c549690d0
Revises: 8fbc6aa6cca4
Create Date: 2024-07-03 07:57:24.736001

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3b6c549690d0'
down_revision = '8fbc6aa6cca4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rentals', schema=None) as batch_op:
        batch_op.drop_column('rental_date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rentals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rental_date', sa.DATETIME(), nullable=True))

    # ### end Alembic commands ###