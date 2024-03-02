"""user table

Revision ID: c13931d3cd14
Revises: 
Create Date: 2024-03-02 14:43:26.456897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c13931d3cd14'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('token_blacklist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('jti', sa.String(length=36), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('token_blacklist', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_token_blacklist_jti'), ['jti'], unique=False)

    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=128), nullable=True),
    sa.Column('first_name', sa.String(length=128), nullable=True),
    sa.Column('last_name', sa.String(length=128), nullable=True),
    sa.Column('password', sa.String(length=256), nullable=True),
    sa.Column('role', sa.Enum('STUDENT', 'TEACHER', name='role'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    with op.batch_alter_table('token_blacklist', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_token_blacklist_jti'))

    op.drop_table('token_blacklist')
    # ### end Alembic commands ###
