
Users
    - admin
        - can add users and remove users
        - has access to all functions
        
    - buyer
        - can create PO for incoming material
            - status incoming
        - create out going order for customer's
        
    - receiver & shipper
        - can recieve against PO
            - enter incoming quantity vs PO quantity
            - create BO quantity if necessary
            - change status to received
        - transfer from one location to another
        - transact out going order 
            - picked status
                - enter quantity to remove from inv
                - changing status to picked
            - ship confirmed
                - able to enter shipping info
                - removes from inventory
        

Before we meet again, I would like for you to finish:
1. CRUD usability for different users [Admin, buyer, shipper, receiver] [ADMIN needs full CRUD] [buyer/shipper/receiver, might need edit capabilities]
2. Completing the features you have currently started

After that we will meet again briefly to go over your project, and talk about next steps through LaunchCode.

Extra things to work on after those 2 things work on:
1. Create a way for users to sign up [buyers], and manage their access to information
2. Create a Reports tab that allows Users to view information in different ways, specific to their needs and their data