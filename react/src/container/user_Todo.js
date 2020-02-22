import React from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Layout from "../components/Layout";
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class Todo extends React.Component {
  state = {
    todos : [],
    new_todo: '',
    has_error: false
  }

  componentDidMount=()=>{
    if (localStorage.getItem('token')){}
    else{
      this.props.history.push('/')
    }
    axios({
      method:'get',
      url: 'http://127.0.0.1:8000/api/todo/user-todo/',
      headers: {'Authorization': localStorage.getItem('token')},
    }).then((response)=>{
      if (response["data"]){
      let data=response["data"]["response"]
      data.map((element)=>{return(this.setState({todos: [...this.state.todos, {'notes':element.notes, 'id':element.id, 'status':element.status}]}))})
      console.log(this.state.todos)
      }
    }).catch((error)=>{
      if(error.response.status===401){
        this.setState({has_error: true})
      }
    })
  }

  handleChangeInput =(event) => {
    this.setState({new_todo : event.target.value })
  }

  handleAddClick = (event)=>{
    if(this.state.new_todo!==''){
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/todo/user-todo/',
        headers: {'Authorization': localStorage.getItem('token'),
                  'Content-Type': 'application/json'},
        data: {'notes': this.state.new_todo}
      }).then((response)=>{
          if(response["data"]){
            let todo = response['data']['response']
            this.setState({todos: [...this.state.todos, {'notes':todo.notes, 'id':todo.id, 'status':todo.status}]})
          }
      }).catch((error)=>{
        if(error.response.status===401){
          this.setState({has_error: true})
        }
      })
    }
  }

  handleRemove=(todo_id)=>{
    axios({
      method: 'delete',
      url: 'http://127.0.0.1:8000/api/todo/user-todo/'+todo_id+"/",
      headers: {'Authorization': localStorage.getItem('token')},
      }).then((response)=>{
        if(response["data"]){
          this.setState({todos: this.state.todos.filter(e=> e.id!==todo_id)})
        }
      }).catch((error)=>{
        if(error.response.status===401){
          this.setState({has_error: true})
        }
      })
  }

  handleCheck=(todo_id)=>{
    let element = this.state.todos.filter(e=>e.id===todo_id)
    let status = null
    if (element[0].status === 'pending'){
      status = 'completed'
    }
    else{
      status = 'pending'
    }
    axios({
      method: 'put',
      url: 'http://127.0.0.1:8000/api/todo/user-todo/'+todo_id+"/",
      headers: {'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'},
      data: {'status': status}
    }).then((response)=>{
        if(response["data"]){
          let todo = response['data']['response']
          this.setState({todos: this.state.todos.map((e)=> {
           if(e.id===todo_id){
             e.status = todo.status
           }
           return e
          }
          )})
        }}).catch((error)=>{
        if(error.response.status===401){
          this.setState({has_error: true})
        }
    })
  }

  render(){
    let name = localStorage.getItem('user')
    console.log(name)
    if(this.state.has_error)
            return <Redirect to="/" />
    return (
      <Layout name={name} history={this.props.history}>
        <AddTodo
          onInputChange={this.handleChangeInput}
          onButtonClick={this.handleAddClick}
        />
        <TodoList
          items={this.state.todos}
          checked={this.state.checked}
          onItemCheck={this.handleCheck}
          onItemRemove={this.handleRemove}
        />
      </Layout>
  );
  }
}   

export default Todo;
