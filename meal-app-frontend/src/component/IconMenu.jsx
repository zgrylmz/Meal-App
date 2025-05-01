import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import { ImSpoonKnife } from "react-icons/im";
import { IoIosHome } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineVideoSettings } from "react-icons/md";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { useNavigate } from 'react-router';


export default function IconMenu() {
 const navigate = useNavigate();
  return (
    <Paper sx={{ width: 200, maxWidth: '100%',height:"450px" }}>
      <MenuList>
        <MenuItem onClick={() => navigate("/")}>
          <ListItemIcon>
            <IoIosHome fontSize="xx-large" />
          </ListItemIcon>
          <ListItemText navigate style={{textDecoration:"none"}}>Home</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={()=>navigate("/Recipes")}>
          <ListItemIcon>
            <IoFastFoodOutline fontSize="xx-large" />
          </ListItemIcon>
          <ListItemText style={{textDecoration:"none"}}>Recipes</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={()=>navigate("/Videos")}>
          <ListItemIcon>
            <MdOutlineVideoSettings  fontSize="xx-large" />
          </ListItemIcon>
          <ListItemText>Videos</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => navigate("/fertig")}>
          <ListItemIcon>
            <ImSpoonKnife  fontSize="xx-large" />
          </ListItemIcon>
          <ListItemText>Fertig Menüs</ListItemText>
        </MenuItem>
        
        {/* <MenuItem onClick={()=>navigate("/random-recipes")}>
          <ListItemIcon>
            <GiPerspectiveDiceSixFacesRandom  fontSize="xx-large" />
          </ListItemIcon>
          <ListItemText>Random Rezepte</ListItemText>
        </MenuItem> */}

        <MenuItem onClick={()=>navigate("/favorit-recipes")}>
          <ListItemIcon>
            <GiPerspectiveDiceSixFacesRandom  fontSize="xx-large" />
          </ListItemIcon>
          <ListItemText>My Favorites</ListItemText>
        </MenuItem>

        <MenuItem onClick={()=>navigate("/show-my-comments")}>
          <ListItemIcon>
            <GiPerspectiveDiceSixFacesRandom  fontSize="xx-large" />
          </ListItemIcon>
          <ListItemText>My Comments</ListItemText>
        </MenuItem>
        

        <MenuItem onClick={()=>navigate("/addYourRecipe")}>
          <ListItemIcon>
            <GiPerspectiveDiceSixFacesRandom  fontSize="xx-large" />
          </ListItemIcon>
          <ListItemText>New Recipe</ListItemText>
        </MenuItem>
        
        
      </MenuList>
    </Paper>
  );
}


