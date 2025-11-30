import {supabase} from "@/app/utils/supabaseClient";
import {useEffect, useState} from "react";
import OrderCard from "./OrderCard";
import Link from "next/link";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, [])

    const fetchOrders = async () => {
        const {data} = await supabase.auth.getUser();
        if (!data.user) return;
        const userId = data.user.id;
        const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

        setOrders(orders || []);
        setLoading(false);

    }
    if (loading) return <p>Loading...</p>;
    if (orders.length === 0) return (
      <div className="flex flex-col items-center justify-center py-16">
        
        <p className="text-gray-500 text-lg mb-4">You haven't made any orders yet</p>
        <Link
          href="/products"
          className="bg-yellow-500 text-neutral-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-600 transition"
        >
          Browse Products
        </Link>
      </div>
    );
    return (
       <>
        {/* // <div className="flex flex-col  min-h-screen px-4 sm:px-6 md:px-10 py-8 text-neutral-900"> */}
            <h1 className="text-2xl md:text-3xl  font-semibold mb-8 text-center md:text-left">My Orders</h1>
            {/* <p>View your order history here.</p> */}
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}


        {/* </div> */}
        </>
    );
} 
export default OrderHistory;