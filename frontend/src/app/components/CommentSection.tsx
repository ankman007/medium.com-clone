import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faHeart, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface CommentProps {
  profilePicture: string;
  name: string;
  date: string;
  content: string;
}

const CommentSection: React.FC<CommentProps> = ({ profilePicture, name, date, content }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex justify-between">
        <div className="flex">
          <div className="relative w-10 h-10 mr-4">
            <Image
              src={profilePicture}
              alt={`${name}'s profile picture`}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              unoptimized
            />
          </div>
          <div>
            <p className="m-0 font-semibold text-black">{name}</p>
            <p className="m-0 text-gray-500 text-sm">{date}</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-black focus:outline-none"
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-42 bg-white border border-gray-200 shadow-lg rounded-md z-10">
              <button className="block w-full text-left text-red-600 px-4 py-2 hover:bg-gray-100">
                Report response
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-black">{content}</p>

      <div className="mt-2 flex space-x-4 text-gray-500">
        <div className="flex items-center space-x-1 cursor-pointer">
          <FontAwesomeIcon icon={faHeart} className="text-red-500" />
          <span>20</span>
        </div>

        <div className="flex items-center space-x-1 cursor-pointer">
          <FontAwesomeIcon icon={faCommentAlt} className="text-gray-500" />
          <span>10</span>
        </div>

        {/* <button className="focus:outline-none text-gray-600 hover:underline">Replies</button> */}
      </div>
    </div>
  );
};

export default CommentSection;
