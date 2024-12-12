class Reaction < ApplicationRecord
    belongs_to :user
    belongs_to :message
    validates :emoji, presence: true
    validates :user, presence: true  # userがnilでないことを確認
  end
