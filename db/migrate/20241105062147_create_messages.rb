class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :content, null: false
      t.references :user, foreign_key: true #外部キーでuserテーブル接続する
      t.boolean :deleted, default: false #通常はfalseにする
      t.timestamps 
    end
  end
end
