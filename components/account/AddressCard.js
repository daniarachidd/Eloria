import { FiEdit } from "react-icons/fi";


const AddressCard = ({ address, onEdit, onDelete }) => {
    
    return (
        <div className="w-full flex  justify-center px-2">
            

            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-5  rounded-xl shadow-md border border-neutral-200 bg-white flex flex-col gap-2">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg sm:text-xl  text-yellow-500 break-words">{address.address_name}</h3>
                    
                    <button
                            onClick={() => {
                                
                                onEdit(address)
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                            <FiEdit className="text-gray-500 text-xl sm:text-2xl" />
                        </button>
                    
                </div>

                {/* Name */}
                <h2 className="font-semibold text-base sm:text-xl  text-black ">{`${address.first_name} ${address.last_name}`}</h2>

                {/* Address Details */}
                <div className="text-neutral-700 text-sm sm:text-base  leading-relaxed space-y-1">
                    <p>{address.street}</p>
                    {address.description && <p>{address.description}</p>}
                    <p>
                        {address.zip_code} {address.city}, {address.state}
                    </p>
                    <p>{address.country}</p>
                </div>


            </div>
            
        </div>
    );
}
export default AddressCard;