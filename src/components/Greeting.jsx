export const Greeting = () => {
  const curretDate = new Date();
  const currentTime = curretDate.getHours();
  let greeting = "";
  if (currentTime < 12) {
    greeting = "Buenos días";
  } else if (currentTime < 18) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenas noches";
  }
  return <h1 className="text-3xl font-bold">{greeting}</h1>;
};
