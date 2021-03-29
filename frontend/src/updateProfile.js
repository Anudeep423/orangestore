import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import {updateProfile} from "./helper/user"


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function MaxWidthDialog({setre = f => f , re = undefined,  setR = f => f ,r = undefined}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [red,setRed] = useState(false)

  const userDetails = JSON.parse(localStorage.getItem("JWT"));

  

  const [values,setValues] = useState({ userName : "" , email : "" , photo : "" , Description : ""  , formData : "" }) ;

  const {userName,email,photo,Description,formData} = values; 

  useEffect( () => {
    setValues({...values, formData: new FormData() })
  }, [])

  const handleChange = (event) => {
    console.log(event.target.value)
    const value = event.target.name === "photo" ? event.target.files[0] : event.target.value;
    const name = event.target.name
    formData.set( name , value);
    setValues({ ...values, [event.target.name]: value   });
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <Button  startIcon={<EditIcon />} onClick={handleClickOpen} variant="contained" color="default" > Edit Profile  </Button>
  
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
          <br></br>
                <Typography align = "center" variant = "h5" >Edit your profile</Typography>

        <DialogContent>
        
          <form className={classes.form} noValidate>
           
           
              <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange = {handleChange}
          value = {userName}
          name="userName"
          label="Name"
          autoFocus
        />
        <Typography> Profile Pic :  </Typography>
            <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange = {handleChange}
          name="photo"
          type="file"
        />
            
            <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange = {handleChange}
          value = {email}
          name="email"
          label="Email"
          autoFocus
        />
            
            <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange = {handleChange}
          value = {Description}
          name="Description"
          label="Description"

        />
<br></br>
<Button
        variant="contained"
        color="primary"
        size="medium"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick = { () => {  
            updateProfile(userDetails._id,formData).then(res => {
                localStorage.setItem("JWT" , JSON.stringify(res) )
                setR(!r)
            }  ).catch(err => {console.log(err)}  )
          }  }
      >
        Save
      </Button>
       
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
