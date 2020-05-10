defmodule BubblitWeb.RoomImageController do
  use BubblitWeb, :controller
  require Util

  def new(conn, %{"room_id" => room_id, "file" => file} = _param) do
    image_file_path = Path.absname("uploaded")

    if File.exists?(image_file_path) == False and File.dir?(image_file_path) do
      :ok = File.mkdir(image_file_path)
    end

    # file_name = Path.basename(file.path)
    # extention = MIME.extensions(file.content_type) |> List.first()

    Util.log("from #{file.path} -> to #{get_room_image_path(room_id)}")
    case File.cp(file.path, get_room_image_path(room_id)) do
      :ok ->
        json(conn, "Uploaded #{file.filename}")

      {:error, msg} ->
        json(conn, "error! #{msg}")
    end
  end

  # 권한 체크 필요.
  def show(conn, %{"room_id" => room_id} = _param) do
    send_file(conn, 200, get_room_image_path(room_id))
  end

  def get_room_image_path(room_id) do
    image_file_path = Path.absname("uploaded")
    "#{image_file_path}/room_#{(room_id)}_image"
  end
end
