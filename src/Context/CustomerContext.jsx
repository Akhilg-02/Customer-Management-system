import { createContext, useContext, useState } from "react";

const CustomerContext = createContext();

export const useCustomer = () =>{
    return useContext(CustomerContext)
}

export const CustomerProvider = ({children})=>{

    // Getting the data from the local storage
    const localData = JSON.parse(localStorage.getItem('customers'));

    // State for customers list
    const [customers, setCustomers] = useState(localData || []);

    // Function for seting and adding the customers
    const addCustomer = (customer) =>{
        const updatedCustomer = customers.concat(customer);
        setCustomers(updatedCustomer);
        localStorage.setItem("customers",JSON.stringify(updatedCustomer))
    }

    // Function for updating/editing the specific customer
    const updateCustomer =(updatedCustomer) =>{
        const updatedCustomers = customers.map(customer=>
            customer.id === updatedCustomer.id ? updatedCustomer :customer
        );

        setCustomers(updatedCustomers);
        localStorage.setItem("customers",JSON.stringify(updatedCustomers))
    }

    // Function for deleting the specific customer
    const deleteCustomer = (id) =>{
        const updatedCustomer = customers.filter(customer => customer.id !== id);
        setCustomers(updatedCustomer);
        localStorage.setItem("customers",JSON.stringify(updatedCustomer))
    }

    return(
        <CustomerContext.Provider value={{customers,addCustomer,updateCustomer,deleteCustomer}}>
            {children}
        </CustomerContext.Provider>
    )

}

