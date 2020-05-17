import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { routerMiddleware } from "react-router-redux";
import DevTools from "../containers/DevTools";
import { CreateJumpstateMiddleware } from "jumpstate";

const logger = createLogger({
  actionTransformer: action => ({
    ...action,
    type: String(action.type)
  })
});

export default function configureStore(initialState = {}, history) {
  // Compose final middleware and use devtools in debug environment
  // uncomment below line to add logger
  // let middleware = applyMiddleware(thunk, routerMiddleware(history), logger)
  let middleware = applyMiddleware(
    thunk,
    routerMiddleware(history),
    CreateJumpstateMiddleware()
  );
  if (__DEV__) {
    const devTools = require("containers/DevTools").default.instrument();
    middleware = compose(middleware, devTools);
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = createStore(rootReducer, initialState, middleware);

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers/index").default;

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
