class Spot < ApplicationRecord
  has_many :post_spot_relations, dependent: :delete_all
  has_many :posts, through: :post_spot_relations
  validates :spot_name, uniqueness: true

  def self.search(search)
    if (search != "")
      Spot.where('spot_name LIKE(?)', "%#{search}%")
    else
      Spot.all
    end
  end
end
