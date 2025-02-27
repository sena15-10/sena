class Message < ApplicationRecord
  belongs_to :user
  has_many :message_stamps
  has_many :stamps, through: :message_stamps
  has_many :reactions, dependent: :destroy
  validates :content, presence: true
  default_scope { where(deleted: false) }
end
