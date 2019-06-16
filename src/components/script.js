getCountry = () => {
  return new Promise(function(resolve, rejected) {
    setTimeout(() => {
      resolve("Poland");
    }, 2000);
  });
};
getCapital = () => {
  return new Promise(function(resolve, rejected) {
    setTimeout(() => {
      resolve("Warsaw");
    }, 500);
  });
};
// getCapital().then(c => {
//   console.log(c);
// });
// getCountry().then(c => {
//   console.log(c);
// });

// getCountry().then(c => {
//   getCapital().then(cos => console.log(c, cos));
// });

let countryPromise = getCountry();
let capitalPromise = getCapital();
// Promise.all([countryPromise, capitalPromise])
//   .then(c => console.log(c))
//   .catch(cos => console.log(cos));

console.log("capital");

// async function justDoIt() {
//   let countryPromise = await getCountry();
//   let capitalPromise = await getCapital();

//   console.log(countryPromise, capitalPromise);
// }
async function justDoIt() {
  try {
    let countryPromise = getCountry();
    let capitalPromise = getCapital();
    let [c, t] = await Promise.all([countryPromise, capitalPromise]);
    console.log(c, t);
  } catch (x) {
    console.log("Error:", x);
  }
} // zwraca 2 theny w jednym czasie w ktorym dostajemy odpowiedz od ostaniego thena
justDoIt();
