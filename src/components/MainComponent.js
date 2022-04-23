import React,{ Component } from'react';
import Home from './HomeComponent';


import Menu from '../components/MenuComponents';
import About from '../components/AboutComponent';


import Contact from './ContactComponent';


import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

 import { Routes,Route } from 'react-router-dom';
 
 import { connect } from 'react-redux';
 import { addComment } from '../redux/ActionCreators';




 const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});

class Main extends Component{
 
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
   super(props);
  }
 
  

 render(){

  
  const HomePage= () => {
    return(
        <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
    );

  }
  /*
  const AboutPage= () => {
    return(
        <About leader={this.props.leaders.map((leader) => leader.name)}
        />
  );

}
*/

 
const DishWithId = ({match}) => {
  return(
    <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
    addComment={this.props.addComment}
  />
  );
};
    

  const MenuS= () => {
    return(
      <Menu dishes={this.props.dishes}/>
    );
  }

  
   return(
    
     <div >
       
        <Header />
        <Routes>
        <Route exact path='/' element={<HomePage/>} ></Route>
              <Route exact path='/home' element={<HomePage/>} ></Route>
              <Route exact path='/menu' element={ <MenuS />} ></Route>
              <Route path='/menu/:dishId' element={DishWithId} />
              <Route exact path='/Contactus' element={<Contact/>} ></Route>
              
              <Route exact path='/aboutus' element={() => <About leaders={this.props.leaders.map((leader) => leader.name)} />}  />
          </Routes>
         
        <Footer/>
        </div>
        
   );
 }
}





export default connect(mapStateToProps , mapDispatchToProps)(Main);