class UsersController < ApplicationController

# before_filter :require_user, only: :show

  def new
    @user = User.new()
  end

  def create
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    if !User.exists?(user_id: params[:userId])
      @user = User.new(user_id: params[:userId])
      if @user.save
        session[:user_id] = @user.user_id
      else
        redirect_to(root_path)
      end
    else
      @user = User.find_by(user_id: params[:userId])
      session[:user_id] = @user.user_id
    end
  end

  # def show
  #   @user = User.find(@user.user_id)
  #   # redirect_to "/users/#{@user.user_id}", layout: false
  # end

  def logout
    session[:user_id] = nil
  end

  def user_params
    params.require(:user).permit!
  end

=======
    @user = User.create(user_params)
    redirect_to
=======
    respond_to do |format|
      format.json
    end
=======
    # respond_to do |format|
    #   format.json
    # end
    p "*"*200
    p user_params[googlePlusUserId]
>>>>>>> Removes fileContent method from user controller
    @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id # this will need to be YT_uid
      else
        # redirect_to #unauthorized_user_path
      end
  end

  def show
    @user = User.find(sessions[:id])
  end

<<<<<<< HEAD
# Used for getting youtube API response specific to google-authorized user
  def fileContent
    @user = User.where(:user_response)
  end

  def require_user
    # redirect_to #unauthorized_user_path unless current_user
>>>>>>> Removes console.logs to minimize debugging noise
  end
=======
  # def require_user
  #   # redirect_to #unauthorized_user_path unless current_user
  # end
>>>>>>> Removes fileContent method from user controller

  # def current_user
  #   @current_user ||= User.find(session[:YT_uid]) if session[:YT_uid]
  #   rescue ActiveRecord::RecordNotFound
  # end

  # Use this to privatize user's google/youtube id
  def user_params
    params.require(:user).permit!
  end

>>>>>>> Sets up create new account with user's youtube id params
end
