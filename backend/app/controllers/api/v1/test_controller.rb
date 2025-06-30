class Api::V1::TestController < ApplicationController
  def index
    render json: { message: "バックエンドからのメッセージです！やったね！" }
  end
end
