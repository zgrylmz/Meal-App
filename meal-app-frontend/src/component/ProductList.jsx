import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipesFromMongodb, getRecipesPagination } from '../Redux/recipeSlice/recipeSlice';
import Recipes from '../Pages/Recipes';
import SearchForCountries from './SearchForCountries';
import FilterByCategories from './FilterByCategories';
import Button from '@mui/material/Button';
import axios from 'axios';

function ProductList() {
  const dispatch = useDispatch();
  const { entities } = useSelector((store) => store.recipeSlice);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentPage, setCurrentPage]= useState(1)
  const [totalPages, setTotalPages] = useState()
  const [pageFromBackend, setPageFromBackend] = useState()
  
  // const [fetchedData , SetfetchedData] = useState([])

  useEffect(() => {
    const fetchPaginatedRecipes = async () => {
      try {
        const alreadyFetched = entities?.recipes?.length > 0;
    
        if (!alreadyFetched || currentPage != pageFromBackend) {
          const response = await dispatch(getRecipesPagination({ Page: currentPage })).unwrap();
          setTotalPages(response.totalPages);
          setPageFromBackend(response.page);
        }
      } catch (error) {
        console.error('Error fetching paginated recipes:', error);
      }
    };
    console.log(pageFromBackend)
  
    fetchPaginatedRecipes();
  }, [currentPage, dispatch,pageFromBackend,entities?.recipes?.length]);
  

// console.log(fetchedData)


  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };



  const catchCountry = (dataCountry) => {
    setSelectedCountry(dataCountry);
  }

  const catchCategory = (dataCategory) => {
    setSelectedCategory(dataCategory)
  }

  return (
    <>
      <div className='flex-category'>
        <SearchForCountries filteredCountries={catchCountry} />
        <FilterByCategories filterCategories={catchCategory} />
      </div>

      <div className="recipes-container">
        

        {
           entities.recipes && ( 
            selectedCategory.length > 0 && selectedCountry.length > 0 ?
            entities.recipes.filter((item) => selectedCategory.includes(item.Category) && selectedCountry.includes(item.country))
                .map((recipe, id) => (
                  <Recipes key={id} recipe={recipe} />
                )) :
              selectedCategory.length > 0 ?
              entities.recipes.filter((item) => selectedCategory.includes(item.Category))
                  .map((recipe, id) => (
                    <Recipes key={id} recipe={recipe} />
                  )) :
                selectedCountry.length > 0 ?
                entities.recipes.filter((item) => selectedCountry.includes(item.country))
                    .map((recipe, id) => (
                      <Recipes key={id} recipe={recipe} />
                    )) :
                    entities.recipes.map((recipe, id) => (
                    <Recipes key={id} recipe={recipe} />
                  ))
          )
        }

      </div>
      <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
          variant="outlined"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        <span style={{ margin: '0 10px', alignSelf: 'center' }}>
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outlined"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default ProductList 