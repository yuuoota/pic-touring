class PostSpotRelation < ApplicationRecord
  belongs_to :post
  belongs_to :spot
end
