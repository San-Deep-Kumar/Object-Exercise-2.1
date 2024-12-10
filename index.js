let express = require('express');
let { resolve } = require('path');

let app = express();
let port = 3010;

let person = {
  firstName: 'Amit',
  lastName: 'Sharma',
  gender: 'Male',
  Age: 30,
  isMember: true,
};

app.get('/person', (req, res) => {
  res.json(person);
});

//fullName
function getFullName(person) {
  return person.firstName + ' ' + person.lastName;
}
app.get('/person/fullname', (req, res) => {
  let fullName = getFullName(person);
  res.json({ fullName: fullName });
});

//Name-gender
function getNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender,
  };
}

app.get('/person/firstname-gender', (req, res) => {
  let firstNameAndGender = getNameAndGender(person);
  res.json(firstNameAndGender);
});
//Incremented Age
function getIncrementedAge(person) {
  person.Age = person.Age + 1;
  return person;
}
app.get('/person/incremented-age', (req, res) => {
  let updatedObject = getIncrementedAge(person);
  res.json(updatedObject);
});
//fullname-membershipstatus
function getFullNameAndMembershipStatus(person) {
  return {
    fullName: person.firstName + ' ' + person.lastName,
    isMember: person.isMember,
  };
}
app.get('/person/fullname-membershipstatus', (req, res) => {
  let membershipInfo = getFullNameAndMembershipStatus(person);
  res.json(membershipInfo);
});

//Discounted Price
function getFinalPrice(cartTotal, isMember) {
  let finalPrice;
  if (isMember === true) {
    finalPrice = cartTotal - cartTotal * 0.1;
  } else {
    finalPrice = cartTotal;
  }
  return finalPrice;
}
app.get('/person/final-price', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);
  res.json({ finalPrice: finalPrice });
});

//Shipping Cost
function getShippingCost(cartTotal, isMember) {
  let shippingCost;
  if (cartTotal > 500 && isMember === true) {
    shippingCost = 0;
  } else {
    shippingCost = 99;
  }
  return shippingCost;
}

app.get('/person/shipping-cost', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getShippingCost(cartTotal, person.isMember);
  res.json({ shippingCost: shippingCost.toFixed(2) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
