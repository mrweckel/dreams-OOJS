class User < ActiveRecord::Base
  has_many :dreams
  has_many :videos, through: :dreams
end
