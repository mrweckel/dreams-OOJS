# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


james = User.create([{google_username: "jhwang90", YT_uid: "123abc"}])
matt = User.create([{google_username: "weckz", YT_uid: "abc123"}])

dream1 = Dream.create(dream_name: "sports")
dream2 = Dream.create(dream_name: "children")

video1 = Video.create(YT_video_id: 1, start_time:"2", end_time:"12")
video2 = Video.create(YT_video_id: 2, start_time:"3", end_time:"13")

dream1.videos << video1
dream2.videos << video2
