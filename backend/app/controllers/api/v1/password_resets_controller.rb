class Api::V1::PasswordResetsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user
      reset_token = user.generate_password_reset_token
      user.save!

    # UserMailerに定義したpassword_resetメソッド呼び出し
    # .deliver_nowは今すぐ送信させる命令
    UserMailer.password_reset(user, reset_token).deliver_now
    
    render json: { status: 'OK', message: 'パスワードリセット用のメールを送信しました。' }

    else
      render json: { status: 'OK', message: 'パスワードリセット用のメールを送信しました。' }
    end
  end

  def update
    @user = User.find_by(reset_password_token: params[:id])

    if @user.nil? || !@user.password_reset_period_valid?
      return render json: { errors: ['トークンが無効か、有効期限が切れています'] }, status: :not_found
    end

    if @user.update(password_params)
      
      @user.clear_password_reset_token
      render json: { status: 'OK', message: 'パスワードが正常に更新されました' }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
