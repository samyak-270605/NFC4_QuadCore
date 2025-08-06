import { Link } from "react-router";
import { getLanguageFlag } from "./getLanguageFlag";

const FriendCard = ({ friend }) => {
  return (
    <div className="card w-full max-w-md bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition duration-300">
      <div className="card-body p-5 space-y-4">

        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={friend.profilePic} alt={friend.fullName} />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold truncate">{friend.fullName}</h2>
          </div>
        </div>

        {/* Language Badges */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
          <div className="badge badge-secondary badge-lg gap-2 px-3 py-1 text-sm">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </div>
          <div className="badge badge-outline badge-lg gap-2 px-3 py-1 text-sm">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </div>
        </div>

        {/* Action Button */}
        <Link to={`/chat/${friend._id}`} className="btn btn-outline btn-primary w-full">
          💬 Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
