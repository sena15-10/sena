# app/uploaders/avatar_uploader.rb
class AvatarUploader < CarrierWave::Uploader::Base
  storage :file # または :fog（クラウドストレージを使用する場合）

  # 画像のリサイズやバージョンを設定（オプション）
  #  include CarrierWave::MiniMagick

  # version :thumb do
  #   process resize_to_fit: [100, 100]
  # end
  # process resize_to_fit: [800, 800]
  # def extension_whitelist
  #   %w[jpg jpeg gif png]
  # end

  # def filename
  #   "avatar_#{secure_token}.#{file.extension}" if original_filename
  # end

  def default_url(*args)
    ActionController::Base.helpers.asset_path("default_icon.png")
  end
  protected

  def secure_token
    model.instance_variable_get("@#{mounted_as}_secure_token") || model.instance_variable_set("@#{mounted_as}_secure_token", SecureRandom.uuid)
  end
end
