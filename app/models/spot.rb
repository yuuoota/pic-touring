class Spot < ApplicationRecord
  has_many :post_spot_relations
  has_many :posts, through: :post_spot_relations
  validates :spot_name, uniqueness: true
end
