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
  end

  def edit
    @post = Post.find(params[:id])
    post_attributes = @post.attributes
    @post_spot = PostSpot.new(post_attributes)
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



  private

  def post_spot_params
    params.require(:post_spot).permit(:text, {images: []}).merge(user_id: current_user.id)
  end
end
