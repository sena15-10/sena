
class Stamp < ApplicationRecord
  has_many :message_stamps
  has_many :messages, through: :message_stamps

end