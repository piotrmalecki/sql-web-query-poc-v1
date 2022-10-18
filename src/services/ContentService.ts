
import { ORDER_DETAILS } from './data/order_details';
import { ORDERS } from './data/orders';
import { PRODUCTS } from './data/products';

import { OrderDetails } from '../interfaces/OrderDetails';
import { Order } from '../interfaces/Orders';
import { Product } from '../interfaces/Products';

export function useContentService() {

    const getAllProducts =( page_number: number, page_size: number = 50): Promise<Product[]>  =>{
      return new Promise((resolve, reject) => {
        resolve(PRODUCTS.slice((page_number - 1) * page_size, page_number * page_size));
       });
    }

    const getAllProductsNumber = () : number => {
      return 77; //Hardcoded 
    }

    const getAllOrders = ( page_number: number, page_size: number = 50): Promise<Order[]> =>{
        return new Promise((resolve, reject) => {
          resolve(ORDERS.slice((page_number - 1) * page_size, page_number * page_size));
         });
      }

    const getAllOrdersNumber = () : number => {
      return 830;
    }

    const getAllOrderDetails = ( page_number: number, page_size: number = 50): Promise<OrderDetails[]> => {
        return new Promise((resolve, reject) => {
          resolve(ORDER_DETAILS.slice((page_number - 1) * page_size, page_number * page_size));
         });
      }

    const getAllOrderDetailsNumber = () : number => {
      return 2155;
    }
    return {
        getAllProducts,
        getAllProductsNumber,
        getAllOrders,
        getAllOrdersNumber,
        getAllOrderDetails,
        getAllOrderDetailsNumber
    }
}


