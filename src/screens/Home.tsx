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
            schema: [Expenses, Incomes]
        }).then(realm => {
            realm.write(() => {
                realm.delete(
                    realm.objects("Incomes")//.filtered("name = 'Aline'")
                  );
            })
            console.log("Delete user successfully");
            realm.close()
        }).catch(err => {
            console.log('error: ', err);
        })

    };
    
    
    
    
    
    
    const AddUserExpenses = () => {
        Realm.open({
            schema: [Expenses]
        }).then(realm => {
            realm.write(() => {
                realm.create('Expenses', {
                        _id: new UUID(),
                        name: 'Olivier',
                        lastname: 'Dray',
                        category: 'Addidas',
                        amount: 1234,
                        comments: "commentaire",
                        dob: new Date()
                })
            })
            console.log("Add user successfully");

            setMyUser([...realm.objects<IObjet>('Expenses')])
            realm.close()
        }).catch(err => {
            console.log('error: ', err);
        })
    }

    const AddUserIncomes = () => {
        Realm.open({
            schema: [Incomes]
        }).then(realm => {
            realm.write(() => {
                realm.create('Incomes', {
                        _id: new UUID(),
                        name: 'Olivier',
                        lastname: 'Dray',
                        category: 'Addidas',
                        amount: 1234,
                        comments: "commentaire",
                        dob: new Date()
                })
            })
            console.log("Add user successfully");

            setMyUser([...realm.objects<IObjet>('Incomes')])
            realm.close()
        }).catch(err => {
            console.log('error: ', err);
        })
    }

    
    const ShowAllUser = () => {
        Realm.open({
            schema: [Incomes]
        }).then(realm => {
            setMyUser([...realm.objects<IObjet>('Incomes')])
            console.log('Incomes', realm.objects('Incomes'));
            
        })
    };
    
    return (
    <View>
     <Button title="Add User" onPress={AddUserIncomes}/>
     <Button title="Show User" onPress={ShowAllUser}/>
     <Button title="Delete User" onPress={DeleteAllUser}/>
     <View>
        {
            myUser.map((item, index) => (
                <View>
                    
                 
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