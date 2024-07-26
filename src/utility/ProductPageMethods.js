import { updateCartOnServer } from "./CartMethods";

export const sidebarFilterFunction = (
  categoryFilter,
  brandFilter,
  currentRating,
  finalPrice,
  products,
  setFilteredProducts,
  setSideBarFilterProducts
) => {
  let newFilteredProduct = [];
  if (categoryFilter.length && brandFilter.length) {
    categoryFilter.forEach((singleCategoryFilter) => {
      brandFilter.forEach((singleBrandFilter) => {
        products.forEach((product) => {
          if (
            product.category === singleCategoryFilter &&
            product.brand === singleBrandFilter &&
            product.cost >= finalPrice[0] &&
            product.cost <= finalPrice[1]
          ) {
            newFilteredProduct.push(product);
          }
        });
      });
    });
    if (currentRating) {
      newFilteredProduct = newFilteredProduct.filter(
        (product) => Math.floor(product.rating) >= currentRating
      );
    }
    if (products.length) {
      setFilteredProducts(newFilteredProduct);
      setSideBarFilterProducts(newFilteredProduct);
    }
  } else if (categoryFilter.length) {
    categoryFilter.forEach((filterItem) => {
      products.forEach((product) => {
        if (
          product.category === filterItem &&
          product.cost >= finalPrice[0] &&
          product.cost <= finalPrice[1]
        ) {
          newFilteredProduct.push(product);
        }
      });
    });
    if (currentRating) {
      newFilteredProduct = newFilteredProduct.filter(
        (product) => Math.floor(product.rating) >= currentRating
      );
    }
    if (products.length) {
      setFilteredProducts(newFilteredProduct);
      setSideBarFilterProducts(newFilteredProduct);
    }
  } else if (brandFilter.length) {
    brandFilter.forEach((filterItem) => {
      products.forEach((product) => {
        if (
          product.brand === filterItem &&
          product.cost >= finalPrice[0] &&
          product.cost <= finalPrice[1]
        ) {
          newFilteredProduct.push(product);
        }
      });
    });
    if (currentRating) {
      newFilteredProduct = newFilteredProduct.filter(
        (product) => Math.floor(product.rating) >= currentRating
      );
    }
    if (products.length) {
      setFilteredProducts(newFilteredProduct);
      setSideBarFilterProducts(newFilteredProduct);
    }
  } else {
    if (currentRating) {
      newFilteredProduct = products.filter(
        (product) =>
          Math.floor(product.rating) >= currentRating &&
          product.cost >= finalPrice[0] &&
          product.cost <= finalPrice[1]
      );
      if (products.length) {
        setFilteredProducts(newFilteredProduct);
        setSideBarFilterProducts(newFilteredProduct);
      }
    } else {
      newFilteredProduct = products.filter(
        (product) =>
          product.cost >= finalPrice[0] && product.cost <= finalPrice[1]
      );
      if (products.length) {
        setFilteredProducts(newFilteredProduct);
        setSideBarFilterProducts(newFilteredProduct);
      }
    }
  }
};

export const sortByFilter = (
  sortBy,
  sidebarFilterProducts,
  setFilteredProducts
) => {
  let newFilteredProducts = [...sidebarFilterProducts];
  if (sortBy === "trending") {
    newFilteredProducts = newFilteredProducts.filter(
      (product) => product.trending === "true"
    );
    if (newFilteredProducts.length) {
      setFilteredProducts(newFilteredProducts);
    }
  } else if (sortBy === "hightolow") {
    newFilteredProducts.sort((a, b) => parseInt(b.cost) - parseInt(a.cost));
    if (newFilteredProducts.length) {
      setFilteredProducts(newFilteredProducts);
    }
  } else if (sortBy === "lowtohigh") {
    newFilteredProducts.sort((a, b) => parseInt(a.cost) - parseInt(b.cost));
    if (newFilteredProducts.length) {
      setFilteredProducts(newFilteredProducts);
    }
  } else if (sortBy === "customerrating") {
    console.log("sorting customer rating");
    newFilteredProducts.sort(
      (a, b) => parseInt(b.ratingCount) - parseInt(a.ratingCount)
    );
    if (newFilteredProducts.length) {
      setFilteredProducts(newFilteredProducts);
    }
  } else {
    if (newFilteredProducts.length) {
      setFilteredProducts(newFilteredProducts);
    }
  }
};

export const windowScrollUp = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const addToBag = async (productId, token) => {
  const data = await updateCartOnServer(productId, 1, token);

  return data.length;
};
