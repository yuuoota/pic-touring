class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def new
    @post_spot = PostSpot.new
  end

  def create
    @post_spot = PostSpot.new(post_spot_params)
    if @post_spot.valid?
      @post_spot.save
      redirect_to root_path
    else
      render :new
    end
  end

  def show
    @post = Post.find(params[:id])
    gon.lat_lng = @post.images.map do |image|
      {"lat" => image.metadata["latitude"], "lng" => image.metadata["longitude"]}
    end
    gon.spots = @post.spots.map do |spot|
      spot[:spot_name]
    end
  end

  def edit
    @post = Post.find(params[:id])
    post_attributes = @post.attributes
    @post_spot = PostSpot.new(post_attributes)
    spots_array = @post.spots.map do |spot|
      "##{spot.spot_name}"
    end
    @post_spot.spot_name = spots_array.join
  end

  def update
    @post = Post.find(params[:id])
    @post_spot = PostSpot.new(post_spot_params)
    @post_spot.images ||= @post.images.blobs
    if @post_spot.valid?
      @post_spot.update(post_spot_params, @post)
      redirect_to root_path
    else
      render :edit
    end
  end

  def search
    return nil if params[:keyword] == ""
    spot = Spot.where(['spot_name LIKE ?', "%#{params[:keyword]}%"])
    render json:{ keyword: spot }
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    redirect_to root_path
  end

  def hashtag
    @spot = Spot.find_by(spot_name: params[:name])
    @posts = {posts: @spot.posts, spot: @spot.spot_name}
  end

  private

  def post_spot_params
    params.require(:post_spot).permit(:text, :spot_name, {images: []}).merge(user_id: current_user.id)
  end
end
