class CreatePostSpotRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :post_spot_relations do |t|
      t.references :post, foreign_key: true
      t.references :spot, foreign_key: true
      t.timestamps
    end
  end
end
