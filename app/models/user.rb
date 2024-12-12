
class User < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :reactions, dependent: :destroy

  has_secure_password
  mount_uploader :avatar, AvatarUploader

  
  MIN_PASSWORD_LENGTH = 8
  # ユーザー作成時のバリデーション
  validates :username, presence: true, on: :create
  validates :email, presence: true, uniqueness: true, on: :create

  # パスワードのバリデーションを条件付きで適用
  validates :password, presence: true, length: { minimum: MIN_PASSWORD_LENGTH }, if: -> { password.present? }
  validates :password_confirmation, presence: true, if: -> { password.present? }

  # その他のバリデーションや関連付け
end