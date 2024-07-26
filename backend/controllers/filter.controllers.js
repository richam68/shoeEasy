var { users, products } = require("../db");
const { handleError } = require("../utils");

exports.getFilters = async (req, res) => {

  console.log(`GET request to "/filter" received`);

  let filter = req.user.filters; 
  products.find({});

  return res.status(200).json({
    Hello: "World",
  });
};


exports.addFilters = async (req, res) => {
  const incomingFilter = Object.keys(req.query)[0];
  const incomingFilterValue = Object.values(req.query)[0];
  const specificFilterOfUser = req.user.filters[incomingFilter];

  const newFilter = {
    ...req.user.filters,
  };

  if (incomingFilter === "category" || incomingFilter === "brands") {
    if (specificFilterOfUser) {
      if (specificFilterOfUser.includes(incomingFilterValue)) {
        return res.status(403).json("Filter already present");
      } else {
        newFilter[incomingFilter] = [
          ...specificFilterOfUser,
          incomingFilterValue,
        ];
      }
    } else {
      let arr = [];
      arr.push(incomingFilterValue);
      newFilter[incomingFilter] = arr;
    }
  } else {
    if (newFilter[incomingFilter] === incomingFilterValue)
      return res.status(403).json("Filter already present");

    newFilter[incomingFilter] = incomingFilterValue;
  }

  req.user.filters = newFilter;

  users.update(
    { _id: req.user._id },
    { $set: { filters: req.user.filters } },
    {},
    (err) => {
      if (err) {
        handleError(res, err);
      }

      console.log(
        `User ${req.user.username}'s filters updated to`,
        req.user.filters
      );

      return res.status(200).json(req.user.filters);
    }
  );
};


exports.removeFilters = async (req, res)=>{
  const incomingFilter = Object.keys(req.query)[0];
  const value = Object.values(req.query)[0];
  const specificFilterOfUser = req.user.filters[incomingFilter];

  const newFilter = {
    ...req.user.filters,
  };

  if (incomingFilter === "category" || incomingFilter === "brands") {
    const updatedSpecificFilter = specificFilterOfUser.filter(filter=> filter!==value)
    if(updatedSpecificFilter.length===0)
    delete newFilter[incomingFilter]; 
    else
    newFilter[incomingFilter] = updatedSpecificFilter; 
  }else{
    delete newFilter[incomingFilter]; 
  }

  req.user.filters = newFilter;

  users.update(
    { _id: req.user._id },
    { $set: { filters: req.user.filters } },
    {},
    (err) => {
      if (err) {
        handleError(res, err);
      }

      console.log(
        `User ${req.user.username}'s filters updated to`,
        req.user.filters
      );

      return res.status(200).json(req.user.filters);
    }
  );
}; 
