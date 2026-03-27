const GenreCard = ({ genre }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
      <div className="h-48 overflow-hidden bg-gray-700">
        <img className="w-full h-full object-cover" />
      </div>

      <div className="p-6">
        <h3 className="text-white font-bold text-xl mb-2">
          {genre.genre_name}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-3 mb-4">
          Add stuff here
        </p>
      </div>
    </div>
  );
};

export default GenreCard;
