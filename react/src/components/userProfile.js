import React from 'react';
import { AppBar, Toolbar} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {Alert} from '@material-ui/lab'

class Profile extends React.Component{
    
    state = {
        firstName : '',
        lastName : '',
        email : '',
        userName : '',
        hasAlert : false,
        usedUsername: false,
    }
    
    componentDidMount=()=>{
        if (localStorage.getItem('token')){}
        else{
        this.props.history.push('/')
        }
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/user/profile/',
            headers: {'Authorization': localStorage.getItem('token')}
            }).then((response)=>{
                let data = response["data"]["response"]
                this.setState({userName: data["username"],firstName: data["first_name"], lastName: data["last_name"], email:data["email"]})
            }).catch((error)=>{
                console.log(error)
            })
    }

    handleChange =(event) => {
        this.setState({[event.target.name] : event.target.value })
    }

    handleLogout =()=>{
        this.props.history.push("/");
        localStorage.clear();
    }

    handleTodos =()=>{
        this.props.history.push("/todos");
    }

    handleSubmit = (event) =>{
        event.preventDefault();

        const user = {
            first_name : this.state.firstName,
            last_name : this.state.lastName,
            email : this.state.email !== ''? this.state.email : null,
            username : this.state.userName, 
        }
        
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8000/api/user/profile/',
            data: user,
            headers: {'Content-Type': 'application/json',
                      'Authorization': localStorage.getItem("token")}
            }).then((response)=>{
                localStorage.setItem("token", response['data']['response']['auth-token'])
                localStorage.setItem("user", response['data']['response']['username'])
                this.setState({hasAlert: true})
                this.setState({usedUsername: false})
            }).catch((error)=>{
                console.log(error)
                this.setState({usedUsername: true})
                this.setState({hasAlert: false})
            })
    }

    render(){
        let name = localStorage.getItem('user')
        return (
            <Container component="main" style={{maxWidth:'50%'}}>
            <CssBaseline />
                <AppBar color="primary" position="static" style={{ height: 64, backgroundColor:'rgb(44, 37, 37)' }}>
                <Toolbar style={styles.headerStyle}>
                    <Typography style={styles.headerTypography} color="inherit">{name}'s profile.</Typography>
                    <div style={styles.headerButton}>
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={this.handleTodos}
                        >
                        Todos
                        </Button>
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={this.handleLogout}
                        >
                        Logout
                        </Button>
                    </div>
                </Toolbar>
                </AppBar>
                <form style={styles.form} onSubmit = {this.handleSubmit}>
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
                        value={this.state.firstName}
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
                        value={this.state.lastName} 
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
                        value={this.state.email}
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
                        value={this.state.userName}
                    />
                    </Grid>
                </Grid>
                <Alert style={this.state.usedUsername ? styles.styleAlertActive:styles.styleAlert} variant="filled" severity="error">Username is already taken</Alert>
                <Alert style={this.state.hasAlert ? styles.styleAlertActive:styles.styleAlert} variant="filled" severity="success">Profile Updated</Alert>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={styles.submit}
                >
                    Update Profile
                </Button>
                </form>
            </Container>
        );
}}

const styles = {
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: '3%',
    },
    submit: {
      marginTop: '2%',
    },
    headerStyle:{
      flex: 1,
      flexDirection: 'row',
      height: 64
    },
    headerTypography:{
      flex:1
    },
    headerButton:{
      flex: 1
    },
    styleAlertActive: {
      marginTop: '2%',
      display: 'flex'
    },
    styleAlert: {
      marginTop: '2%',
      display: 'none'
    }
};

export default Profile;