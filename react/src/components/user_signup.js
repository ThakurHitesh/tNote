import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const styles = theme => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

class SignUp extends React.Component{
    
    state = {
        firstName : '',
        lastName : '',
        email : '',
        userName : '',
        password : ''
    }
    handleChange =(event) => {
        this.setState({[event.target.name] : event.target.value })
    }
    handleSubmit = (event) =>{
        event.preventDefault();

        const user = {
            first_name : this.state.firstName,
            last_name : this.state.lastName,
            email : this.state.email !== ''? this.state.email : null,
            username : this.state.userName,
            password : this.state.password 
        }
        
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/user/signup/',
            data: user,
            headers: {'Content-Type': 'application/json'}
            }).then((response)=>{
                this.props.history.push("/")
            }).catch((error)=>{
                console.log(error)
            })
        
        event.target.reset();
    }

    render(){
        const {classes} = this.props
        return (
            <Container component="main" style={{maxWidth:'30%'}}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form className={classes.form} onSubmit = {this.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={this.handleChange}
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={this.handleChange}
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        onChange={this.handleChange}
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="userName"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        onChange={this.handleChange}
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="/" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>
        );
}}
export default withStyles(styles)(SignUp);