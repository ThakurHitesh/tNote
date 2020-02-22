import React from "react";

import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class TodoListItem extends React.Component{
  render(){  
    let check
    if (this.props.checked==='completed'){
      check=true
    }
    else{
      check=false
    }
    return(
      <ListItem divider={this.props.divider}>
        <Checkbox
          onClick={this.props.onCheckBoxToggle}
          checked={check}
          disableRipple
        />
        <ListItemText><span style={{lineHeight:2.5}}>{this.props.text}</span></ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete Todo" onClick={this.props.onButtonClick}>
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default TodoListItem;
