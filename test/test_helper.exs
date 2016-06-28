ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Ashtoolbox.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Ashtoolbox.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Ashtoolbox.Repo)

