import React from "react";

const experiences = [
  { id: 1, title: "Desert Safari", image: "https://media2.thrillophilia.com/images/photos/000/124/492/original/1527232809_shutterstock_705430021.jpg?width=975&height=600" },
  { id: 2, title: "River Rafting", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/2c/f1/81/caption.jpg?w=500&h=400&s=1" },
  { id: 3, title: "Mountain Hiking", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpU_FLBO5sm1DcSiclP8JKBj9kdVX3q6RtOQ&s" },
  { id: 4, title: "Scuba Diving", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7MUFPGMsIKCjMKAKBl76rqdiNrUlyuuyNAQ&s" },
  { id: 5, title: "Wildlife Safari", image: "https://static.toiimg.com/thumb/msid-110498851,width-748,height-499,resizemode=4,imgsize-106226/A-guide-to-the-worlds-6-best-and-biggest-wildlife-safaris.jpg" },
  { id: 6, title: "Hot Air Balloon", image: "https://imgcld.yatra.com/ytimages/image/upload/v1517481215/AdvNation/ANN_TRP512/Dubai-Hot-Air-Ballooning_1439553571_Lv7oNW.jpg" },
];

const Experiences = () => {
  return (
    <section className="py-10 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Popular Experiences</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={exp.image}
              alt={exp.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Exciting and unforgettable!</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
