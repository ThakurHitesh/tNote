import React, { memo } from "react";
import { List, Paper} from "@material-ui/core";

import TodoListItem from "./TodoListItem";

const TodoList = memo(props => (
  <>
    {props.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {props.items.map((todo) => (
            <TodoListItem
              text = {todo["notes"]}
              key={todo["id"]}
              checked={todo["status"]}
              onButtonClick={() => props.onItemRemove(todo["id"])}
              onCheckBoxToggle={() => props.onItemCheck(todo["id"])}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default TodoList;
