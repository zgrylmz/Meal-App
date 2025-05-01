import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "../Css/Upload.css";
import { useNavigate } from 'react-router';

function Upload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((store)=>store.auth);
  // console.log(user.id);

  const formik = useFormik({
    initialValues: {
      name: '',
      ingredients: '',
      instructions: '',
      author: '',
      cookTime: '',
      thumbnail: '',
      country: '',
      Category: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      ingredients: Yup.string().required('Ingredients are required'),
      instructions: Yup.string().required('Instructions are required'),
      author: Yup.string(),
      cookTime: Yup.number()
        .required('You must give a cook time')
        .typeError('Cook time must be a number'),
      thumbnail: Yup.string().required('Please upload a thumbnail'),
      country: Yup.string().required('Give a country'),
      Category: Yup.string().required('Choose a category'),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          ingredients: values.ingredients.split(',').map((item) => item.trim()),
         createdBy:[
         {
          IdOfTheUser:user.id,
          emailOfTheUser:user.email,
          nameOfTheUser:user.name,
         }
         ]
        };

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/addNewRecipeUpgrated`,
          payload,
          { withCredentials: true }
        );

        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        } else {
          console.error('Unexpected response:', response);
        }
      } catch (error) {
        console.error('Error occurred while uploading:', error);
      }
    },
  });

  // ✅ Handle file and convert to base64
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1]; // remove metadata
        formik.setFieldValue('thumbnail', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = formik;

  return (
    <div className="Upload-page">
      <form onSubmit={handleSubmit}>
        <div className="Upload-page-display-horizontal">
          <div className="upload-div-tags">
            <label>Name:</label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div className="upload-div-tags">
            <label>Ingredients (comma separated):</label>
            <input
              name="ingredients"
              type="text"
              placeholder="Ingredients"
              value={values.ingredients}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.ingredients && touched.ingredients && <p style={{ color: "red" }}>{errors.ingredients}</p>}
          </div>

          <div className="upload-div-tags">
            <label>Instructions:</label>
            <input
              name="instructions"
              type="text"
              placeholder="Instructions"
              value={values.instructions}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.instructions && touched.instructions && <p style={{ color: "red" }}>{errors.instructions}</p>}
          </div>
        </div>

        <div className="upload-div-tags">
          <label>Author:</label>
          <input
            name="author"
            type="text"
            placeholder="Author"
            value={values.author}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.author && touched.author && <p style={{ color: "red" }}>{errors.author}</p>}
        </div>

        <div className="upload-div-tags">
          <label>Cook Time (minutes):</label>
          <input
            name="cookTime"
            type="number"
            placeholder="Cook Time"
            value={values.cookTime}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.cookTime && touched.cookTime && <p style={{ color: "red" }}>{errors.cookTime}</p>}
        </div>

        <div className="upload-div-tags">
          <label>Thumbnail:</label>
          <input
            name="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            onBlur={handleBlur}
          />
          {errors.thumbnail && touched.thumbnail && <p style={{ color: "red" }}>{errors.thumbnail}</p>}
        </div>

        <div className="upload-div-tags">
          <label>Country:</label>
          <select
            name="country"
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select a country</option>
            <option value="Turkey">Turkey</option>
            <option value="Italy">Italy</option>
            <option value="Japan">Japan</option>
          </select>
          {errors.country && touched.country && <p style={{ color: "red" }}>{errors.country}</p>}
        </div>

        <div className="upload-div-tags">
          <label>Category:</label>
          <select
            name="Category"
            value={values.Category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select a category</option>
            <option value="Dough">Dough</option>
            <option value="Beef">Beef</option>
            <option value="Dessert">Dessert</option>
          </select>
          {errors.Category && touched.Category && <p style={{ color: "red" }}>{errors.Category}</p>}
        </div>

        <Stack spacing={1} direction="row" style={{ marginTop: "10px" }}>
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Upload;
