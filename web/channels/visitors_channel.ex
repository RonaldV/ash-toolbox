defmodule Ashtoolbox.VisitorsChannel do
  use Ashtoolbox.Web, :channel

  def join("visitors", _params, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    push(socket, "init", Ashtoolbox.Visitors.state())
    {:ok, _} = Ashtoolbox.Visitors.add()
    {:noreply, socket}
  end
  def handle_info(%{event: event}, socket) when event in ["add", "remove"] do
    push(socket, event, %{})
    {:noreply, socket}
  end

  def terminate(_, _) do
    {:ok, _} = Ashtoolbox.Visitors.remove()
    :ok
  end
end