import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            {/* footer  */}
            <footer className="text-gray-600 body-font bg-[#0a2540]">
                {/* main  */}
                <div className="container px-3 py-1 lg:py-3 mx-auto flex items-center lg:justify-start justify-center lg:gap-x-0 gap-x-2 ">
                    {/* logo  */}
                    <div>
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white" href="res-it">
                        <span className="text-xl font-bold">ReSort-It</span>
                    </a>
                    </div>
                   
                    {/* para  */}
                    <div className="mb-3 lg:mb-0">
                    <p className="text-sm text-gray-100 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                        © 2024 resort-it —
                        <Link
                        to={'/'}
                            className="text-gray-100 ml-1"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            @resort-it
                        </Link>
                    </p>
                    </div>
                   
                    
                    
                </div>
            </footer>
        </div>
    );
}

export default Footer;