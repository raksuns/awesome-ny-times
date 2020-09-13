import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./Containers/Header";
import { News } from "./Containers/News";
import 'App.css';

const App = () => {
	return (
		<>
			<Header />
			<Switch>
				<Route path="/" exact component={News}/>
			</Switch>
		</>
	);
};

export default App;
