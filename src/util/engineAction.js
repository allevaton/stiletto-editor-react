export default function engineAction(action) {
  if (typeof action === 'object' && typeof action.meta === 'object') {
    action.meta.engineAction = true;
  } else {
    action.meta = { engineAction: true };
  }

  action.origin = 'editor';

  return action;
}
