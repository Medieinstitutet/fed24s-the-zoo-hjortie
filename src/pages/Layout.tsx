import { useEffect, useReducer, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { get } from "../services/animalService";
import { AnimalContext } from "../contexts/AnimalContext";
import { AnimalActionTypes, AnimalReducer } from "../reducers/AnimalReducer";
import "../styles/layout.scss";
import home from "../assets/home.svg";

export const Layout = () => {
  const [hasFetched, setHasFetched] = useState(false);
  const [animals, animalDispatch] = useReducer(AnimalReducer, []);

  useEffect(() => {
    const getAnimals = async () => {
      const storedAnimals = localStorage.getItem("storedAnimals");
      if (storedAnimals) {
        animalDispatch({
          type: AnimalActionTypes.LOADED,
          payload: storedAnimals,
        });
        setHasFetched(true);
      } else {
        try {
          const animals = await get();
          animalDispatch({
            type: AnimalActionTypes.LOADED,
            payload: JSON.stringify(animals),
          });
          localStorage.setItem("storedAnimals", JSON.stringify(animals));
        } catch (error) {
          console.error(error);
        } finally {
          setHasFetched(true);
        }
      }
    };
    if (!hasFetched) getAnimals();
  });
  return (
    <>
      <div className="wrapper">
        <AnimalContext.Provider
          value={{ animals, animalDispatch: animalDispatch }}
        >
          <header>
            <h1>Elins 4H-gård</h1>
            <nav>
              <NavLink to="/">
                <img src={home} alt="Home" />
                Home
              </NavLink>
            </nav>
          </header>
          <main>
            <Outlet />
          </main>
        </AnimalContext.Provider>
      </div>
    </>
  );
};
