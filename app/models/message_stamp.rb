
class MessageStamp < ApplicationRecord
  belongs_to :message
  belongs_to :stamp
end