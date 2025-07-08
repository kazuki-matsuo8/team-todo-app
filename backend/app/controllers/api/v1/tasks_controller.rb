class Api::V1::TasksController < ApplicationController
  before_action :authenticate

  def index
    tasks = @current_user.created_tasks
    render json: { tasks: tasks }
  end

  def create
    task = @current_user.created_tasks.build(task_params)

    if task.save
      render json: { status: 'SUCCESS', data: task }, status: :created
    else
      render json: { status: 'ERROR', data: task.errors }, status: :unprocessable_entity
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :content)
  end
end
