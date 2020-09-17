import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChatBox from './pages/ChatBox/ChatBox';
import Login from './pages/Login/Login';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[500],
		},
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				':focus': { outline: 'none' },
			},
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Switch>
					<Route path="/room/:room/:username">
						<ChatBox />
					</Route>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
