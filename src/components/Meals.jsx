import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error}></Error>;
  }
  // ORIGINAL WAY WE WERE DOING API CALL BEFORE CREATING CUSTOM HOOK
  //   // CREATE STATE TO LOAD MEALS AFTER API CALL RUNS SUCCESSFULLY
  //   const [loadedMeals, setLoadedMeals] = useState([]);

  //   // NEED TO WRAP WITH USEEFFECT TO RUN THIS API CALL ONLY ONCE WHEN THE APP RENDERS - PREVENTS INFINIATE LOOP
  //   useEffect(() => {
  //     // SET UP THE API CALL - USE ASYNC AND AWAIT TO MAKE API CALL AND WAIT FOR A RESPONSE(PROMISE)
  //     async function fetchMeals() {
  //       // GET IS THE DEFAULT METHOD AND WOULD BE USED IF NOT DEFINED, BUT INCLUDING AS AN EXAMPLE OF HOW TO DEFINE THE METHOD USED IN THE HTTP REQUEST
  //       const response = await fetch("http://localhost:3000/meals", {
  //         method: "GET",
  //       });

  //       // EXTRACT DATA FROM API REQUEST AND CONVERT TO JSON, NEED TO USE AWAIT BECAUSE RESPONSE IS EXPECTING A PROMISE
  //       const meals = await response.json();
  //       // UPDATE STATE TO POPULATE WITH MEALS ONCE API CALL RUNS SUCCESSFULLY
  //       setLoadedMeals(meals);
  //     }

  //     // CALL FUNCTION TO RUN IT
  //     fetchMeals();

  //     //REMEMBER USE EFFECT DEPENDENCY ARRAY BEING EMPTY MEANS IT'LL JUST RUN ONCE ON THE FIRST RENDER, IF THERE WAS A DEPENDENCY IT WOULD RUN AGAIN IF THE DEPENDENCY CHANGES
  //   }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
