class PostSpot
  include ActiveModel::Model

  attr_accessor(
    :text, :user_id, :images,
    :id, :created_at, :updated_at,
    :spot_name
   )
  with_options presence: true do
    validates :text
    validates :images, length: { minimum: 1, maximum: 5, message: "は1枚以上5枚以下にしてください" }
  end

  def save
    post = Post.create(text: text, images: images, user_id: user_id)
    spot = Spot.where(spot_name: spot_name).first_or_initialize
    spot.save
    PostSpotRelation.create(post_id: post.id, spot_id: spot.id)
  end

  def update(params, post)
    post.post_spot_relations.destroy_all
    spot_name = params.delete(:spot_name)
    spot = Spot.where(spot_name: spot_name).first_or_initialize if spot_name.present?
    spot.save if spot_name.present?
    post.update(params)
    PostSpotRelation.create(post_id: post.id, spot_id: spot.id) if spot_name.present?
  end
end