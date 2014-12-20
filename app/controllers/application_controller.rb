class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def current_user
    p "*"*200
    p "sessions id: "
    p session[:user_id]
    p "*"*200
  	@current_user ||= User.find_by(user_id: session[:user_id]) if session[:user_id]
  end 

  # def logged_in?
  # 	current_user != nil
  # end //JIC login needed 

  helper_method :current_user 
end
