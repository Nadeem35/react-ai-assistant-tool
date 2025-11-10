const App = () => {
  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="grid-span-1 bg-zinc-800 text-teal-100"> Hello Soder </div>

      <div className="col-span-4 ">
        <div className="container h-110 "></div>

        <div className="bg-zinc-800 w-1/2 text-center m-auto border rounded-4xl text-teal-50 p-3 ">
          <input type="text" placeholder="enter your question" />
          <button>Ask me</button>
        </div>
      </div>
    </div>
  );
};

export default App;
