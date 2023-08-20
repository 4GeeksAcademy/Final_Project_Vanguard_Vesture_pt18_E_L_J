"""empty message

Revision ID: df86a773af71
Revises: 
Create Date: 2023-08-18 22:09:54.546571

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'df86a773af71'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('app_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=500), nullable=False),
    sa.Column('location', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('location')
    )
    op.create_table('categories',
    sa.Column('id', sa.Integer(), autoincrement=False, nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=True),
    sa.Column('last_name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=120), nullable=False),
    sa.Column('address', sa.String(length=200), nullable=True),
    sa.Column('phone', sa.String(length=20), nullable=True),
    sa.Column('location', sa.String(length=100), nullable=True),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('order_date', sa.DateTime(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.Column('paypal_order_id', sa.String(length=50), nullable=False),
    sa.Column('full_name', sa.String(length=150), nullable=False),
    sa.Column('email', sa.String(length=150), nullable=False),
    sa.Column('address', sa.String(length=150), nullable=False),
    sa.Column('phone_number', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('color', sa.String(length=50), nullable=False),
    sa.Column('type', sa.String(length=100), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('sizes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'product_id')
    )
    op.create_table('order_items',
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('size_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['size_id'], ['sizes.id'], ),
    sa.PrimaryKeyConstraint('order_id', 'size_id', 'product_id')
    )
    op.create_table('product_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=500), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product_sizes_stock',
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('size_id', sa.Integer(), nullable=False),
    sa.Column('stock', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['size_id'], ['sizes.id'], ),
    sa.PrimaryKeyConstraint('product_id', 'size_id')
    )
    op.create_table('products_rating',
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Float(), nullable=False),
    sa.CheckConstraint('rating <= 5', name='check_rating_max'),
    sa.CheckConstraint('rating >= 0', name='check_rating_min'),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('product_id', 'user_id')
    )
    op.create_table('shopping_carts',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('size_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['size_id'], ['sizes.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'product_id', 'size_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shopping_carts')
    op.drop_table('products_rating')
    op.drop_table('product_sizes_stock')
    op.drop_table('product_images')
    op.drop_table('order_items')
    op.drop_table('favorites')
    op.drop_table('sizes')
    op.drop_table('products')
    op.drop_table('orders')
    op.drop_table('users')
    op.drop_table('categories')
    op.drop_table('app_images')
    # ### end Alembic commands ###
