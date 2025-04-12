import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipesFromMongodb } from '../Redux/recipeSlice/recipeSlice';
import Recipes from '../Pages/Recipes';
import SearchForCountries from './SearchForCountries';
import FilterByCategories from './FilterByCategories';

function ProductList() {
  const dispatch = useDispatch();
  const { entities } = useSelector((store) => store.recipeSlice);
  const { loading } = useSelector((store) => store.recipeSlice);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    if (entities.length == 0) {
      dispatch(getAllRecipesFromMongodb());

    }


  }, [dispatch, entities.length]);


// console.log(loading)

  // if (!entities ) {
  //   return <p>Loading...</p>
  // }

  const catchCountry = (dataCountry) => {
    setSelectedCountry(dataCountry);
  }

  const catchCategory = (dataCategory) => {
    setSelectedCategory(dataCategory)
  }
  // console.log(selectedCountry)
  // console.log(selectedCategory);

  return (
    <>
      <div className='flex-category'>
        <SearchForCountries filteredCountries={catchCountry} />
        <FilterByCategories filterCategories={catchCategory} />
      </div>

      <div className="recipes-container">


        {
          entities && ( 
            selectedCategory.length > 0 && selectedCountry.length > 0 ?
              entities.filter((item) => selectedCategory.includes(item.Category) && selectedCountry.includes(item.country))
                .map((recipe, id) => (
                  <Recipes key={id} recipe={recipe} />
                )) :
              selectedCategory.length > 0 ?
                entities.filter((item) => selectedCategory.includes(item.Category))
                  .map((recipe, id) => (
                    <Recipes key={id} recipe={recipe} />
                  )) :
                selectedCountry.length > 0 ?
                  entities.filter((item) => selectedCountry.includes(item.country))
                    .map((recipe, id) => (
                      <Recipes key={id} recipe={recipe} />
                    )) :
                  entities.map((recipe, id) => (
                    <Recipes key={id} recipe={recipe} />
                  ))
          )
        }

      </div>

    </>
  )
}

export default ProductList
