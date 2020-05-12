defmodule BubblitWeb.PageController do
  use BubblitWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def f__k_react(conn, _params) do
    conn
    |> redirect(to: "/")
  end
end
