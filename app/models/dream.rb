class Dream < ActiveRecord::Base
  serialize :properties, JSON
  has_many :videos
  belongs_to :user
end
