import logo from './logo.svg';
import './App.css';
import { Auth } from './components/Auth';
import { db } from './config/firebase';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect } from 'react'
import { Products } from './components/Products';

function App() {
  // const [itemList, setItemList] = useState([]);
  // const itemsCollection = collection(db, "products");

  // const getItems = async () => {
  //   try {
  //     const data = await getDocs(itemsCollection);
  //     const filteredData = data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id
  //     }));
  //     setItemList(filteredData);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // const deleteItems = async (id) => {
  //   const itemDoc = doc(db, "products", id);
  //   await deleteDoc(itemDoc);
  //   getItems();
  // }

  // useEffect(() => {
  //   getItems();
  // }, [])

  // console.log("itemList", itemList);
  return (
    <div className="App">
      <Auth />
      <Products />

    </div>
  );
}

export default App;
