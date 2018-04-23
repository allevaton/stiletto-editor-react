export default function engineAction(action) {
  if (typeof action === 'object' && typeof action.meta === 'object') {
    action.meta._engineAction = true;
  } else {
    action.meta = { _engineAction: true };
  }

  return action;
}
