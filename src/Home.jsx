import { Navbar } from "./Components/Navbar";
import { One } from "./Components/One";
import { TopTracks } from "./Components/TopTracks";
import { TopArtists } from "./Components/TopArtists";
import { Two } from "./Components/Two";
import { Three } from "./Components/Three";
import { Footer } from "./Components/Footer";

export const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <One></One>
      <TopTracks></TopTracks>
      <TopArtists></TopArtists>
      <Two></Two>
      <Three></Three>
      <Footer></Footer>
    </>
  );
};
