# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :bubblit,
  ecto_repos: [Bubblit.Repo]

# Configures the endpoint
config :bubblit, BubblitWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "3+APHMg4yOe3JyPHHSbGJirqCdX4n+Go/n2J0X4spR/DNGuRIu3UWwaGaaDW5bvN",
  render_errors: [view: BubblitWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Bubblit.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "ROx6N+3E"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
