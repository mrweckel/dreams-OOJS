james = User.create(google_username: "jhwang90", YT_uid: "123abc")
matt = User.create(google_username: "weckz", YT_uid: "abc123")

dream1 = Dream.create(dream_name: "sports")
dream2 = Dream.create(dream_name: "children")

video1 = Video.create(YT_video_id: 1, start_time:"2", end_time:"12")
video2 = Video.create(YT_video_id: 2, start_time:"3", end_time:"13")

dream1.videos.create(video1)
dream2.videos.create(video2)

james_dream = james.dreams.create(dream1)
matt_dream = matt.dreams.create(dream2)
