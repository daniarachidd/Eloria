'use client'
import { useState, useEffect } from "react";
import { getCollections } from "@/app/utils/getCollections";
import { useRouter } from "next/navigation";
function Collections({ open, closeCollections }) {
    const [isVisible, setIsVisible] = useState(open);

    const [collections, setCollections] = useState([]);
    const router = useRouter();

    // fetch collections
    useEffect(() => {
        getCollections().then(setCollections).catch(console.error);
    }, []);

    useEffect(() => {
        setIsVisible(open);
    }, [open]);





    if (!isVisible) return null;
    return (
        <>

            {/* <section className="py-6 bg-stone-800 border-t-1 border-stone-700"> */}
            <section
                className="
                    fixed top-0 md:top-26 left-0 right-0 z-50
                    bg-stone-800 border-b border-stone-700
                    py-6 max-h-screen overflow-y-auto
                "
            >
                <div className="max-w-7xl mx-auto px-4">
                    {/* MOBILE CLOSE BUTTON */}
                    <button
                        onClick={closeCollections}
                        className="ml-auto mb-4 p-2 text-stone-300 hover:text-white transition-colors block md:hidden"
                    >
                        ✕
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10">

                        {collections.map((collection, index) => (

                            <div key={index}>

                                <h3 className="text-md font-semibold mb-3 text-stone-300 uppercase">{collection.title}</h3>

                                <ul className="space-y-2">

                                    {collection.subcollections.map((subcollection, subIndex) => (

                                        <li key={subIndex} className="hover:text-stone-400 cursor-pointer transition-colors">
                                            <button
                                                onClick={() => {
                                                    closeCollections();
                                                    router.push(`/products?subcollection=${subcollection.id}`);
                                                }}>
                                                {subcollection.title}
                                            </button>


                                        </li>

                                    ))}

                                </ul>

                            </div>

                        ))}

                    </div>
                </div>



            </section>
        </>


    );

}


export default Collections; 
