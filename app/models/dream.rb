class Dream < ActiveRecord::Base
  has_many :videos
  belongs_to :user
end
