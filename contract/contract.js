export function handle(state, action) {
  if (action.input.function === "register") {
    state.db = [...state.db, action.input.text];
    return { state };
  }

  if (action.input.function === "get") {
    const data = state.db.filter((e) => e === action.input.text);
    return { result: data };
  }
}
