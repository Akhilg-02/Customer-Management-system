import { createContext, useContext, useState } from "react";

const CustomerContext = createContext();

export const useCustomer = () =>{
    return useContext(CustomerContext)
}

export const CustomerProvider = ({children})=>{

    const localData = JSON.parse(localStorage.getItem('customers'));

    const [customers, setCustomers] = useState(localData || []);

    const addCustomer = (customer) =>{
        const updatedCustomer = customers.concat(customer);
        setCustomers(updatedCustomer);
        localStorage.setItem("customers",JSON.stringify(updatedCustomer))
    }

    const updateCustomer =(updatedCustomer) =>{
        const updatedCustomers = customers.map(customer=>
            customer.id === updatedCustomer.id ? updatedCustomer :customer
        );

        setCustomers(updatedCustomers);
        localStorage.setItem("customers",JSON.stringify(updatedCustomers))
    }

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

