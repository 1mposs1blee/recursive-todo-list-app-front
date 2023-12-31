import { Provider } from "react-redux";
import { store } from "@/redux/TasksSlice/store";
import "tailwindcss/tailwind.css";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
