import { OrderdProduct } from "./OrderdProduct";
import { Product } from "./Product";

export interface OrderInfo{
  orderedProduct:Product[];
  fuullName:string;
  phone:string;
  address1:string;
  address2:string;
  city:string;
  state:string;
  pincode:string;
}