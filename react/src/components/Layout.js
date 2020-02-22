import React from "react";
import { AppBar, Toolbar, Typography, Paper, Button} from "@material-ui/core";


class Layout extends React.Component{
  
  handleLogout =()=>{
    this.props.history.push("/");
    localStorage.clear();
  }

  handleProfile=()=>{
    this.props.history.push("/profile")
  }
  
  render(){
    return(
      <Paper
        elevation={0}
        style={{width:'70%'}}
      >
        <AppBar color="primary" position="static" style={{ height: 64, backgroundColor:'rgb(44, 37, 37)' }}>
          <Toolbar style={styles.headerStyle}>
            <Typography style={styles.headerTypography} color="inherit">Welcome! {this.props.name}</Typography>
            <div style={styles.headerButton}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={this.handleProfile}
              >
              Profile
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
        {this.props.children}
      </Paper>
    )
  }
}

const styles = {
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
  }
}

export default Layout;
