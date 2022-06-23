import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Realm from "realm";
import {UUID, ObjectId} from 'bson'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'


uuid
const Home = () => {
    const MyObjectIdIncome = new ObjectId();
    const MyObjectIdUser = new ObjectId();
    const MyObjectIdExpense = new ObjectId();
   
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
          _id: "objectId",
          name: "string",
          Incomes: "Incomes?",
          Expenses: "Expenses?",
        }
    } 
    const Incomes = {
        name: "Incomes",
        embedded: true,
        properties: {
            _id: "objectId",
            category: "string",
            amount: "int",
            comments: "string",
            dob: "date"
        }
    }

    
    const Expenses = {
        name: "Expenses",
        embedded: true,
        properties: {
            _id: "objectId",
            category: "string",
            amount: "int",
            comments: "string",
            dob: "date"
        }
    }
/* ************************************************************************************************ */



    type IObjet = {
        name: string,
        primaryKey: string,
        Incomes: IncomesType[],
        Expenses: ExpensesType[],
        
    }
    
    type IncomesType = {
        _id: string,
        category: string,
        amount: number,
        comments: string,
        dob: Date
    }
    type ExpensesType = {
        _id: string,
        category: string,
        amount: number,
        comments: string,
        dob: Date
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
            schema: [User, Incomes, Expenses]
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
    
    
    
    
    
/*     
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
    } */




    const AddUserIncomes = () => {
        Realm.open({
            schema: [User, Incomes, Expenses]
        }).then(realm => {
            realm.write(() => {
                    realm.create('User', {
                        _id: MyObjectIdUser,
                        name: 'User',
                        Expenses: {
                             _id: MyObjectIdExpense,
                             category: 'Puma',
                             amount: 1234,
                             comments: "commentaire",
                             dob: new Date() 
                         }, 
                          Incomes: {
                            _id: MyObjectIdIncome,
                            category: 'Nike',
                            amount: 23455,
                            comments: "commentaire",
                            dob: new Date() 
                        },
                })
            })
            console.log("Add user successfully");
            console.log('User', realm.objects('User'));
            setMyUser([...realm.objects<IObjet>('User')])
            realm.close()
        }).catch(err => {
            console.log('error: ', err);
        })
    }

    
    const ShowAllUser = () => {
        Realm.open({
            schema: [User, Incomes, Expenses]
        }).then(realm => {
            setMyUser([...realm.objects<IObjet>('User')])
            console.log('User', realm.objects('User'));
            
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