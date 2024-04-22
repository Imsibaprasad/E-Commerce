import React, { useEffect, useState } from "react";
import myContext from "./myContext";
import { QuerySnapshot, Timestamp, collection, addDoc, onSnapshot, orderBy, query, setDoc, deleteDoc } from "firebase/firestore";
import { fireDB } from '../../firebase/FirebaseConfig'
import { toast } from "react-toastify";

function MyState(props) {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = "rgb(17, 24, 39)"
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';

    }
  }

  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

  // ********************** Add Product Section  **********************


  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null ||
      products.description == null) {
      return toast.error('Please fill all fields')
    }

    setLoading(true)


    try {

      const productRef = collection(fireDB, 'products');

      await addDoc(productRef, products);
      toast.success("Product Added Successfully");
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 800);
      getProductData();
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    // setProducts("")
  }

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true)

    try {
      const q = query(
        collection(fireDB, 'products'),
        orderBy('time')
      );

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });

        setProduct(productArray);
        setLoading(false)
      })

      return () => data;

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  // update Product Function

  const edithandle = (item) => {
    setProducts(item)
  }

  const updateProduct = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, 'products', products.id), products)
      toast.success("Product Updated Successfully")
      window.location.href = '/dashboard'
      getProductData();
      setLoading(false);

    } catch (error) {
      console.log(error)
      setLoading(false)

    }
  }

  // delete Product

  const deleteProduct = async (item) => {
    setLoading(true)
    try {
      await deleteDoc(doc(fireDB, 'products', item.id));
      toast.success("Product Deleted Successfully")

      getProductData();
      setLoading(false);

    } catch (error) {
      toast.success("Product Deleted Failed")
      setLoading(false)

    }
  }





  return (
    <myContext.Provider value={{
      mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct, product, edithandle, updateProduct, deleteProduct
    }}>
      {props.children}
    </myContext.Provider>
  );
};

export default MyState