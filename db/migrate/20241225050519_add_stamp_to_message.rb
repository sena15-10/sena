class AddStampToMessage < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :stamp_url, :string
  end
end
