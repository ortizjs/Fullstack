class Api::PhotosController < ApplicationController
    
    def index 
        # debugger
        @photos = Photo.all
        render :index
    end 
    
    def show 
        @photo = Photo.find(params[:id])
        render :show
    end

    def create 
        @photo = Photo.new(photo_post_params)
        @photo.photographer_id = current_user.id
        # debugger
        if @photo.save
            render :show 
        else
            render json: @photo.errors.full_messages, status: 404
        end
    end

    def update
    end

    def destroy 
        @photo = Photo.find(params[:id])
        if @photo.destroy
            render :show
        else
            render json: @photo.errors.full_messages, status: 422
        end
    end

    private
    def photo_post_params
        params.require(:photo).permit(:title, :photographer_id, :attached_photo, :category, :description, :camera, :lens, :date_taken,
        :iso, :focal_distance, :shatter_speed, :aperture, :location)
    end
end