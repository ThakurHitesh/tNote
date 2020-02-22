import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {Alert} from '@material-ui/lab'

class SignIn extends React.Component {
    
    state = {
        username : '',
        password : '',
        hasAlert : false
    }

    handleChange =(event) => {
        this.setState({[event.target.name] : event.target.value })
    }

    handleSubmit=(event)=>{
        event.preventDefault();

        const user = {
            username : this.state.username,
            password : this.state.password 
        }
        axios({
            method:'post',
            url: 'http://127.0.0.1:8000/api/user/login/',
            data: user,
            headers: {'Content-Type': 'application/json'}
        }).then((response)=>{
            if (response.data){
              localStorage.setItem("token", response['data']['response']['auth-token'])
              localStorage.setItem("user", response['data']['response']['username'])
              this.props.history.push("/todos");
            }    
        }).catch((error)=>{
            this.setState({hasAlert: true})
        })

        event.target.reset();
    }

    render(){
        return (
            <Container component="main" style={{maxWidth:'30%'}}>
              <CssBaseline />
              <div style={styles.paper}>
                <Avatar style={styles.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form style={styles.form} onSubmit={this.handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="UserName"
                    name="username"
                    autoFocus
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                  />
                  <Alert style={this.state.hasAlert ? styles.styleAlertActive:styles.styleAlert} variant="filled" severity="error">Invalid Credentials</Alert>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={styles.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
  
  );
}}

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: '2%',
    backgroundColor: '#f50057',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '3%',
  },
  submit: {
    marginTop: '2%',
  },
  styleAlertActive: {
    display: 'flex'
  },
  styleAlert: {
    display: 'none'
  }
}

export default SignIn;