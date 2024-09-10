import { useNavigate } from "react-router";
import PlasticScrap from '../../assets/plastic1.jpg';
import PaperScrap from '../../assets/paper1.jpg';
import MetalScrap from '../../assets/metalscrap.jpg';

// category 
const category = [
    {
        image: PlasticScrap,
        name: "plastic"
    },
    {
        image: PaperScrap,
        name: "paper"
    },
    {
        image: MetalScrap,
        name: "metal"
    },
];

const Category = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center mt-0 px-4 h-full lg:pt-4 mb-8 lg:mb-0 bg-gray-50">
            <h1 className="text-center text-[#33c664f8] mt-4 lg:mt-0 text-lg lg:text-3xl font-bold mb-4 lg:mb-8">
                Browse Various Recyclable Products!
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full max-w-[75%]">
                {category.map((item, index) => {
                    return (
                        <div 
                            key={index} 
                            className="w-full h-[250px] md:h-[350px] lg:h-[75%] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer hover:shadow-xl bg-gray-200 hover:bg-[#1f6863] hover:text-white"
                            onClick={() => navigate(`/category/${item.name}`)}
                        >
                            <img className="w-full h-[75%] object-cover" src={item.image} alt="item" />
                            <div className="px-4 py-4">
                                <h1 className="text-3xl font-semibold text-center uppercase">{item.name}</h1>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
        
        </div>
    );
};

export default Category;
