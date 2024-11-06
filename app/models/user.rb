class User < ApplicationRecord
    has_secure_password
    MIN_PASSWORD_LENGTH = 8
    
    validates :username, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: MIN_PASSWORD_LENGTH }
  end
  
