import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [mylist, setMylist] = useState([]);
  const [totalprice, setTotalprice] = useState(0);
  // const [images, setImages] = useState([]);
  const[cart,setCart]=useState([]);
  const[flag,setFlag]=useState(0);
  const[quantity,setQuantity]=useState(1);
  const[calculateTotalPrice,setCalculateTotalPrice]=useState(0);

  const handlesubmit = () => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setMylist(data.products);
        show(data.products);
      });
  };

  function show(mylst) {
    var g = 0;
    var i;
    for (i = 0; i < mylst.length; i++) {
      g = g + mylst[i].price;
    }
    setTotalprice(g);
  }
  function showcart() {
    var demo = [...cart];
    var r=0;
     let calculateTotalPrice = 0;
    for(let r = 0; r < demo.length; r++){
      calculateTotalPrice=calculateTotalPrice+demo[r].qty * demo[r].price;
    }
    setCalculateTotalPrice(calculateTotalPrice);
  


    setFlag(1);
  }

  function handleDelete(index) {
    const newList = [...mylist];
    newList.splice(index, 1);
    setMylist(newList);
  }
  function handleDelete(index) {
    const newList = [...mylist];
    const deletedItemPrice = newList[index].price;
    newList.splice(index, 1);
    setMylist(newList);
    setTotalprice(totalprice - deletedItemPrice);
  }
  function addToCart(item) {
    item.qty=1;
    var flag=0;
    var i=0;
    for(i=0;i<cart.length;i++)
    {
      if(cart[i].id==item.id)
        {flag=1; break; }
    }
    if(flag !=1)
    {
    setCart([...cart, item]);
   
    setTimeout(()=>{
      var demo = [...cart];
      let calculateTotalPrice = 0;
    for(let r = 0; r < demo.length; r++){
      calculateTotalPrice=calculateTotalPrice+demo[r].qty * demo[r].price;
    };
    setCalculateTotalPrice(calculateTotalPrice);
  },1000);
}
  }



  function handleIncrement(item){
  
    var i=0;
    var demo = [...cart];
    for(i=0;i<demo.length;i++)
    {
    
      if(demo[i].id==item.id)
      {
        demo[i].qty +=1;
        // if (demo[i].qty === 0) {
        //   demo.splice(i, 1);
        // }
        break;
      }
    }
  setCart(demo);{
    let calculateTotalPrice = 0;
  for(let r = 0; r < demo.length; r++){
    calculateTotalPrice=calculateTotalPrice+demo[r].qty * demo[r].price;
  }
  setCalculateTotalPrice(calculateTotalPrice);
}
  
  setFlag(1);
  
  }
  

  const handleDecrement = (item) =>{
    var i=0;
    var demo = [...cart];
    for(i=0;i<demo.length;i++)
    {
      //alert(cart[i].id)
      //alert(item.id)
      if(demo[i].id==item.id)
      {
        demo[i].qty -=1;
        if (demo[i].qty === 0) {
          demo.splice(i, 1);
        }
        break;
      }
    }
  setCart(demo);{
      let calculateTotalPrice = 0;
    for(let r = 0; r < demo.length; r++){
      calculateTotalPrice=calculateTotalPrice+demo[r].qty * demo[r].price;
    };
    setCalculateTotalPrice(calculateTotalPrice);
  }



    setFlag(1);
  }
  
  
  return (
    <div className="App">
      <input className="input" type="button" onClick={handlesubmit} value="SUBMIT"></input>
      <input className="VIEW CART" type="button" onClick={showcart} value="VIEW CART"></input>
      

      <table className="table" border={2} cellPadding={8}>
        <thead>
          <tr className="row">
            <th>ID</th>
            <th>TITTLE</th>
            <th>DESCRITION</th>
            <th>PRICE</th>
            <th>discountPercentage</th>
            <th>IMAGES</th>
            <th>DELETE</th>
            <th>ADDTOCART</th>
          </tr>
        </thead>
        <tbody>
          {mylist.map((item, index) => (
            <tr key={index} className="trow">
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.discountPercentage}</td>
              <td><img src={item.images[0]} width="80" height="80" alt="product"></img></td>
              <td><button onClick={() => handleDelete(index)}>Delete</button></td>
              <td><button onClick={() => addToCart(item)}>Add to Cart</button></td>

            </tr>
          ))}
          
          <tr className="trow">
            <td colSpan="5"> Total = {totalprice}</td>
            <p>Number of items in cart: {cart.length}</p>
          </tr>
        </tbody>
       
      </table>

      {flag==1?
    

     <table className="table" border={2} cellPadding={8}>
     <thead >
          <tr className="row">
            <th>ID</th>
            <th>TITTLE</th>
            <th>DESCRITION</th>
            <th>PRICE</th>
            <th>discountPercentage</th>
            <th>IMAGES</th>
            <th>QUANTITY</th>
           
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index} className="trow">
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.discountPercentage}</td>
              <td><img src={item.images[0]} width="80" height="80" alt="product"></img></td>
                         
                 <td><input type="button" onClick={() => handleIncrement(item)} value="+" ></input>
                 <p>{item.qty}</p>
                <input type="button" onClick={() => handleDecrement(item)} value="-" ></input>
              </td>
              
            </tr>
          ))}
          
           <tr className="trow">
            <td colSpan="5"> Total = {calculateTotalPrice}</td>
            </tr> 
            
          </tbody>
     </table>
     :""}


      
    
    </div>
  );
}

export default App;