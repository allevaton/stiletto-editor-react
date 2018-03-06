import actionHasMeta from '../util/actionHasMeta';

const DEV = process.env.NODE_ENV !== 'production';

export default engineConnector => store => {
  engineConnector.setupSubscriber();

  return next => action => {
    if (actionHasMeta(action) && action.meta._engineAction === true) {
      if (DEV) {
        store.dispatch({ type: 'ENGINE_ACTION', action });
      }

      return engineConnector.dispatch(action);
    }

    return next(action);
  };
};
