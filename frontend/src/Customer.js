import React,{useState,useEffect} from 'react'
import {Redirect} from "react-router-dom"
import {getUsers} from "./helper/products"
import SellerCard from "./SellerCard"
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Navbar from "./Navbar"
import { Typography } from '@material-ui/core';
import Spinner from "./spinner"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  }));


function Customer(props) {
  console.log("PROPSSSS" , props  )
    const classes = useStyles();

    const [data,setData] = useState()
    const [spin,setSpin] = useState(true);

    useEffect( () => {
        getUsers().then(res => { 
          setSpin(false)
          setData(res)  
        
             console.log(res) }  ).catch(err => {console.log(err)}  )
    } , [] )


    const userJWT = JSON.parse(localStorage.getItem("JWT"))

    console.log("USER JWT" ,  userJWT )

    const [set,setSet] = useState(false)
    return (
        <div>
          <Navbar  role = {userJWT.role} name = {userJWT.userName}  _id = {userJWT._id} />
          <br></br>
          <Typography  align = "center" variant = "h3"  > Seller Profiles  </Typography>
          <br></br>
          {spin   ? <Spinner /> : ""  }
            <div className={classes.root}>
      <Grid container spacing={3}>
            { data ? data.map( (user,i) => {
              console.log("USERSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",user);
               return <Grid item xs={3}>
               <SellerCard  user = {user}  />
               </Grid>
            }   ) : ""    }
</Grid>
</div>
       

            {set  ? <Redirect to = "/"/> : "" }
        </div>
    )
}

export default Customer


{/* <img src={ `https://chicagophotovideo.com/wp-content/uploads/2017/10/ezgif.com-webp-to-jpg-17.jpg` }
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }} /> */}