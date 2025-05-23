import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipesFromMongodb, getRecipesPagination } from '../Redux/recipeSlice/recipeSlice';
import Recipes from '../Pages/Recipes';
import SearchForCountries from './SearchForCountries';
import FilterByCategories from './FilterByCategories';
import Button from '@mui/material/Button';
import axios from 'axios';
import { HiArchiveBoxXMark } from "react-icons/hi2";

function ProductList() {
  const dispatch = useDispatch();
  const { entities } = useSelector((store) => store.recipeSlice);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [pageFromBackend, setPageFromBackend] = useState()
  const expensiveData = useRef(null)
  const [recipes, setRecipes] = useState([]);
  const {input} = useSelector((store)=>store.recipeSlice);
  console.log(input)


  useEffect(() => {
    const fetchPaginatedRecipes = async () => {
      try {
        const alreadyFetched = entities?.recipes?.length > 0;

        if (!expensiveData.current || pageFromBackend!=currentPage ) {
          const data = await dispatch(getRecipesPagination({ Page: currentPage })).unwrap();
          expensiveData.current = data;
          setRecipes(data);
          setTotalPages(data.totalPages);
          setPageFromBackend(data.page);
        }else {
          setRecipes(expensiveData.current); // use cached
        }
      } catch (error) {
        console.error('Error fetching paginated recipes:', error);
      }
    };
    console.log(pageFromBackend)
    console.log(recipes.recipes)

    fetchPaginatedRecipes();
  }, [currentPage, dispatch, pageFromBackend, entities?.recipes?.length]);




  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filterWithInput = useMemo(()=>{
    return recipes?.recipes?.filter((item)=>item.name?.toLowerCase().includes(input?.toLowerCase()));

  },[input,recipes?.recipes])
  console.log(filterWithInput);

  const catchCountry = (dataCountry) => {
    setSelectedCountry(dataCountry);
  }

  const catchCategory = (dataCategory) => {
    setSelectedCategory(dataCategory)
  }

  const resetFilters = () => {
    setSelectedCategory([]);
    setSelectedCountry([]);
    // setCurrentPage(1); // optional
  };
  return (
    <>
      <div className='flex-category'>
        <SearchForCountries
          filteredCountries={catchCountry}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />

        <FilterByCategories
          filterCategories={catchCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <HiArchiveBoxXMark style={{ fontSize: "xx-large", cursor: "pointer",marginTop:"15px" }} title='Reset' onClick={() => resetFilters()} />
      </div>

      <div className="recipes-container">
    

        {
           recipes.recipes && (
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
                    filterWithInput ? filterWithInput.map((recipe,id)=>(
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