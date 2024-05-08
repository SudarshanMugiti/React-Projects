import useHttp from "../hooks/useHTTP";
import MealItem from "./MealItem";
import Error from "./Error";

const requestConfig = {};
export default function Meals() {
  const {
    data: loadedMeals,
    isloading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  if (isloading) {
    return <p className="center">Fetching Meals....</p>;
  }
  if(error){
    return <Error title={"Failed to fetch meals"} message={error}></Error>
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
