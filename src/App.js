import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
}, {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
}, 
];

const isSearched = (searchTerm) => (item) =>
  !searchTerm || 
  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.author.toLowerCase().includes(searchTerm.toLowerCase()) 

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
  /> </form>

const Table = ({list, searchTerm, onDismiss}) =>
  <div className="table">
      {list.filter(isSearched(searchTerm)).map( item => 
        <div key={item.objectID} className="table-row"> 
          <span style={{ width: '40%' }}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: '30%' }}>{item.author}</span>
          <span style={{ width: '10%' }}>{item.num_comments}</span>
          <span style={{ width: '10%' }}>{item.points}</span>
          <span style={{ width: '10%' }}>
            <button onClick={() => onDismiss(item.objectID)} type="button" className="button-inline">
              Dismiss
            </button>
          </span>
        </div>
        )
      }
  </div>

class App extends Component {
  constructor(props){
    super(props)
    this.state = {list, searchTerm: '',}
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onDismiss(id){
    const updatedList = 
      this.state.list.filter(item => item.objectID !== id)
    this.setState({list: updatedList})
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const {list, searchTerm} = this.state

    return (
      <div className="page">
        <div className="interactions">
          <Search
              value={searchTerm}
              onChange={this.onSearchChange}>
          </Search>
        </div>
        <Table 
          list={list} 
          searchTerm={searchTerm}
          onDismiss={this.onDismiss}>
        </Table>
      </div>
    );
  }
}

export default App;
