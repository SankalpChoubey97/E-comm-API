# E-comm-API
creating simple E comm API where admin can add delete or update products

use below requests for adding deleting or viewing products

1) To create product, use post request for below
http://localhost:3200/products/create

example of body:
{
    "name":"Book",
    "quantity":6
}

2) To view all products, use get request for below
http://localhost:3200/products/

3) To delete a product, use delete request for below
http://localhost:3200/products/:id
(view ids from step 2)

4) To update a product, use post request 
http://localhost:3200/products//:id/update_quantity/
(provide update_quantity in request query)
example:
http://localhost:3200/products/66d058f2fd42b0914ad347ce/update_quantity?number=-4
(number can be positive to increase quantity, negative to decrease quantity)
