class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
        t.string :username, null: false
        t.string :email, null: false, unique: true
        t.string :password_digest, null: false #null制約付与
        t.timestamps
    end
  
    add_index :users,:email,unique: true #ユニーク制約をユーザー追加する際に付与
  end
end
