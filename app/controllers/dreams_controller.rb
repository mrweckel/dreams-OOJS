class DreamsController < ApplicationController

  def index
    render 'index'
  end

  def create
    @dream = Dream.create()
  end

end
