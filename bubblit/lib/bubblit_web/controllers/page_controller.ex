defmodule BubblitWeb.PageController do
  use BubblitWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
