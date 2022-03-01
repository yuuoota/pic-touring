class Post < ApplicationRecord
  belongs_to :user
  has_many_attached :images
  has_many :post_spot_relations, dependent: :delete_all
  has_many :spots, through: :post_spot_relations
end
