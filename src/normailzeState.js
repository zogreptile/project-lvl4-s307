export default (state) => {
  const channels = state.channels.reduce((acc, item) => (
    { ...acc, [item.id]: item }
  ), {});
  return { ...state, channels };
};
