import Provider from "./providers";
import RouteRenderer from "./router/route-renderer";

function App() {
	return (
		<Provider>
			<RouteRenderer />
		</Provider>
	);
}

export default App;
