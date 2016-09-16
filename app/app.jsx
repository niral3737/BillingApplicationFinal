var React = require('react');
var ReactDOM = require('react-dom');
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from 'app/components/Main.jsx';

injectTapEventPlugin();

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
