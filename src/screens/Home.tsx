import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Realm from "realm";
import {UUID, ObjectId} from 'bson'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

uuid
const Home = () => {
    
/*     const Icomes = {
        _id: 'uuid',
        name: 'string',
        lastname: 'string',
        category: 'string',
        amount: 'int',
        comments: 'string',
        dob: 'date'
    }
    const Expenses = {
        _id: 'uuid',
        name: 'string',
        lastname: 'string',
        category: 'string',
        amount: 'int',
        comments: 'string',
        dob: 'date'
    } */
    
    
    const User = {
        name: "User",
        primaryKey: "_id",
        properties: {
          _id: "uuid",
          name: "string",
          Incomes: {type : "list", objectType: "Incomes"},
          Expenses: {type : "list", objectType: "Expenses"}
        }
    } 
    const Expenses = {
        name: "Expenses",
        primaryKey: "_id",
        properties: {
            _id: "uuid",
            name: "string",
            lastname: "string",
            category: "string",
            amount: "int",
            comments: "string",
            dob: "date"
        }
    }
    const Incomes = {
        name: "Incomes",
        primaryKey: "_id",
        properties: {
            _id: "uuid",
            name: "string",
            lastname: "string",
            category: "string",
            amount: "int",
            comments: "string",
            dob: "date"
        }
    }

    type IObjet = {
        name: string,
        primaryKey: string,
        Incomes: IncomesType[],
        Expenses: ExpensesType[],
    }
    
    type IProperties = {
        _id: string,
        name: string,
        lastname: string,
        category: string,
        amount: number,
        comments: string,
        dob: Date
    }
    type IncomesType = {
        _id: string,
        name: string,
        lastname: string,
        category: string,
        amount: number,
        comments: string,
        dob: Date
    }
    type ExpensesType = {
        _id: string,
        name: string,
        lastname: string,
        category: string,
        amount: number,
        comments: string,
        dob: Date
    }
/*     type AllType = {
        IncomesType: IncomesType[],
        ExpensesType: ExpensesType[],
    } */

/*     const incomeDetails = {
    _id: 'uuid',
    name: 'Aline',
    lastname: 'Must',
    category: 'Nike',
    amount: 1234,
    comments: "commentaire",
    dob: new Date()
    }
    const expenseDetails = {
    _id: 'uuid',
    name: 'Aline',
    lastname: 'Must',
    category: 'Nike',
    amount: 1234,
    comments: "commentaire",
    dob: new Date()
    } */


        const { UUID } = Realm.BSON;
        const [myUser, setMyUser] = useState<IObjet[] >([]);


    const DeleteAllUser = () => {
        Realm.open({
            schema: [Expenses, Incomes, User]
        }).then(realm => {
            realm.write(() => {
                realm.delete(
                    realm.objects("User")//.filtered("name = 'Aline'")
                  );
            })
            console.log("Delete user successfully");
            realm.close()
        }).catch(err => {
            console.log('error: ', err);
        })

    };
    
    
    
    
    
    
    const AddUser = () => {
        Realm.open({
            schema: [Expenses, Incomes, User]
        }).then(realm => {
            realm.write(() => {
                realm.create('User', {
                    _id: new UUID(),
                    name: 'User',
                    Incomes: [{
                        _id: new UUID(),
                        name: 'Aline',
                        lastname: 'Must',
                        category: 'Nike',
                        amount: 1234,
                        comments: "commentaire",
                        dob: new Date()
                    }],
                    Expenses: [{
                        _id: new UUID(),
                        name: 'Olivier',
                        lastname: 'Dray',
                        category: 'Addidas',
                        amount: 1234,
                        comments: "commentaire",
                        dob: new Date()
                    }], 
                })
            })
            console.log("Add user successfully");

            setMyUser([...realm.objects<IObjet>('User')])
            realm.close()
        }).catch(err => {
            console.log('error: ', err);
        })
    }

    
    const ShowAllUser = () => {
        Realm.open({
            schema: [Expenses, Incomes, User]
        }).then(realm => {
            setMyUser([...realm.objects<IObjet>('User')])
            console.log('User', realm.objects('User'));
            
        })
    };
    
    return (
    <View>
     <Button title="Add User" onPress={AddUser}/>
     <Button title="Show User" onPress={ShowAllUser}/>
     <Button title="Delete User" onPress={DeleteAllUser}/>
     <View>
        {
            myUser.map((item, index) => (
                <View>
                     <Text>No: {index}</Text>
                    <Text>ID: {`${item.Incomes[0]._id}`}</Text>
                    <Text>Username: {item.Incomes[0].name}</Text>
                    <Text>lastname: {item.Incomes[0].lastname}</Text> 
                    <Text>amount: {item.Incomes[0].amount}</Text> 
                    <Text>category: {item.Incomes[0].category}</Text> 
                    <Text>comments: {item.Incomes[0].comments}</Text> 
                    <Text>date: {item.Incomes[0].dob.toString()}</Text>
                 
                </View>
            ))
        }
     </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({

})