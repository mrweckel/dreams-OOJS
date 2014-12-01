class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :google_username
      t.string :YT_uid

      t.timestamps
    end
  end
end
