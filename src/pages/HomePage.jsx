import "../css/Home.css";
import Nav from "../components/Nav";

function HomePage() {
  return (
    <>
      <Nav />
      <main className="">
        <div className="w-100 m-auto">
          <h1 className="head">Welcome for room booking service</h1>
        </div>
      </main>
    </>
  );
}

export default HomePage;
