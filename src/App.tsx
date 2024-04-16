import "./App.css";
import GameContextProvider from "@/providers/gameContextProvider";
import Layout from "@/components/Layout";

function App() {
	return (
		<GameContextProvider>
			<div className='container mx-auto w-[400px]'>
				<Layout />
			</div>
		</GameContextProvider>
	);
}

export default App;
