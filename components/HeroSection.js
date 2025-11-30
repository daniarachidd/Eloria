
import Image from "next/image";
import Link from "next/link";

function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-neutral-100 py-12 sm:py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">

                {/* Left Content Area */}
                <div className="z-10 max-w-xl text-neutral-900 md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                        <span className="text-neutral-800">Your Style.</span>
                        <br />
                        Our Vision.
                    </h1>
                    <p className="text-lg sm:text-xl  text-neutral-700 mb-6 sm:mb-8">
                        Experience our curated collection of contemporary apparel, designed for the discerning individual.
                    </p>
                    <Link
                        href="/products"
                        className="inline-block bg-yellow-500 text-neutral-900 px-6 sm:px-8 sm:py-4 py-3 rounded-lg text-md sm:text-lg font-bold uppercase tracking-wider hover:bg-yellow-600 transition-colors shadow-lg transform hover:scale-105"
                    >
                        Discover More
                    </Link>
                </div>

                {/* Right Content */}
                <div className="relative md:w-1/2 flex justify-center md:justify-end">
                    

                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[300px] sm:w-[550px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[450px] bg-neutral-200 transform -rotate-3 rounded-2xl shadow-2xl"></div>

                    <Image
                        src="/fashion.png" 
                        alt="Woman with shopping bag" 
                        width={450} 
                        height={450}
                        className="relative z-20 object-contain w-[250px] sm:w-[350px] md:w-[450px] h-[230] sm:h-[330px] md:h-[430px] transform rotate-3"
                    />
                </div>
            </div>
        </section>
    );
}

export default HeroSection;

