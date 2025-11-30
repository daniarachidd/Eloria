import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { supabase, getImageUrl } from '@/app/utils/supabaseClient';

const OrderCard = ({ order }) => {
    const [expanded, setExpanded] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(false);


    const getStatusColor = () => {
        switch (order.status) {
            case 'Pending':
                return 'bg-yellow-500';
            case 'Shipped':
                return 'bg-blue-500';
            case 'Delivered':
                return 'bg-green-500';
            case 'Cancelled':
                return 'bg-red-500';
            default:
                return 'bg-neutral-500';
        }
    }

    const humanizeDate = () => {
        const date = new Date(order.created_at);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',

        });
    }

    const fetchOrderItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select(`
    id,
    total_amount,
    status,
    created_at,
    order_items (
      name,
      price,
      quantity,
      image
    )
  `)
            .eq('id', order.id)
            .single();
        if (error) {

            console.error('Error fetching order items:', error);
            return;
        }
        else {
            console.log('Fetched order items:', data);
            setOrderItems(data?.order_items || []);
        }
        setLoading(false);
    }

    const getStatusLabel = () => {

        if (order.status === 'succeeded') return 'Received';
        else return order.status;
    }
    return (
        <div className="border border-gray-200 p-4 rounded-2xl mb-4">
            {/* Order Header */}
            <div className="flex justify-between items-center">
                <p className="text-neutral-900 my-4 text-sm">
                    Order No: {order.id}{' '}
                    <span className="text-gray-400 text-xs">{humanizeDate()}</span>
                </p>
                {/* Expand/Collapse Icon */}
                <button
                    onClick={() => {
                        setExpanded(!expanded);
                        if (!expanded) fetchOrderItems();

                    }}
                    className="text-gray-500 hover:text-gray-700 transition-transform"
                >
                    <FaChevronDown
                        className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''
                            }`}
                    />
                </button>
            </div>

            {/* Order Summary */}
            <div className="flex justify-between items-center">
                <div
                    className={`relative top-2 left-2 w-25 h-10 rounded-md flex items-center my-2 justify-center text-white text-sm font-semibold ${getStatusColor()}`}
                >
                    {getStatusLabel()}
                </div>
                <div>
                    <span className="text-gray-400">Total</span> <br /> ${order.total_amount}
                </div>
            </div>

            {/* Expanded Content */}
            {expanded && (
                <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <h3 className="text-md font-semibold mb-2">Order Details</h3>
                    {loading ? (
                        <p className="text-gray-500">Loading order details...</p>
                    ) : (
                        <div>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <img src={getImageUrl(item.image)} alt="image" className="w-20 h-20 object-cover rounded-md" />
                                        <div className="flex flex-col py-2 space-y-2 items-start justify-center">
                                            <h4 className="font-semibold text-sm text-neutral-900"> {item.name}</h4>
                                            <p className="text-neutral-500 text-sm">Quantity: {item.quantity}</p>
                                            <p className="text-neutral-500 text-sm">Price: ${item.price}</p>
                                        </div>
                                    </div>

                                ))}
                            </ul>
                        </div>
                    )}


                </div>
            )}
        </div>
    );
}
export default OrderCard;