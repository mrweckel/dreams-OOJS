class UsersController < ApplicationController

  def create
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
  end

  # Use this to privatize user's google/youtube id
  # def user_params
  #   params.require(:user).permit(:YT_uid)
  # end

>>>>>>> Sets up create new account with user's youtube id params
end
