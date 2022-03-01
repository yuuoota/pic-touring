class Spot < ApplicationRecord
  has_many :post_spot_relations, dependent: :delete_all
  has_many :posts, through: :post_spot_relations
  validates :spot_name, uniqueness: true
end
