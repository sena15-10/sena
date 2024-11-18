class Message < ApplicationRecord
    belongs_to :user
    validates :content, presence: true
    default_scope { where(deleted: false) }
end
