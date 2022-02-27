class CreateSpots < ActiveRecord::Migration[6.0]
  def change
    create_table :spots do |t|
      t.string :spot_name, null:false, uniqueness: true
      t.timestamps
    end
  end
end
