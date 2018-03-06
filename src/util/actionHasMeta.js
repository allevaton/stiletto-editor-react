export default function actionHasMeta(action) {
  if (typeof action === 'object' && typeof action.meta === 'object') {
    return true;
  }
  return false;
}
