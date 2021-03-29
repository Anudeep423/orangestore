import React,{useState,useEffect} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import {Redirect} from "react-router-dom"
import AddProduct from "./AddProduct"
import UpdateProfile from "./updateProfile"
import API from "./Backend"

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`, 
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  menuButton: {
    marginRight: theme.spacing(4)
  },
  title: {
    flexGrow: 1
  },
  pic: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2)
    }
  }
}));

export default function Navbar({img,history,name,_id,role,setR = r => r  ,r}) {
  const classes = useStyles();
 
  const [set , setSet] = useState(false);
  const [pic,setPic] = useState("")
  const [re,setre] = useState(false)

  

  useEffect(  () => {  
    const id =  JSON.parse(localStorage.getItem("JWT"))
    setPic(`${API}/user/photo/${id._id}`)
   } , [re] )

  return (
    <div className={classes.root}>
      <AppBar  position="static">
        <Toolbar>
          <div className={classes.pic}>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              variant="dot"
            >
              <Avatar
                alt="Remy Sharp"
                className={classes.large}
                src={pic }
              />
            </StyledBadge>
          </div>
          <Typography  variant="h6" className={classes.menuButton} > Welcome {name}</Typography> 
          { role === 0 ?  <>
          {set ? <Redirect to = "/" /> : "" }
          <Button variant="h6" className={classes.title}></Button> </> : <> 
          <AddProduct  setR={setR}  r = {r}  />
      {set ? <Redirect to = "/" /> : "" }
      <UpdateProfile setPic= {setPic} setre = {setre} re ={re}  setR={setR}  r = {r} />
          <Button variant="h6" className={classes.title}  >   </Button> </> }

          <Button variant="contained" color="secondary" onClick ={ () => {
            localStorage.removeItem("JWT") 
            setSet(true) 
            }
            }>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}