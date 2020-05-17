defmodule BubblitWeb.Plugs.Auth do
  import Plug.Conn
  import Phoenix.Controller

  alias Bubblit.Accounts

  def init(opts), do: opts

  def call(conn, _opts) do
    if user_id = Plug.Conn.get_session(conn, :current_user_id) do
      current_user = Accounts.get_user(user_id)

      if current_user do
        conn
        |> assign(:current_user, current_user)
      else
        conn
        |> BubblitWeb.UserController.logout_user()
        |> redirect(to: "/login")
        |> halt()
      end
    else
      conn
      |> redirect(to: "/login")
      |> halt()
    end
  end
end
