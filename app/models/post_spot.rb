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
    #spot = Spot.where(spot_name: spot_name).first_or_initialize
    #spot.save
    hashtag_spots = self.spot_name.scan(/[#＃][\w\p{Han}ぁ-ヶｦ-ﾟー]+/)
    hashtag_spots.each do |hashtag_spot|
      hashtag_spot.slice!(0)
      spot = Spot.find_or_create_by(spot_name: hashtag_spot)
      post.spots << spot
    end
    #PostSpotRelation.create(post_id: post.id, spot_id: spot.id)
  end

  def update(params, post)
    post.post_spot_relations.destroy_all
    spot_names = params.delete(:spot_name)
    hashtag_spots = spot_names.scan(/[#＃][\w\p{Han}ぁ-ヶｦ-ﾟー]+/)
    hashtag_spots.each do |hashtag_spot|
      hashtag_spot.slice!(0)
      spot = Spot.find_or_create_by(spot_name: hashtag_spot)
      post.spots << spot
    end
    #spot = Spot.where(spot_name: spot_name).first_or_initialize if spot_name.present?
    #spot.save if spot_name.present?
    post.update(params)
    #PostSpotRelation.create(post_id: post.id, spot_id: spot.id) if spot_name.present?
  end
end