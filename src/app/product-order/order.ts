import { OrderdProduct } from "../_models/OrderdProduct";
import { OrderInfo } from "../_models/OrderInfo";
import { Product } from "../_models/Product";

export class Order implements OrderInfo {
    constructor(
        public orderedProduct:Product[],
        public fuullName:string,
        public phone:string,
        public address1:string,
        public address2:string,
        public city:string,
        public state:string,
        public  pincode:string
    ) { }
    
}
