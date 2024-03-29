"""student group relation

Revision ID: 6774f76e97ff
Revises: 5654816a8003
Create Date: 2024-03-02 20:07:57.466270

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6774f76e97ff'
down_revision = '5654816a8003'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('group', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=64),
               nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('group_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'group', ['group_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('group_id')

    with op.batch_alter_table('group', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=64),
               nullable=True)

    # ### end Alembic commands ###
