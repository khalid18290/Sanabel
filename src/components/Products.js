import { React, useState, useEffect } from 'react';
import { addDoc, getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth, storage } from '../config/firebase';
import { async } from '@firebase/util';
import { updateCurrentUser } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';

export const Products = ({ fnGetItems }) => {
    const [itemList, setItemList] = useState([]);
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [price, setPrice] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [fileUpload, setFileUpload] = useState(null);
    const itemsCollectionRef = collection(db, "products");
    const itemsCollection = collection(db, "products");

    const getItems = async () => {
        try {
            const data = await getDocs(itemsCollection);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setItemList(filteredData);
        } catch (error) {
            console.log('error', error);
        }
    };

    const deleteItems = async (id) => {
        const itemDoc = doc(db, "products", id);
        await deleteDoc(itemDoc);
        getItems();
    }

    const updateItem = async (id) => {
        const itemDoc = doc(db, "products", id);
        await updateDoc(itemDoc, { itemName: updateTitle });
        getItems();
    }

    const uploadFile = async () => {
        if (!fileUpload)
            return
        const filesPathRef = ref(storage, `Items/${fileUpload.name}`);
        try {
            await uploadBytes(filesPathRef, fileUpload);
        } catch (error) {
            console.log('error', error);
        }

    }

    useEffect(() => {
        getItems();
    }, [])

    const addProducts = async () => {
        try {
            await addDoc(itemsCollectionRef, {
                itemName: name,
                description: description,
                price: price,
                userId: auth?.currentUser?.uid
            })
            getItems();
        } catch (error) {
            console.log('error', error);
        }

    }
    return (
        <div>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="ItemName" />
            <input type="text" onChange={(e) => setdescription(e.target.value)} placeholder="Description" />
            <input type="text" onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
            <button onClick={addProducts}>Add Products</button>

            <div>
                {itemList.map(item => (
                    <div>
                        <h1>{item.itemName}</h1>
                        <p>{item.description}</p>
                        <button onClick={() => deleteItems(item.id)}>Delete Items</button>
                        <input placeholder='Title' onChange={(e) => setUpdateTitle(e.target.value)}></input>
                        <button onClick={() => updateItem(item.id)}>Update</button>
                    </div>
                ))}
            </div>

            <div>
                <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
                <button onClick={uploadFile}>Upload File </button>
            </div>
        </div>
    )
}
