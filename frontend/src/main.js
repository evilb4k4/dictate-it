import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';

// import App from './component/app';
// import {Provider} from 'react-redux';
// import storeCreate from './lib/store-create';
// import io from './lib/io.js';
// import userSubscribers from './subscribe/user.js';
// const store = storeCreate();

// let subscribers = Object.assign(userSubscribers);

// io(store, subscribers);

import App from './component/app';

// import storeCreate from './lib/store-create'
// import io from './lib/io.js'

// import userSubscribers from './subscribe/user.js'
// const store = storeCreate()

// let subscribers = Object.assign(userSubscribers)

// io(store, subscribers)
// let AppContainer = () => (
//   <Provider store={store}>
//     <App/>
//   </Provider>
// )
ReactDom.render(<App />, document.getElementById('root'));

