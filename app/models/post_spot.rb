class PostSpot
  include ActiveModel::Model

  attr_accessor(
    :text, :user_id, :images,
    :id, :created_at, :updated_at
   )
  with_options presence: true do
    validates :text
    validates :images, length: { minimum: 1, maximum: 5, message: "は1枚以上5枚以下にしてください" }
  end

  def save
    Post.create(text: text, images: images, user_id: user_id)
  end

  def update(params, post)
    post.update(params)
  end
end